---
layout: post
title: Using the maven-release-plugin
author: Stuart
summary: >-
  A few challenges getting release processes to work with Apache Maven
---

I've been working on packaging some of the reusable components I work with, so
I can make a nice and simple deployment process. It's all Java code, and it's
on Github, so up to now I've been using [Github Releases](https://github.com/blog/1547-release-your-software),
which works fairly well in that it does allow reasonably large packages to
be stored and accessed.

My workflow isn't that sophisticated, so generally I've been making the releases
manually and it's been a bit of a chore. Also, I'm now trying to automate with
a Debian package, and since that expects a reasonably well-defined notion of
an upstream package, it doesn't work that well.

Enter [maven-release-plugin](http://maven.apache.org/maven-release/maven-release-plugin/index.html).

This automates a lot of the process needed to push built artifacts to Maven
Central. This includes sources and Javadocs, and works much more smoothly than
manual releases. There is, however, a price to pay. Setting it up and getting
it all working is not entirely trivial.

These sources are helpful:

* [Deploy to Maven Central Repository](http://www.sonatype.org/nexus/2015/01/08/deploy-to-maven-central-repository/)
* [Deploying to OSSRH with Apache Maven](http://central.sonatype.org/pages/apache-maven.html)

First of all, you'll need GPG. If you're as unlucky as I am, and don't have admin
access to your own damn laptop, you'll need to build it and all its dependencies
from source. For the lucky ones, it's probably much easier with Homebrew.

You'll need GPG because Maven Central likes signatures for its components (these
come in `.asc` files, so they're more than regular SHA1 or MD5 thumbprints).

You'll also need a Sonatype identity, and to raise a ticket for your group identifier.

Next, you'll need a bunch of stuff in the `pom.xml`, including:

* The `name`
* The `description`
* A `url`
* The `licenses`
* The `issueManagement`
* The `scm`
* The `developers`
* A `distributionManagement` description

The SCM is key -- the way `maven-release-plugin` works isn't described well, but
basically it has a `release:prepare` goal that creates a bunch of commits that
contain version information, and it pushes them to the remote. Then, the
`release:perform` goal actually checks that out into a subfolder, builds
everything with that new version data, packages it, signs it, and uploads it
to a staging system -- which is specified in the `distributionManagement`
element.

Versioning happens automatically with this. If your `pom.xml` has a version
`3.0.1-SNAPSHOT`, then the new release will become (by default) `3.0.1`, and the
`pom.xml` will be edited to (by default) `3.0.2-SNAPSHOT`. You can change these
if you're doing something bigger with semantic versioning, but you can do that
outside the release process.

Once you have set everything up (don't do this until you've added all the
settings and plugins, but I'm documenting it here for clarity) the release
process becomes, fairly simply:

    $ mvn release:clean release:prepare release:perform

As I said, there are a bunch of plugins you need to configure, and settings that are
worth adding to you `settings.xml` (to keep them out of the `pom.xml`).
The plugins do various parts of the processing needed to make the signing
work, and it does seem to require them being explicitly added to the `pom.xml`.

Here's what mine looks like. You'll see a fair few references to `ossrh` which
seems to associate everything. I'm sure any key will do, but this works well
and is consistent with the recommendations from Sonatype.

And good luck, you'll probably need it.

### Included in the `pom.xml`:

    <distributionManagement>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        </snapshotRepository>
        <repository>
            <id>ossrh</id>
            <url>https://oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
    </distributionManagement>


### Included in the `pom.xml` (under `build/plugins`):

    <plugin>
        <groupId>org.sonatype.plugins</groupId>
        <artifactId>nexus-staging-maven-plugin</artifactId>
        <version>1.6.3</version>
        <extensions>true</extensions>
        <configuration>
            <serverId>ossrh</serverId>
            <nexusUrl>https://oss.sonatype.org/</nexusUrl>
            <autoReleaseAfterClose>true</autoReleaseAfterClose>
        </configuration>
    </plugin>

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-source-plugin</artifactId>
        <version>2.2.1</version>
        <executions>
            <execution>
                <id>attach-sources</id>
                <goals>
                    <goal>jar-no-fork</goal>
                </goals>
            </execution>
        </executions>
    </plugin>

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-javadoc-plugin</artifactId>
        <version>2.9.1</version>
        <executions>
            <execution>
                <id>attach-javadocs</id>
                <goals>
                    <goal>jar</goal>
                </goals>
            </execution>
        </executions>
    </plugin>

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-release-plugin</artifactId>
        <version>2.5.3</version>
    </plugin>

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-gpg-plugin</artifactId>
        <version>1.5</version>
        <executions>
            <execution>
                <id>sign-artifacts</id>
                <phase>verify</phase>
                <goals>
                    <goal>sign</goal>
                </goals>
            </execution>
        </executions>
    </plugin>

### Various elements in `settings.xml`:

    <servers>
      ...
      <server>
        <id>ossrh</id>
        <username>xxx</username>
        <password>xxx</password>
      </server>
    </servers>

    <profiles>
      ...
      <profile>
        <id>ossrh</id>
        <activation>
          <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
          <gpg.executable>gpg2</gpg.executable>
          <gpg.keyname>xxx</gpg.keyname>
          <gpg.passphrase>xxx</gpg.passphrase>
          <gpg.defaultKeyring>false</gpg.defaultKeyring>
          <gpg.useagent>true</gpg.useagent>
          <gpg.lockMode>never</gpg.lockMode>
          <gpg.homedir>/Users/stuartw/.gnupg</gpg.homedir>
          <gpg.publicKeyring>/Users/stuartw/.gnupg/pubring.gpg</gpg.publicKeyring>
          <gpg.secretKeyring>/Users/stuartw/.gnupg/secring.gpg</gpg.secretKeyring>
        </properties>
      </profile>
    </profiles>
