## Setup Virtual Machines

Create a vm using a centos-7 image and save the resulting vm in vmscripts/vbox-centos7/vdi/centos-base.vdi.
Remember the root password

Run 

```shell
pushd ./vmscrips/vbox-centos7 

# create 3 vms
./up.sh 3

# copy you ~/.id_rsa.pub file to root user's ssh setup (you need to enter root password)
./ssh_setup.sh

# generate ip address for the vms in the environments/dev/host_vars directory
./ansible_vars.sh

popd

# create a new devops user in each vm with ssh access 
ansible-playbook add-user-ssh.yml -e "ansible_user=root"
```

To mount a shared folder, first use virtualbox ui to map a shared folder (e.g. work)

then :

```shell
ssh devops@<ipaddress>
mkdir ~/work
sudo mount -t vboxsf -o uid=$UID,gid=$(id -g) work /home/devops/work
```

## Running the vms

If you want to stop/start the vms:

```shell
# shutdown
./down.sh

# start
./up.sh
```

To remove the vms :

```shell
./vmscripts/vbox-centos7/remove.sh

```

To see the ips :

```shell
./vmscripts/vbox-centos7/ips.sh

```

## Building hello-svc

To build hello-svc on a centos machine

```shell
sudo yum install rpm-build
make publish
```

However, if working on a mac/windows machine, you can do this in steps :

```shell

make rpmtar
ssh devops@<ip of centos machine>
cd work/ansible-sample-svc/hello-svc # assuming work is mapped to host folder
make publish
```

# Vault setup

See [Using vault to protect sensitive data](https://www.digitalocean.com/community/tutorials/how-to-use-vault-to-protect-sensitive-ansible-data-on-ubuntu-16-04)

For this setup, the vault file should be placed in ~/.ansible_protected/vault.yml. Follow the convention of naming all values here with a "vault_" prefix.

e.g.

```yaml
---
vault_mysql_password: sqlpass
```

Create a file containing  the password : ~/.ansible_protected/ansible_vault_pass. You can chmod to protect the file if you like. In ansible.cfg, the "vault_password_file" is set to point to this file.



To encrypt / view / edit / decrypt use ansible-vault:

```shell
ansible-vault encrypt ~/.ansible_protected/vault.yml
ansible-vault view ~/.ansible_protected/vault.yml
ansible-vault edit ~/.ansible_protected/vault.yml
ansible-vault decrypt ~/.ansible_protected/vault.yml
```

## Running the playbook

```shell
# to install
ansible-playbook playbook.yml

# to uninstall
ansible-playbook cleanup.yml

# to print variables
ansible-playbook printvars.yml

```


## Nginx Setup Steps

https://gist.github.com/taufiqibrahim/d7f697de6bb8b93ca348a5b94d6adbfc

wget https://nginx.org/download/nginx-1.12.2.tar.gz
