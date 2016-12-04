#!/bin/bash
# Echo Widget

echo "Echo Widget Running"
echo "-------------------"

dir=$(cd "$(dirname "$0")"; pwd -P)
tail -f $dir/../log.txt
