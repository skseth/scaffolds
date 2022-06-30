#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
source "$SCRIPT_PATH/utils.sh" centos-base "$SCRIPT_PATH/vdi"

COUNT_VMS=${1:-$DEFAULT_COUNT_VMS}

gen_names centos $COUNT_VMS | up_vms centos-base GA_and_networking



