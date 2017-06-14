
SCRIPT_DIR="$(dirname $0)"

TS_PLUGIN=`which protoc-gen-ts`
GO_PLUGIN=`which protoc-gen-go`

SRC_DIR="${1:-$SCRIPT_DIR}"
TARGET_DIR="${2:-build}"
PROTOFILE=${3:-helloworld.proto}

mkdir -p $TARGET_DIR/{js,go,ts}

protoc \
  --plugin=protoc-gen-ts=$TS_PLUGIN \
  --plugin=protoc-gen-go=$GO_PLUGIN \
  -I $SRC_DIR \
  --js_out=import_style=commonjs,binary:$TARGET_DIR/js \
  --go_out=plugins=grpc:$TARGET_DIR/go \
  --ts_out=service=true:$TARGET_DIR/ts \
  $PROTOFILE
