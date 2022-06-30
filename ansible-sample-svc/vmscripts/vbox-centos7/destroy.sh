#!/bin/bash
#!/bin/bash

SCRIPT_PATH=$(dirname "$0")
PROJECTROOT_PATH=$(cd $SCRIPT_PATH/../..; pwd)

$SCRIPT_PATH/down.sh $1
$SCRIPT_PATH/remove.sh





