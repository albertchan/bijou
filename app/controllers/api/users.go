package api

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func UserCreate(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
	fmt.Fprintln(w, "posts create")
}