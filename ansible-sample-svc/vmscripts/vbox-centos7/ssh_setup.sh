#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
source "$SCRIPT_PATH/utils.sh" centos-base "$SCRIPT_PATH/vdi"
PROJECTROOT_PATH=$(cd $SCRIPT_PATH/../..; pwd)

COUNT_VMS=${1:-$DEFAULT_COUNT_VMS}

ssh_copy_id() {
    local vmname=$1
    local vmip=$(vm_ip $vmname)

    ssh-copy-id root@"$vmip" 
}

ssh_copy_ids() {
    while read vmname; do
        if vm_running $vmname; then
            ssh_copy_id $vmname
        fi
    done
}

gen_names centos $COUNT_VMS | ssh_copy_ids

