package core

import (
	"database/sql"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/context"
	"github.com/julienschmidt/httprouter"
)

// SetDB is a middleware that sets a sql.DB into the Gorilla context
func SetDB(db *sql.DB) negroni.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
		context.Set(r, "db", db)
		rw := w.(negroni.ResponseWriter)
		next(rw, r)
	}
}

func wrapHandler(h http.HandlerFunc) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		context.Set(r, "params", p)
		h.ServeHTTP(w, r)
	}
}