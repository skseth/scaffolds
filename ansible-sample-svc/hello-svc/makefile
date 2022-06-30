# Usage : "make help" will list all public targets
# Usage : "make doc | more" explains some aspects of makefiles

define DOCUMENTATION
@echo ''
@echo 'DOCUMENTATION ON MAKEFILE FEATURES USED'
@echo ''
@echo 'A basic make rule looks like this :'
@echo 'my-service : main.go pkg/server.go'
@echo '        go build main.go -o my-service'
@echo ''
@echo 'Here "my-service" is the target, "main.go" and "go.mod" are the prerequisites needed for the target'
@echo '"go build main.go -o my-service" is the command to make the target from the sources.'
@echo 'a tab before the command is necessary'
@echo ''
@echo 'make looks for files matching the target name, otherwise it tries to build the target.'
@echo 'marking targets as .PHONY lets make know they are not real files'
@echo ''
@echo 'Make automatic variables'
@echo '$$@ - current target e.g. $$@ is "my-service"'
@echo '$$< - current source e.g. $$< is "main.go pkg/server.go"'
@echo ''
@echo 'Make variables'
@echo '":=" evaluates immediately, "=" expands on use'
@echo 'See https://www.gnu.org/software/make/manual/make.html#Values'
@echo ''
@echo 'You can override a variable while running make. For example :'
@echo 'make BUILD_NUMBER=2 all'
@echo ''
@echo 'PLEASE READ'
@echo 'GNU Make introduction : https://www.gnu.org/software/make/manual/make.html#Introduction'
@echo 'Escaping Rules in commands : https://www.cmcrossroads.com/article/gnu-make-escaping-walk-wild-side'
endef


PWD := $(shell pwd)
VERSION := $(shell cat VERSION)
OUT_DIR=out

BUILD_NUMBER=1

SERVICE_NAME=hello-service
SERVICE_NAME_VERSION=hello-service-${VERSION}
SERVICE_LOCAL_BINARY=${OUT_DIR}/${SERVICE_NAME}
SERVICE_BINARY=${OUT_DIR}/${SERVICE_NAME}-linux
SERVICE_SOURCES := $(shell find . -name '*.go')

RPM_SRC_IN_DIR=${OUT_DIR}/${SERVICE_NAME_VERSION}

RPM_TOP_DIR=${PWD}/${OUT_DIR}/hello-rpm
RPM_SRC_DIR=${RPM_TOP_DIR}/SOURCES
RPM_SRC_TARGZ=${RPM_SRC_DIR}/${SERVICE_NAME_VERSION}.tar.gz

RPM_RPMS_DIR=${RPM_TOP_DIR}/RPMS
SERVICE_RPM=${RPM_RPMS_DIR}/x86_64/${SERVICE_NAME_VERSION}-${BUILD_NUMBER}.x86_64.rpm

${SERVICE_LOCAL_BINARY}: ${SERVICE_SOURCES} go.mod go.sum
	go build -o $@ cmd/hello.go

${SERVICE_BINARY}: ${SERVICE_SOURCES} go.mod go.sum
	GOOS=linux go build -o $@ cmd/hello.go

${RPM_SRC_TARGZ}: ${SERVICE_BINARY} rpm/LICENSE rpm/hello.service rpm/hello.json rpm/hello.sysconfig
	rm -rf ${RPM_SRC_IN_DIR}
	mkdir -p ${RPM_SRC_IN_DIR}
	mkdir -p ${RPM_SRC_DIR}
	cp ${SERVICE_BINARY} ${RPM_SRC_IN_DIR}/${SERVICE_NAME}
	cp rpm/{LICENSE,hello.service,hello.json,hello.sysconfig} ${RPM_SRC_IN_DIR}
	tar -cvzf $@ --directory ${OUT_DIR} ${SERVICE_NAME_VERSION}

${SERVICE_RPM}: ${RPM_SRC_TARGZ} rpm/hello-service.spec
	rm -rf ${RPM_TOP_DIR}/{BUILD,RPMS}
	mkdir -p ${RPM_TOP_DIR}/{BUILD,RPMS}
	@docker run -it -v ${PWD}:/app --user root rpmbuild/centos7 rpmbuild -v -bb \
		--define "_topdir /app/out/hello-rpm" \
		--define "version ${VERSION}" \
		--define "build_number ${BUILD_NUMBER}" \
		/app/rpm/hello-service.spec


## local: Build a binary for local os
.PHONY : local
local: ${SERVICE_LOCAL_BINARY}

## build: Build a linux binary
.PHONY : build
build: ${SERVICE_BINARY} 

## rpmtar: Generate rpm tar file
.PHONY : rpmtar
rpmtar: ${RPM_SRC_TARGZ}

## rpm: Generate rpm
.PHONY : rpm
rpm: ${SERVICE_RPM}

## all: build & package as rpm
.PHONY : all
all: build rpm

# DOC: help just scrapes this makefile for lines beginning with ## 
## help: this command
.PHONY : help
help : makefile
	@sed -n 's/^##//p' $<

.PHONE : doc
doc: 
	${DOCUMENTATION}

