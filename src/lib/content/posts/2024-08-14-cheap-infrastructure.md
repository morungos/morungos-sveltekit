---
layout: post
title: 'Stuart’s guide to high-availability services on a budget'
author: Stuart
---

One of the challenges of cloud hosting is keeping the costs down. There are just
so many moving parts, and costs very quickly mount up. And if you, like me,
often get approached by companies who want to cut your AWS bills, you can
read on, because I had a lot of these, and none of them could shave off even a
cent or two. 

Yes, I really am that cheap, and so, welcome to <b><i>Stuart’s guide to
high-availability services on a budget</i></b>, how to build a complete,
private, high-availability platform on a budget. 

## Our basic requirements

This is an update, and a recap, on what we built for
[Turalt](https://turalt.com). As a quick summary of all the different components
for Turalt's services, there were several pieces, all of which worked together:

* **A validated psychometric**, with an interactive React component used to help
  people assess factors known to affect their communication preferences.
* **A reporting component**, that could take the psychometric data and assemble
  a personalized report, containing high quality graphics and visuals, and 
  send it to participants by email.
* **A generic feedback engine**, which used some (by today's standards) simple
  artificial intelligence, to give people feedback on how they might come across
  to others -- this was pure JavaScript with no network dependencies, and small
  enough to embed for complete security, as we did within Outlook. 
* **A feedback API**, which used the feedback engine above, but provided its feedback
  through a web service, with performance throttling, etc.
* **A Chrome extension**, which hooked into Gmail, and which used the feedback API
  to show visual reflections and analytics in context 
* **A set of static web pages**, our blog, for example, which were processed 
  statically and then pushed -- in fact, there were several subdomains, and each 
  had some distinct static content.
* **Some additional administration endpoints** for, e.g., payment processing, health checks, 
  administration for corporate clients, and so on.

With these components, we also had a number of other, wider, requirements. 
What we needed was the following:

* **High availability, relatively speaking** -- i.e., the goal wasn't absolute 100% 
  uptime at any cost, the risk of an entire data centre going down was low enough
  that we didn't attempt to span data centres, although we would have done if we'd 
  scaled further. However, loss of a single server causing compete loss of service 
  would have been entirely unacceptable.
* **Persistent storage with replication** -- it was important that a single server loss
  would not cause data loss; some of the data was quite valuable and personal, so we
  needed to be responsible about taking care of it
* **Able to do rolling updates** -- we needed to be able to upgrade both static
  content and systems relatively often, and without taking down services for
  more than a second or two at the worst

In addition to all of these, we needed to be relatively performant. The main feedback API provided
services to a Chrome extension, and it was entirely possible to have several hundred
concurrent users sending API requests at the platform every second or so. Those endpoints
needed to handle that load without the whole system grinding to a halt.

### Decisions, decisions...

At this point, we had a lot of options, so we needed to make some decisions to
focus the design. The most pressing issues were as follows:

* **Kubernetes, or not Kubernetes?** -- the first question was: should we just
  bite the bullet, and embrace Kubernetes? In some ways, this was appealing, but
  it adds a massive amount of complexity -- and pushes costs up a huge amount.
  Kubernetes involves several services, and its primary nodes require 2Gb of RAM
  before you even start on the application, and you'll need multiple for high
  availability. It is great for scaling, but it's even better for cloud hosting
  providers, as they can bill you for more stuff. So, we dumped Kubernetes from
  the start. That puts the burden of managing some things onto us, but we can
  live with that.
* **Who manages the database?** -- the easiest option was to delegate database
  provision to the cloud provider. We used Digital Ocean, and for $50/mo, they'd
  handle all the database issues for us. That's quite appealing, as they worry
  about backups and outages, mostly. They did a good job, but that's a lot, and
  when our free credits ran out, it started to hurt. So we decided to run our
  own database cluster. We don't need a lot of database anyway -- I'll come to
  that later -- so we could overlay a micro DB server within each application
  server, and still have plenty of room. 
* **Which database?** -- next, what database do we use? We'd originally started
  with MariaDB, which works pretty well. It's not as awful as MySQL about
  licensing, but clustering MariaDB is painful. Very painful. You have no idea
  how painful. So we switched to PostgreSQL. Since all our application code used
  `knex.js` (I do not enjoy ORMs, and query building DSLs work very well for me)
  the code didn't need to change at all. So we switched to PostgreSQL, and I
  never regretted it. Clustering was very much easier -- so was backup, and
  security for that matter.
* **But performance?** -- one of the harder challenges was: some of the APIs
  need light access to data, and if we hit peak loads, PostgreSQL was a
  bottleneck. So, somewhat naively, we added in `redis`, and overlaid a second
  `redis` cluster across all the application servers. Mostly, `redis` was used as a
  straight cache for both reading and writing to PostgreSQL, therefore, again
  the data quantity was not too high to cause memory issues, we flushed data
  every minute or so. That meant we were doing bulk writes occasionally, rather
  than instant writes constantly. In theory that would be a data loss risk, but
  by clustering `redis`, that risk was essentially zero. As a bonus feature, a
  `redis` cluster can also provide a very handy cross-cluster locking feature,
  which was very handy when we needed to do, for example, sending emails -- the
  last thing we needed was multiple servers sending emails at the same time.

## The basic setup

With this lot in place, our basic setup looked much like this, in broad terms. 
The main entry point was a basic Digital Ocean load balancer, with two nodes
running health checks against a pool of identical application nodes. We *could*
have built our own load balancer, but Digital Ocean's cost the same as two nodes
anyway, so it would not have saved us all that much.

<figure class="figure w-75">
  <enhanced:img class="img-fluid" src="/src/images/posts/cluster-architecture.png" 
       alt="Chart of bias effects by temperature"></enhanced:img>
    <figcaption class="figure-caption">
    Overview of the basic cluster architecture.
    </figcaption>
</figure>

Each application server handled incoming requests through `nginx`. Note that the
load balancer didn't terminate SSL, we passed through the connections. Generally,
I wouldn't have trusted our private data exposed that way. I only wanted our
customers' data to be unencrypted within a server, not between them. The only data
transmitted between servers is between the `redis` worker nodes and the `PostgreSQL`
worker nodes, and we made sure they were encrypted, if necessary using SSL tunnels.

Back to `nginx`. `nginx` would handle incoming requests, and if static, serve
them directly, with mirrored copies of all static resources on all servers. If dynamic,
they were reverse-proxied onto a suite of worker processes, which were implemented
using `Node.js`, and managed by `systemd` for restarts. These did the actual 
application work. One interesting service was the "health-check" endpoint, which was
involved every few seconds by the load balancers. This checked database status and 
a few other things. This was the only endpoint that ran on HTTP/80, because that 
was what the load balancer needed, and it didn't return any information anyway. 

For a complete list, all the application servers included the following:

 * [Debian](https://www.debian.org/) server
 * [PostgreSQL](https://www.postgresql.org/)
 * [repmgrd](https://repmgr.org/) (replication management for PostgreSQL)
 * [pgbouncer](https://www.pgbouncer.org/) (PostgreSQL redirection across failover)
 * [redis](https://redis.io/)
 * [Node.js](https://nodejs.org/en/)
 * [iptables](https://www.netfilter.org/projects/iptables/index.html) (firewall)
 * [fail2ban](https://www.fail2ban.org/) (intrusion prevention)
 * [nginx](https://www.nginx.com/) (reverse proxy, SSL termination)
 * [acme.sh](https://github.com/acmesh-official/acme.sh) (for [LetsEncrypt](https://letsencrypt.org/) SSL certificates)
 * [rsyslog](https://www.rsyslog.com/) (logging)
 * [postfix](http://www.postfix.org/) (to relay local email notifications)
 * [jsonperfmon](https://github.com/pduveau/jsonperfmon) (forked to play nice with output, for performance monitoring)

Both the PostgreSQL and redis platforms use replication across our small cluster,
with automatic failover provided (in the case of PostgreSQL through repmgrd and
pgbouncer, in the case of redis through [redis-sentinel](https://redis.io/topics/sentinel)). 


So, note, we're not using Kubernetes, there's docker, there's no containers, and
there's no heavy infrastructure. As it stands, and somewhat surprisingly, the
whole thing (with some caveats) fits quite comfortably into a 1Gb application
server with 20Gb of storage. That's because a lot of these things (e.g.,
`rsyslog`, `systemd`) are light and standard, and others, like `nginx` and even
Node.js, are economical. Digital Ocean provides these 1Gb nodes for around
$5/mo, so the whole setup is around $25/mo. Not bad for a close-to
high-availability private setup, and not far off the cost of a single Kubernetes
master node.

## Data storage

First, a little history. Initially, we used [`MariaDB`](https://mariadb.com/) 
because (a) it wasn't Oracle,
and (b) it was fast and easy. But... as soon as you need replication, it can
become impossibly hard. There are few good and easy solutions. It wasn't as if
we were committed to `MariaDB` -- all our database logic is written using `knexjs`
so switching to a new dialect was always going to be pretty quick and easy. 

The problem is, we needed replication early on. Our analysis endpoints need to work
24/7, so we need to be able to apply an update while still running. This means
we need more than one server, so we can progressively remove one from the service,
update it, and then add it back. Coupled with the need for a database system that
is solid and reliable and also available 24/7, this was a lot to ask. 

And then, our hosting service offered a managed [`PostgreSQL`](https://www.postgresql.org/) 
service, which was perfect. As a startup in [Digital Ocean's](https://www.digitalocean.com/) (excellent) 
[Hatch](https://www.digitalocean.com/hatch/) program, we didn't even need to pay for it
for a year. This meant we didn't need to worry about the database at all, and all our
servers could be simple, identical, application servers. 

Fast forward, and after we graduated from Hatch, we now get billed. It's not a lot
for a wealthy startup, but for us and those who bootstrap, it's enough we'd rather not pay for it. So, 
the question was: how could we use standard droplets to build something that was
close enough. That meant: replication, automatic failover, and safe backups. 

Unlike `MariaDB`, pretty much everything you need for replication is standard in
`PostgreSQL`. So let's dive in. 

The usual model for `PostgreSQL` is two servers: a primary and a hot standby. To make
for true high availability, we need one more thing: a monitoring system that tracks
the primary, and if it fails, we promote the hot standby to a new primary, and then
set up a new hot standby to take its place. Alternatively, if the hot standby fails,
it can be dropped and a new hot standby set up directly. This is pretty much what
Digital Ocean offered us -- on a well-configured server which was frankly far in
excess of our actual needs. 

It's true that running `PostgreSQL` on 1Gb servers, alongside the application, might
seem like a *really bad idea*. For us, it isn't especially. We use `redis` a lot for 
write caching, so virtually all the fast-changing data is done through `redis` anyway, 
with background tasks periodically writing in batches to `PostgreSQL`. 

Switching from single inserts to batch inserts made a huge reduction in our need
for server performance, so we do not really need a very fast database. We can
write blocks of a hundred records or so when we need to, and we often don't even
need to wait for the insert to complete.

## High availability for PostgreSQL: `repmgrd` versus `keepalived`

To make any cluster handle outages, you need monitoring processes that keep an eye on other 
servers, and remove them if something goes wrong. The two common choices for `PostgreSQL`
are [`repmgrd`](https://repmgr.org/docs/current/using-repmgrd.html) 
and [`keepalived`](https://github.com/acassen/keepalived). `repmgrd` only works for PostgreSQL,
but contains builtin monitoring for it; `keepalived` is more general-purpose, and the price
you pay for that it that it doesn't know as much about the innards, so you need to put more
into your scripts for tracking and management. 

The choice between them was not a simple one, and after some 
trial and error (and pain) we found that `repmgrd` was easier to automate
the failover process in a consistent way. `keepalived` is certainly a lot more 
powerful, and we're very likely to use it again some day, but for now, and for us, `repmgrd`
works fine. 

The main advantage of `repmgrd` is that it is nicely integrated with and designed for
`PostgreSQL`, so it doesn't need anything like as much configuration as `keepalived`, 
which, being more general purpose, can handle cluster failover for many other
different services. For example, `repmgrd` provides pre-built scripts that allow a new standby node
to synchronize data from an upstream primary. With `keepalived`, that's something you'd need
to configure yourself.

## Application service processes

The dynamic parts of our application run as [`Express`](https://expressjs.com/) 
services through [`Node.js`](https://nodejs.org/en/).
In development, these run from the command line, but for deployment, we use
`systemd` unit files to manage each of them. And we install [`yarn`](https://yarnpkg.com/) on all the servers
so that we can deploy the dependencies correctly. 

[I know that `systemd` is somewhat controversial](https://www.infoworld.com/article/3159124/linux-why-do-people-hate-systemd.html). But frankly, I don't care. For normal everyday
use it is significantly easier (and safer) than writing your own `init.d` files. There's
significantly less to go wrong.

All we want is for a command line to be able to start stable processes that
restart automatically if they go down, and to have these processes start on
boot. Actually, even that isn't especially important, as the whole cluster
nature means a cluster-wide restart always needs some kind of outside
supervision, whether it's human or not, to make sure that servers don't restart
and create parallel database versions or what have you. But the restart of the
individual worker processes absolutely needs to be automatic and clean, so that
after, e.g., a minor version tweak, we can bounce the process. 

## Web access

A whole lot of our services are set up through some complex [`nginx`](https://www.nginx.com/) 
configuration. `nginx` does a lot for us, including:

 * SSL termination
 * Serving static files for the main web site
 * Serving built single-page application static components for dynamic applications
 * Setting Content-Security-Policy headers for the single page applications
 * Proxying RESTful APIs to separate service processes

We do still use a [Digital Ocean load balancer](https://www.digitalocean.com/products/load-balancer/), 
so web requests that come into our
servers go through that, and get relayed to the *private* IP addresses for our servers,
not the public IP addresses (which literally block every single thing but public-key ssh for 
management reasons). 

However, we use our load balancers in passthrough mode for SSL. Although it's much easier 
to terminate the SSL at the load balancer, that would mean unencrypted data flows outside
servers, and we really do not want that -- our privacy policy is that all data 
transmitted between servers is encrypted.

Normally, all our web servers require HTTPS, so SSL is essential to our `nginx` setup. However, 
the load balancer also does health checks, and those prefer HTTP, so we allow one single
HTTP endpoint for the health checks. Everything else gets SSL checked, and either served
as a static file or proxied over HTTP internally to one of the service processes. 

## Other security issues

Obviously we have a firewall, and [`iptables`](https://www.netfilter.org/projects/iptables/index.html) 
works fine for us. I totally hate its
command line, but for deployment, it was very much simpler to template out a 
complete rule file and then import it when we need to. 

We also use [`fail2ban`](https://www.fail2ban.org/), with some very extensive rules to detect various attacks, 
both direct through ssh and indirect through web requests. Obviously, none of our
ssh accounts use passwords at all, but attackers don't know that, and it's quite
horrifying to see how many ssh brute force attacks happen in a single day. We have
a pretty strict policy of blocking any IP address that attacks us for a considerable
time. 

Our other `fail2ban` rules block `nginx` attacks, looking for home requests, proxying,
bots, and so on. Again, too many attacks and you get sent directly to jail through
`iptables`. There's a lot more we can do with `fail2ban`, and in an ideal world we'd have
a full web application firewall, but the reality is, what we have is plenty good 
enough and very sound and secure.

We also deploy a `samhain` intrusion detection system, running hourly to detect
file system interference. It can be noisy until it is properly tuned for the
files that change, but when it works, it's great to have alerting there, just in
case someone does manage to break in.


## Logging

Logging is handled in two parts: we have logging clients and logging servers.
Every server is set up as a logging client, and we choose a subset to run as 
logging servers. On every client, we use `rsyslog` to forward logging events
*if and only if they originate on the local machine* to all of the logging servers.

Logging servers are slightly different. They add an action to listen for
incoming logging events, and then drop these into a new file in `/var/log`, 
with an appropriate log rotation setup. It really is that simple. 

The only downside is that instead of having a nice GUI and indexed searching, 
we need to use grep, but in practice, that is just fine. 99% of the time we 
know exactly when an event happened and can filter accordingly. And rsyslog
is extremely flexible and allows us to add additional reporting and notifications
very easily, any time we need it.

We also use a tweaked version of
[`jsonperfmon`](https://github.com/pduveau/jsonperfmon), a perfect little C
program that simply writes out a very complete assessment of the local machine's
state every n seconds. Our [tweaked
version](https://github.com/morungos/jsonperfmon) only has [one significant
change](https://github.com/morungos/jsonperfmon/commit/84d0ce04699734de05eae75054b8743a41843243),
which writes the output to syslog rather than standard output. This means we can
neatly run it as a service through `systemd`, and now, in our aggregated logs,
we get a complete track of performance (i.e., load average, memory usage, etc.)
across the entire cluster. An aggregator like `Graylog` can then alert us if
there are performance problems looming.

## The basic deployment process

That about describes the technical infrastructure, so how do we get it onto 
the servers?

I use [`Ansible`](https://www.ansible.com/) for that. Instead of worrying about
`Puppet`, `Chef`, or `Kubernetes`, `Ansible` simply allows coordinated `ssh`
access to more-or-less bare servers, with a whole bunch of idempotent actions
that do things like create directories, copy files, templating, executing shell
commands when needed, and so on.

Fortunately, `Ansible` doesn't require an agent running on a server. The full
playbook was definitely complex, because both of the database clusters needed to
be configured properly to be aware of their peers, and this was not trivial.
Also, the `Ansible` plays worked in phases, so that the common scenario of an
update to the worker API processes worked smoothly, temporarily dropping out an
application node, updating it (which could include JavaScript package
dependencies) before adding it back in. The basic process was actually simple:
blocks of parallel updates across the cluster, but critical parts run
sequentially, as loops through application nodes, with each removed and re-added
from the load balancer.

In the non-database cases, where exactly the same happens on all servers, the
actions are pretty simple. The application itself is run as a `Node.js` service,
so we simply need to copy files over, run `yarn` to install the dependencies,
and deploy a service file for `systemd`, then we can start the service and there
will be a new worker process running, which `nginx` can proxy to. 

However, the database clusters, both `redis` and `PostgreSQL`, are a lot more complex, 
because the nodes need to know about each other. We have a relatively complex
set of `Ansible` plays that deploys the `PostgreSQL` cluster, with `repmgrd`, and
will repair a cluster when we need to. In essence, this looks at the current
state (if servers are running) and either nominates a primary and a standby,
or uses ones that exist, and then does the minimum changes necessary to 
make the cluster operational.

`redis` is simpler, because `redis-sentinel` makes it pretty easy. We run a 
sentinel on every application node, alongside a `redis` instance, and all
application nodes have both. The only difference is that one of them will
be a primary. 

Apart from `redis`, `PostgreSQL`, and logging, everything else is identical on all servers, 
which makes `Ansible` nice and simple.

[`Ansible`](https://www.ansible.com/) is something of an acquired taste. The
concept is a nice one, but the messy use of YAML files for everything is not as
clean as it might be. 

## How it works in practice

* **Updates** -- A rolling update is pretty simple. `Ansible` manages
  the process, iterating through the application servers, for each
  one, removing it from the load balancer, updating it, and the adding it back
  to the load balancer. That is fine for the application worker processes, which
  can simply be restarted. Data schemas have to be handled differently, because
  the databases are all clustered anyway, so generally that only needs to be run
  once as a migration script, on whichever server we use for database access.

* **Outages** -- If we lose a server, we can relatively simply deploy a new one,
  and add it back into our cluster. It takes a little time for the `redis` and
  `PostgreSQL` data to synchronize, but thanks to the clustering, in the meantime,
  the application processes on Server 1 can use the databases on Server 2 or
  Server 3, and that's all handled for us. Note that we don't need to add it back
  into the load balancer until it is caught up. There is a small risk of a second
  outage before we are completely synchronized, but that level of risk is always
  going to cost a lot more to handle.

* **Backups** -- In our design, `redis` is used for two things: caching, and
  cluster-wide locking[^RedisLocks]. Neither of these require us to back up the
  `redis` data, at all. So all the critical data we need is in `PostgreSQL`. We
  wanted an hourly off-site backup, so even in the event of an entire data
  centre being lost irretrievably, the most we'd lose was an hour's
  data.[^RaspberryBackup].
  The actual backup process should not really surprise anyone. We did daily full 
  backups and hourly incremental ones, which were relatively small, and mirrored 
  three full backups and ten incremental ones to a cloud backup storage, where
  it conveniently fitted into the free storage plan.

[^RedisLocks]:
    One of the more useful features of `redis` is that we can easily create a 
    mutually exclusive lock, so that, for example, two application servers
    don't try to do a backup at the same time.

[^RaspberryBackup]: In another cunning ploy, we did have a proof-of-concept for
    a live offsite mirror, using a Raspberry Pi in my house, run as a streaming
    replica of the `PostgreSQL` cluster. This had some definite advantages: we had a more or
    less live data replica in another physical location, and running backups off
    *that* rather than any of the application servers kept some of the load on 
    the main database servers down. We didn't have very high loads, so that was
    not a pressing issue, but it worked surprisingly well.

* **JavaScript packaging** -- Initially we used `npm` for managing Javascript
  packages, but it was easily the most broken component in the entire setup,
  commonly (and often randomly) running out of memory on a 1Gb machine.
  Switching to `yarn` avoided these issues. We also used a local `Node.js`
  (unpacked and deployed to `/usr/local`), rather than a Debian-provided
  one, to ensure that the deployed version was stable.

## Notes

* footnotes will be placed here. This line is necessary
