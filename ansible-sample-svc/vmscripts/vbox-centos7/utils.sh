#!/bin/bash

vm_exists() {
    local VM_NAME=$1
    VBoxManage showvminfo $VM_NAME >/dev/null 2>&1
}

vm_running() {
    local VM_NAME=$1
    vm_exists $VM_NAME && VBoxManage showvminfo $VM_NAME | grep -c "running (since" > /dev/null 2>&1
}

vm_ip() {
    local VM_NAME=$1
    VBoxManage guestproperty get $VM_NAME "/VirtualBox/GuestInfo/Net/1/V4/IP" | awk '{print $2}'
}

clone_vm() {
    local FROM_VM_NAME=$1
    local FROM_SNAPSHOT_NAME=$2
    local TO_VM_NAME=$3

    echo "Cloning $VM_NAME"

    VBoxManage clonevm \
        $FROM_VM_NAME \
        --mode machine \
        --name $TO_VM_NAME \
        --snapshot $FROM_SNAPSHOT_NAME \
        --options link \
        --register 

}

remove_vm() {
    local VM_NAME=$1

    echo "Removing $VM_NAME"

    # creare vn
    VBoxManage unregistervm $VM_NAME --delete
}

shutdown_vm() {
    local VM_NAME=$1

    echo "Shutting down $VM_NAME"
    VBoxManage controlvm $VM_NAME acpipowerbutton  
}

wait_shutdown_vm() {
    local VM_NAME=$1
    local i=1

    while vm_running $VM_NAME && [ $i -le 10 ]; do
        echo "waiting for vm $VM_NAME to shutdown"
        sleep 3
        let i=$(($i+1))
    done
}

realpath() {
    path=`eval echo "$1"`
    folder=$(dirname "$path")
    echo $(cd "$folder"; pwd)/$(basename "$path"); 
}

gen_names() {
    local BASENAME=$1
    local END=$2
    local i=1

    while [ $i -le $END ]; do
        echo "$BASENAME-$i"
        let i=$(($i+1))
    done
}

filter_existing() {
    while read vmname; do
        if vm_exists $vmname; then
            echo $vmname
        fi
    done
}

filter_notexisting() {
    while read vmname; do
        if ! vm_exists $vmname; then
            echo $vmname
        fi
    done
}

remove_vms() {
    while read vmname; do
        remove_vm $vmname
    done
}

up_vms() {
    BASE_VM=$1
    BASE_SNAPSHOT=$2
    while read vmname; do
        echo "Starting up_vm $vmname"
        if ! vm_exists $vmname; then
            echo "vm clone $vmname"
            clone_vm $BASE_VM $BASE_SNAPSHOT $vmname
            echo "vm clone ... done $vmname"
        fi

        if ! vm_running $vmname; then
            echo "vm startvm $vmname"
            VBoxManage startvm $vmname --type headless
            echo "vm startvm ... done $vmname"
        fi
    done
}

down_vms() {
    while read vmname; do
        if vm_running $vmname; then
            shutdown_vm $vmname
            echo $vmname
        fi
    done
}

wait_shutdown_vms() {
    while read vmname; do
        wait_shutdown_vm $vmname 
    done
}

DEFAULT_COUNT_VMS=3




