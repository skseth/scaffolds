#!/bin/bash
#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
PROJECTROOT_PATH=$(cd $SCRIPT_PATH/../..; pwd)

$SCRIPT_PATH/up.sh $1
sleep 20

$SCRIPT_PATH/ssh_setup.sh
$SCRIPT_PATH/ansible_vars.sh

pushd $PROJECTROOT_PATH
ansible-playbook add-user-ssh.yml -e "ansible_user=root"

popd




