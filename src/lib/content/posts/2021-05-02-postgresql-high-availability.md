---
layout: post
title: Turalt's new application infrastructure
author: Stuart
card: 'oakwood-station-construction.jpg'
card_alt: >
  A cement mixer and a bridge crane engaged in heavy construction work.
summary: >-
  We've updated our server platform to make it smaller,
  simpler, and easier to manage -- and save us money. This is how we did it.
---

We've recently updated our server platform at Turalt to a new approach, to make it smaller,
simpler, and easier to manage -- while saving us a little money too. We don't use
Kubernetes, and we're unlikely to need it for a while. In fact, virtually all our
infrastructure runs on a small number of 1Gb servers. So this is how we do it. 

First, a little history. Initially, we used [MariaDB](https://mariadb.com/) 
because (a) it wasn't Oracle,
and (b) it was fast and easy. But... as soon as you need replication, it can
become impossibly hard. There are few good and easy solutions. It wasn't as if
we were committed to MariaDB -- all our database logic is written using knexjs
so switching to a new dialect was always going to be pretty quick and easy. 

The problem is, we needed replication early on. Our analysis endpoints need to work
24/7, so we need to be able to apply an update while still running. This means
we need more than one server, so we can progressively remove one from the service,
update it, and then add it back. Coupled with the need for a database system that
is solid and reliable and also available 24/7, this was a lot to ask. 

And then, our hosting service offered a managed [PostgreSQL](https://www.postgresql.org/) 
service, which was perfect. As a startup in [Digital Ocean's](https://www.digitalocean.com/) (excellent) 
[Hatch](https://www.digitalocean.com/hatch/) program, we didn't even need to pay for it
for a year. This meant we didn't need to worry about the database at all, and all our
servers could be simple, identical, application servers. 

Fast forward, and after we graduated from Hatch, we now get billed. It's not a lot
for a wealthy startup, but for us and those who bootstrap, it's enough we'd rather not pay for it. So, 
the question was: how could we use standard droplets to build something that was
close enough. That meant: replication, automatic failover, and safe backups. 

Unlike MariaDB, pretty much everything you need for replication is standard in
PostgreSQL. So let's dive in. 

The usual model for PostgreSQL is two servers: a primary and a hot standby. To make
for true high availability, we need one more thing: a monitoring system that tracks
the primary, and if it fails, we promote the hot standby to a new primary, and then
set up a new hot standby to take its place. Alternatively, if the hot standby fails,
it can be dropped and a new hot standby set up directly. This is pretty much what
Digital Ocean offered us -- on a well-configured server which was frankly far in
excess of our actual needs. 

Another significant change is that we used a separate logging server, running 
Graylog, which was huge! Our one logging server was more powerful and used more
resources than the whole of the rest of our server platform. Not a big surprise 
since these things typically use [ElasticSearch](https://www.elastic.co/) and 
[MongoDB](https://www.mongodb.com/) and Java virtual machines.
All we really needed from our logging system was aggregation, so that we could 
scan a single log source for all servers, rather than having to grep through 
multiple machines every time. So dropped all that nonsense too, and simply used
some rather cunning rsyslog configurations to have replicated logging and aggregation. 
This is not only much lighter in resources, it's better, as we no longer have a 
single point of failure in our logging systems. 

## What we used in our new platform

Our deployment consists of these components. 

 * [Debian](https://www.debian.org/) server (Buster)
 * [PostgreSQL](https://www.postgresql.org/) (version 12)
 * [repmgrd](https://repmgr.org/) (version 5.2.0, replication management for PostgreSQL)
 * [pgbouncer](https://www.pgbouncer.org/) (version 1.15.0, PostgreSQL redirection across failover)
 * [redis](https://redis.io/) (version 5.0.3)
 * [Node.js](https://nodejs.org/en/) (version 12.16.1 LTS)
 * [iptables](https://www.netfilter.org/projects/iptables/index.html) (version 1.8.2, firewall)
 * [fail2ban](https://www.fail2ban.org/) (version 0.10.2, intrusion prevention)
 * [nginx](https://www.nginx.com/) (version 1.14.2, reverse proxy, SSL termination)
 * [acme.sh](https://github.com/acmesh-official/acme.sh) (version 2.8.9, for [LetsEncrypt](https://letsencrypt.org/) SSL certificates)
 * [rsyslog](https://www.rsyslog.com/) (version 8.1901.0, for logging)
 * [postfix](http://www.postfix.org/) (version 3.4, to relay local email notifications)
 * [jsonperfmon](https://github.com/pduveau/jsonperfmon) (forked to play nice with output, for performance monitoring)

Both the PostgreSQL and redis platforms use replication across our small cluster,
with automatic failover provided (in the case of PostgreSQL through repmgrd and
pgbouncer, in the case of redis through [redis-sentinel](https://redis.io/topics/sentinel)). 

## PostgreSQL performance

It's true that running PostgreSQL on 1Gb servers, alongside the application, might
seem like a really bad idea. For us, it isn't especially. We use redis a lot for 
write caching, so virtually all the fast-changing data is done through redis anyway, 
with background tasks periodically writing in batches to PostgreSQL. 

Switching from single inserts to batch inserts made a significant reduction in our 
need for server performance, so we do not really need a very fast database. We can
write blocks of a hundred records or so when we need to, and we don't even need to
wait for the insert to complete most of the time.

## High availability: repmgrd versus keepalived

To make any cluster handle outages, you need monitoring processes that keep an eye on other 
servers, and remove them if something goes wrong. The two common choices for PostgreSQL
are [repmgrd](https://repmgr.org/docs/current/using-repmgrd.html) 
and [keepalived](https://github.com/acassen/keepalived). repmgrd only works for PostgreSQL,
but contains builtin monitoring for it; keepalived is more general-purpose, and the price
you pay for that it that it doesn't know as much about the innards, so you need to put more
into your scripts for tracking and management. 

The choice between them was not a simple one, and after some 
trial and error (and pain) we found that repmgrd was easier to automate
the failover process in a consistent way. keepalived is certainly a lot more 
powerful, and we're very likely to use it again some day, but for now, and for us, repmgrd
works fine. 

The main advantage of repmgrd is that it is nicely integrated with and designed for
PostgreSQL, so it doesn't need anything like as much configuration as keepalived, 
which, being more general purpose, can handle cluster failover for many other
different services. For example, it provides pre-built scripts that allow a new standby node
to synchronize data from an upstream primary. With keepalived, that's something you'd need
to configure yourself.

## Service processes

The dynamic parts of our application run as [Express](https://expressjs.com/) 
services through [Node.js](https://nodejs.org/en/).
In development, these run from the command line, but for deployment, we use
systemd unit files to manage each of them. And we install [yarn](https://yarnpkg.com/) on all the servers
so that we can deploy the dependencies correctly. 

[I know that systemd is somewhat controversial](https://www.infoworld.com/article/3159124/linux-why-do-people-hate-systemd.html). But frankly, I don't care. For normal everyday
use it is significantly easier (and safer) than writing your own `init.d` files. There's
significantly less to go wrong.

All we want is for a command line to be able to start stable processes that restart 
automatically if they go down, and to have these processes start on boot. Actually, 
even that isn't especially important, as the whole cluster nature means a restart
always needs some kind of outside supervision, whether it's human or not, to make sure
that servers don't restart and create parallel database versions or what have you.
But the restart of the individual worker processes absolutely needs to be automatic and
clean, so that after, e.g., a minor version tweak, we can bounce the process. 

## Web access

A whole lot of our services are set up through some complex [nginx](https://www.nginx.com/) 
configuration. nginx does a lot for us, including:

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

Normally, all our web servers require HTTPS, so SSL is essential to our nginx setup. However, 
the load balancer also does health checks, and those prefer HTTP, so we allow one single
HTTP endpoint for the health checks. Everything else gets SSL checked, and either served
as a static file or proxied over HTTP internally to one of the service processes. 

## Other security issues

Obviously we have a firewall, and [iptables](https://www.netfilter.org/projects/iptables/index.html) 
works fine for us. I totally hate its
command line, but for deployment, it was very much simpler to template out a 
complete rule file and then import it when we need to. 

We also use [fail2ban](https://www.fail2ban.org/), with some very extensive rules to detect various attacks, 
both direct through ssh and indirect through web requests. Obviously, none of our
ssh accounts use passwords at all, but attackers don't know that, and it's quite
horrifying to see how many ssh brute force attacks happen in a single day. We have
a pretty strict policy of blocking any IP address that attacks us for a considerable
time. 

Our other fail2ban rules block nginx attacks, looking for home requests, proxying,
bots, and so on. Again, too many attacks and you get sent directly to jail through
iptables. There's a lot more we can do with fail2ban, and in an ideal world we'd have
a full web application firewall, but the reality is, what we have is plenty good 
enough and very sound and secure.

## Logging

Logging is handled in two parts: we have logging clients and logging servers.
Every server is set up as a logging client, and we choose a subset to run as 
logging servers. On every client, we use rsyslog to forward logging events
*if and only if they originate on the local machine* to all of the logging servers.

Logging servers are slightly different. They add an action to listen for
incoming logging events, and then drop these into a new file in `/var/log`, 
with an appropriate log rotation setup. It really is that simple. 

The only downside is that instead of having a nice GUI and indexed searching, 
we need to use grep, but in practice, that is just fine. 99% of the time we 
know exactly when an event happened and can filter accordingly. And rsyslog
is extremely flexible and allows us to add additional reporting and notifications
very easily, any time we need it.

We also use a tweaked version of [jsonperfmon](https://github.com/pduveau/jsonperfmon), a perfect little C program that
simply writes out a very complete assessment of the local machine's state 
every n seconds. Our [tweaked version](https://github.com/morungos/jsonperfmon)
only has [one significant change](https://github.com/morungos/jsonperfmon/commit/84d0ce04699734de05eae75054b8743a41843243), which writes the output to syslog 
rather than standard output. This means we can neatly run it as a service
through systemd, and now, in our aggregated logs, we get a complete track of
performance across the entire cluster.  

## Deployment

That about describes the technical infrastructure, so how do we get it onto 
the servers?

We use [Ansible](https://www.ansible.com/) for that. Instead of worrying about Puppet, 
Chef, or Kubernetes, Ansible simply allows coordinated ssh access to more-or-less bare 
servers, with a whole bunch of idempotent
actions that do things like create directories, copy files, templating, 
executing shell commands when needed, and so on.

In many cases, the actions are pretty simple. The application itself is run 
as a Node.js service, so we simply need to copy files over, run yarn to 
install the dependencies, and deploy a service file for systemd, then we
can start the service and there will be a new worker process running, which
nginx can proxy to. 

However, the clusters, both redis and PostgreSQL, are a lot more complex, 
because the nodes need to know about each other. We have a relatively complex
set of Ansible plays that deploys the PostgreSQL cluster, with repmgrd, and
will repair a cluster when we need to. In essence, this looks at the current
state (if servers are running) and either nominates a primary and a standby,
or uses ones that exist, and then does the minimum changes necessary to 
make the cluster operational.

redis is simpler, because redis-sentinel makes it pretty easy. We run a 
sentinel on every application node, alongside a redis instance, and all
application nodes have both. The only difference is that one of them will
be a primary. 

Apart from redis, PostgreSQL, and logging, everything else is identical on all servers, 
which makes Ansible nice and simple.

[Ansible](https://www.ansible.com/) is something of an acquired taste. The concept is a nice one, but
the messy use of YAML files for everything is not as clean as it might be. 

## And the result is...

We now have a small, lean, server setup, where we can afford to lose a 
machine at any time without interruption or loss of data or service. It's 
cheap and fairly easy to maintain, without the layers of complexity of a
Kubernetes setup. 

The main loss? Digital Ocean's database service was very very good, and pro-actively
dealt with issues before we even had to worry about them. 

We have gained in a few places, though: we now have redundancy in our logging system,
and direct access to our database servers, which means we can implement our
own backup strategies a little more easily than is usually allowed by cloud-native
services. It's just as easy to scale, as we can add more application servers 
very simply. And if the database service does need to expand, it's very easy
to use Ansible to segment off the database management to a few larger and more
dedicated servers.

And to cap it all, it costs around 25% of the amount we were paying before, by eliminating
the need for the dedicated database service and logging server.