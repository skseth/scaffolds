#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
source "$SCRIPT_PATH/utils.sh" centos-base "$SCRIPT_PATH/vdi"

COUNT_VMS=${1:-$DEFAULT_COUNT_VMS}

gen_names centos $COUNT_VMS | filter_existing | remove_vms 
