package ctx

import (
	"context"
	"os"
	"path"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

type correlationIdType int

const (
	requestIdKey correlationIdType = iota
	sessionIdKey
)

var logger *zap.Logger
var lumberjackLogger *lumberjack.Logger

func init() {
	// a fallback/root logger for events without context
	logger, _ = zap.NewProduction()
}

// Configure configures logger based on environment
func Configure(logfilename string, logdir string) {
	writers := []zapcore.WriteSyncer{os.Stdout}
	if logdir != "" {
		writers = append(writers, newRollingFile(logfilename, logdir))
	}

	logger = newZapLogger(zapcore.NewMultiWriteSyncer(writers...))
	zap.RedirectStdLog(logger)
	logger.Info("logging configured",
		zap.Bool("fileLogging", logdir != ""),
		zap.String("logDirectory", logdir),
		zap.String("logFilename", logfilename))
}

// Rotate rotates logs if we are logging to a file
func Rotate() {
	if lumberjackLogger != nil {
		lumberjackLogger.Rotate()
	}
}

// Sync needs to be called before exit to avoid losing logs which may be buffered
func Sync() {
	logger.Sync()
}

func newRollingFile(logfilename string, logdir string) zapcore.WriteSyncer {
	if err := os.MkdirAll(logdir, 0744); err != nil {
		logger.Error("failed create log directory",
			zap.Error(err),
			zap.String("path", logdir))
		return nil
	}

	lumberjackLogger = &lumberjack.Logger{
		Filename:   path.Join(logdir, logfilename),
		MaxSize:    5,  //megabytes
		MaxAge:     10, //days
		MaxBackups: 5,  //files
	}

	return zapcore.AddSync(lumberjackLogger)
}

func newZapLogger(output zapcore.WriteSyncer) *zap.Logger {
	encCfg := zapcore.EncoderConfig{
		TimeKey:        "@timestamp",
		LevelKey:       "level",
		NameKey:        "logger",
		CallerKey:      "caller",
		MessageKey:     "msg",
		StacktraceKey:  "stacktrace",
		EncodeLevel:    zapcore.LowercaseLevelEncoder,
		EncodeTime:     zapcore.ISO8601TimeEncoder,
		EncodeDuration: zapcore.NanosDurationEncoder,
	}

	encoder := zapcore.NewJSONEncoder(encCfg)

	return zap.New(zapcore.NewCore(encoder, output, zap.NewAtomicLevel()))
}

// WithRequestId Add request id to context
func WithRequestId(ctx context.Context, rqId string) context.Context {
	return context.WithValue(ctx, requestIdKey, rqId)
}

// WithSessionId Add session id to context
func WithSessionId(ctx context.Context, sessionId string) context.Context {
	return context.WithValue(ctx, sessionIdKey, sessionId)
}

// Logger returns a zap logger with as much context as possible
func Logger(ctx context.Context) *zap.Logger {
	newLogger := logger
	if ctx != nil {
		if ctxRqId, ok := ctx.Value(requestIdKey).(string); ok {
			newLogger = newLogger.With(zap.String("rqId", ctxRqId))
		}
		if ctxSessionId, ok := ctx.Value(sessionIdKey).(string); ok {
			newLogger = newLogger.With(zap.String("sessionId", ctxSessionId))
		}
	}
	return newLogger
}
