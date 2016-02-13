package main

import (
	"net/http"
	"time"

	"github.com/codegangsta/negroni"
	"github.com/julienschmidt/httprouter"
	"github.com/meatballhat/negroni-logrus"
	"github.com/tylerb/graceful"
	"github.com/unrolled/render"
)

type Application struct {
	router *httprouter.Router
	neg    *negroni.Negroni
	ren    *render.Render
}

func NewApplication() *Application {
	app := &Application{}
	app.router = httprouter.New()
	app.neg = negroni.New()
	app.ren = render.New(render.Options{
		Directory: "views",
		Extensions: []string{".html", ".tmpl"},
	})

	return app
}

func IndexHandler(ren *render.Render) httprouter.Handle {
	return httprouter.Handle(func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		ren.HTML(w, http.StatusOK, "index", nil)
	})
}

func main() {

	drainInterval := 2*time.Second

	app := NewApplication()

	// Routes
	app.router.GET("/", IndexHandler(app.ren))

	// Middlewares
	app.neg.Use(negroni.NewStatic(http.Dir("public")))
	app.neg.Use(negronilogrus.NewMiddleware())
	app.neg.UseHandler(app.router)
	graceful.Run(":8888", drainInterval, app.neg)

}
