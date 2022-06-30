%define debug_package %{nil}
%define name         hello-service
%define _install_dir /opt/hello-service
%define _conf_dir    %{_sysconfdir}/hello-service
%define _log_dir     %{_var}/log/hello-service

Summary: Hello Service is an example golang service
Name: hello-service
Version: %{version}
Release: %{build_number}
License: MIT
URL: https://github.com/skseth/ansible-sample-svc/hello-svc
Source: hello-service-%{version}.tar.gz
Vendor: Samir Seth
Packager: Samir Seth
Provides: hello
BuildRequires: systemd
Requires(post): systemd
Requires(preun): systemd
Requires(postun): systemd
BuildArch:      x86_64

%description
Hello Service

%prep
%setup -q

%build

%install
mkdir -p $RPM_BUILD_ROOT%{_install_dir}
mkdir -p $RPM_BUILD_ROOT%{_unitdir}
mkdir -p $RPM_BUILD_ROOT%{_log_dir}
mkdir -p $RPM_BUILD_ROOT%{_conf_dir}
install -p -D -m 755 hello-service $RPM_BUILD_ROOT%{_install_dir}
install -p -D -m 755 LICENSE $RPM_BUILD_ROOT%{_install_dir}
install -p -D -m 755 hello.service $RPM_BUILD_ROOT%{_unitdir}
install -p -D -m 644 hello.json $RPM_BUILD_ROOT%{_conf_dir}
install -p -D -m 644 hello.sysconfig $RPM_BUILD_ROOT%{_sysconfdir}/sysconfig/hello

%pre
/usr/bin/getent group helloapp >/dev/null || /usr/sbin/groupadd -r helloapp
if ! /usr/bin/getent passwd helloapp >/dev/null ; then
    /usr/sbin/useradd -r -g helloapp -m -d %{_install_dir} -s /bin/bash -c "Hello Service" helloapp
fi

%post
%systemd_post hello.service

%preun
%systemd_preun hello.service

%files
%defattr(0755, helloapp, helloapp, 0755)
%{_install_dir}/hello-service
%{_install_dir}/LICENSE
%config(noreplace) %{_conf_dir}/hello.json
%config(noreplace) %{_sysconfdir}/sysconfig/hello
%attr(0755,root,root) %{_unitdir}/hello.service
%attr(0755,helloapp, helloapp) %dir %{_log_dir}

