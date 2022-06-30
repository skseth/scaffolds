
virsh shutdown centos7.0
virsh shutdown centos7.0-2

virsh snapshot-revert --domain centos7.0 --snapshotname centos7.0-clean
virsh snapshot-revert --domain centos7.0-2 --snapshotname centos7.0-2-clean

sleep 5

virsh start centos7.0
virsh start centos7.0-2
