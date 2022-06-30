package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/kelseyhightower/envconfig"
	ctx "github.com/skseth/ansible-sample-svc/hello-svc/ctx"
	server "github.com/skseth/ansible-sample-svc/hello-svc/server"
	"go.uber.org/zap"
)

type Config struct {
	Port      string `default:"8080"`
	NoFileLog bool   `default:false`
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func handleSighup() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, syscall.SIGHUP)

	go func() {
		for {
			<-c
			ctx.Rotate()
		}
	}()
}

func main() {
	var c Config
	err := envconfig.Process("hello", &c)
	if err != nil {
		log.Fatal(err.Error())
	}

	if !c.NoFileLog {
		ctx.Configure("hello.log", "/var/log/hello-service")
	}
	defer ctx.Sync()

	logger := ctx.Logger(nil)
	logger.Info("Service Starting",
		zap.String("Port", c.Port),
		zap.Bool("NoFileLog", c.NoFileLog))

	handleSighup()

	server.New()

	if err := http.ListenAndServe(fmt.Sprintf(":%s", c.Port), nil); err != nil {
		panic(err)
	}
}
