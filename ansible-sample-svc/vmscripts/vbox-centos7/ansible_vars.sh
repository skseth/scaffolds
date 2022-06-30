#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
source "$SCRIPT_PATH/utils.sh" centos-base "$SCRIPT_PATH/vdi"
PROJECTROOT_PATH=$(cd $SCRIPT_PATH/../..; pwd)

ENV=${1:-dev}
HOST_VARS_FOLDER=$PROJECTROOT_PATH/environments/$ENV/host_vars
COUNT_VMS=${2:-$DEFAULT_COUNT_VMS}

publish_file() {
    local vmname=$1
    local vmip=$(vm_ip $vmname)
    local filename=$HOST_VARS_FOLDER/$vmname

    echo $filename

    cat <<EOF > $filename
---
ansible_host: $vmip
EOF
}

publish_files() {
    while read vmname; do
        if vm_running $vmname; then
            publish_file $vmname
        fi
    done
}

mkdir -p $HOST_VARS_FOLDER
gen_names centos $COUNT_VMS | publish_files

