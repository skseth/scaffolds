package server

import (
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	ctx "github.com/skseth/ansible-sample-svc/hello-svc/ctx"
	"go.uber.org/zap"
)

type helloserver struct {
	router *mux.Router
}

func New() *helloserver {
	r := mux.NewRouter()

	server := &helloserver{
		router: r,
	}

	server.routes()
	server.router.Handle("/metrics", promhttp.Handler())
	http.Handle("/", server.router)
	return server
}

func (s *helloserver) routes() {
	s.router.HandleFunc("/", s.reqid(s.handleIndex()))
}

// handlers
func (s *helloserver) handleIndex() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// use thing
		logger := ctx.Logger(r.Context())
		message := r.URL.RawQuery
		message = strings.TrimPrefix(message, "/")
		message = "Hello " + message

		logger.Info("index",
			zap.String("message", message))
		w.Write([]byte(message))
	}
}

// middleware
func (s *helloserver) reqid(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		reqID := r.Header.Get("X-Request-ID")
		if reqID == "" {
			uuid, err := uuid.NewRandom()
			if err != nil {
				// TODO : LOG Error
				reqID = "UNDEFINED"
			} else {
				reqID = uuid.String()
			}
		}

		newctx := ctx.WithRequestId(r.Context(), reqID)

		next.ServeHTTP(w, r.WithContext(newctx))
	}
}
