package web

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/unrolled/render"
)

// Home page route
func Index(ren *render.Render) httprouter.Handle {
	return httprouter.Handle(func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		ren.HTML(w, http.StatusOK, "index", nil)
	})
}
