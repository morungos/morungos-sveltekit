---
layout: post
title: Virtualbox secure networking
author: Stuart
summary: >-
  Yes, you too can lock down the networking
  system for a virtual machine so that a VM can't bypass the host's firewall, but
  you'll need to remove this component to do it
---

A work challenge that came up today is: is it possible to lock down the networking
system for a virtual machine so that a VM can't bypass the host's firewall.

On Virtualbox, there are a number of networking modes, but the ones that are
problematic are "Host Only" and "Bridged". These essentially have kernel modules
that manage various parts of the host environment, including one that taps into
the core networking systems so that packets can be sent and received
directly, bypassing the host security systems.

So it seems that the following command unloads that one particular kernel extension:

    sudo kextunload -b org.virtualbox.kext.VBoxNetFlt

After this, VMs can't start in "Host Only" or "Bridged" networking, but they can
still run using NAT or other modes that remain within the host system's
security layers.

If the module is reloaded:

    sudo kextload "/Library/Application Support/VirtualBox/VBoxNetFlt.kext" -r "/Library/Application Support/VirtualBox"

Then "Host Only" and "Bridged" modes are enabled again.

This indicates that this kernel extension, and this kernel extension alone,
seems to be a possible mechanism for locking a VM's networking within the
host, essentially limiting the VMs to what the host (and the user which
backs the virtual machines within the host) can do.

So yes, it does seem VMs can be contained within the host, or prevented from
bypassing the host's firewalls and security systems, at least in principle, by
permanently disabling or deleting this kernel extension.
