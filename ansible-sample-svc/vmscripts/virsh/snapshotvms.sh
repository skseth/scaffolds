

virsh shutdown centos7.0
virsh shutdown centos7.0-2

virsh snapshot-create-as --domain centos7.0 centos7.0-clean
virsh snapshot-create-as --domain centos7.0-2 centos7.0-2-clean

virsh start centos7.0
virsh start centos7.0-2

