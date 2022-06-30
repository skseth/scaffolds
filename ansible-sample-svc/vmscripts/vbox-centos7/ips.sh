#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
source "$SCRIPT_PATH/utils.sh" centos-base "$SCRIPT_PATH/vdi"

COUNT_VMS=${1:-$DEFAULT_COUNT_VMS}

vm_ips() {
    while read vmname; do
        if vm_running $vmname; then
            ip=$(vm_ip $vmname)
            echo "$vmname ansible_host=$ip"
        fi
    done
}


gen_names centos $COUNT_VMS | vm_ips

