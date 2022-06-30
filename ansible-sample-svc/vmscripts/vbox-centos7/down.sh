#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
source "$SCRIPT_PATH/utils.sh" centos-base "$SCRIPT_PATH/vdi"

COUNT_VMS=${1:-$DEFAULT_COUNT_VMS}

gen_names centos $COUNT_VMS | down_vms
gen_names centos $COUNT_VMS | wait_shutdown_vms


