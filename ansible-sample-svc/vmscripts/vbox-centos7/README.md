# Setting up a centos vb image for VirtualBox

This is now surprisingly hard.

See https://www.if-not-true-then-false.com/2010/install-virtualbox-guest-additions-on-fedora-centos-red-hat-rhel/


## Setup Networking

vi /etc/sysconfig/network-scripts/ifcfg-<adapteraddress>

```
DEVICE=<adapteraddress>
BOOTPROTO=none
ONBOOT=yes
```

reboot

## Install packages 

```shell
yum update kernel*
yum install bzip2 tar
yum install kernel-devel
yum install gcc make perl

## CentOS 7 and Red Hat (RHEL) 7 ##
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

reboot
```

## Install GuestAdditions

https://forums.virtualbox.org/viewtopic.php?f=3&t=91563

```shell
mkdir /media/VirtualBoxGuestAdditions
mount -r /dev/cdrom /media/VirtualBoxGuestAdditions
cd /media/VirtualBoxGuestAdditions
./VBoxLinuxAdditions.run
```

reboot

## Setup SSH

useradd -m -s /bin/bash devops -p devops

## Miscellaneous

vi /etc/environment

add these lines...

LANG=en_US.utf-8
LC_ALL=en_US.utf-8

MH001675748201920P


## Steps to create VMs

./up.sh
./ansible_vars.sh
./ssh_setup.sh

# Steps to destroy vms

./down.sh
./remove.sh





