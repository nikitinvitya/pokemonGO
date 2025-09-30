package middleware

import (
	"log"
	"net/http"
	"time"
)

type responseWriterWithStatus struct {
	http.ResponseWriter
	status int
}

func (w *responseWriterWithStatus) WriteHeader(code int) {
	w.status = code
	w.ResponseWriter.WriteHeader(code)
}

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		wrappedWriter := &responseWriterWithStatus{
			ResponseWriter: w,
			status:         http.StatusOK, // По умолчанию статус 200 OK
		}

		next.ServeHTTP(wrappedWriter, r)

		duration := time.Since(start)

		log.Printf(
			"Method: %s | URL: %s | Status: %d | Duration: %s",
			r.Method,
			r.URL.Path,
			wrappedWriter.status,
			duration)
	})
}
