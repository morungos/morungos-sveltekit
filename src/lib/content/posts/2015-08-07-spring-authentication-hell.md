---
title: Spring authentication hell
author: Stuart
summary: >-
  Authentication can be the very worst, especially when you are using
  OpenID Connect with Active Directory
---

Don't get me wrong, I love the Spring framework.

There are times, however, when it feels entirely broken for common use cases.  

So here's the scenario: I'm trying put together an Open ID Connect Provider which is backed by multiple LDAP servers. Where I work, we have three or four different Active Directory domains for different parts of the organization, so the only known viable way to authenticate is simply to try them until a username works. They're all Active Directory, so you do get back decently rich information, all the information that's needed by Open ID Connect is available immediately on bind.

But Active Directory is weird enough that there are a few anomalies:

 1. The way to authenticate is to bind, search for yourself, and return the authorities
 2. Bind DNs don't really work, you need to bind to something like: `user@domain`
 3. There's no manager account (or anonymous bind), so you can't bind to a manager user to search for a user's DN to re-bind

Point 3 is important, as So Spring Security provides an entirely separate `ActiveDirectoryLdapAuthenticationProvider` that differs from the normal `LdapAuthenticationProvider` in that it doesn't do the whole manager-bind thing, and therefore doesn't use a `contextSource`. This means that the only chance you get to read the LDAP information is from the `ActiveDirectoryLdapAuthenticationProvider`, but if you put in the right mapper you can get all the details you need for Open ID Connect, it's just that you can only get them through the authentication process in Spring Security. Your new `Principal` will have the details you need. Here's the configuration I used.

    <bean id="personContextMapper"
          class="org.springframework.security.ldap.userdetails.InetOrgPersonContextMapper"></bean>

    <bean id="researchAuthProvider"
          class="org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider">
      <constructor-arg value="ads.uhnresearch.ca" />
      <constructor-arg value="ldap://xxx.xxx.xxx.xxx" />
      <property name="userDetailsContextMapper" ref="personContextMapper" />
    </bean>


Now we try to connect this to the Mitre Open ID Connect provider, which works fine with LDAP. Unfortunately, it works fine with "classic" LDAP, not Active Directory. It depends on having a shared `contextSource` to read the Open ID Connect information it needs to store and return. But guess what, since we can't use a manager account, we can't give it a `contextSource`.

Of course, we shouldn't really need to do any of that anyway. We already have all the user information we need, in the `Principal` we get from Active Directory. Sadly, the Mitre Open ID Connect code uses an interceptor that, once it has the principal, then uses only the username to request the user details. The code looks a bit like this:

    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    ...
    if (auth instanceof OIDCAuthenticationToken) {
       ...
    } else {
      // don't bother checking if we don't have a principal or service
      if (auth != null && auth.getName() != null && userInfoService != null) {

        // try to look up a user based on the principal's name
        UserInfo user = userInfoService.getByUsername(auth.getName());
        ...
      }
    }

The question is: if we have a rich authentication result, why should we reduce that to a username, and then use a service to locate it by username.

Bear in mind that this is the primary interceptor, so it's really not meant to be touched. The information service is what we are supposed to adapt.

It seems simple, but shouldn't the service API really look like:

    if (auth != null && userInfoService != null) {
      UserInfo user = userInfoService.getByPrincipal(auth);
      ...
    }

None of this would be as bad if we were using straight up LDAP, as we'd be able to implement a `userInfoService` that could use a manager account to read back the user information. So it's one of those nasty conflicts between Active Directory usage and the expectations of the Mitre Open ID Connect framework.

And on the other hand, Spring Security's LDAP component, by enabling people to use a context source that is exposed, generated a whole set of applications like this that *assume* it, and therefore cannot work with Active Directory.

Active Directory *is* LDAP, and there is really no good reason why Spring Security uses an entirely different API for it.
