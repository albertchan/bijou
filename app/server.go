package main

import (

	"net/http"
	"time"

	"github.com/albertchan/bijou/app/controllers/web"
	"github.com/albertchan/bijou/app/core"
	"github.com/codegangsta/negroni"
	"github.com/goincremental/negroni-sessions"
	_ "github.com/lib/pq"
	"github.com/meatballhat/negroni-logrus"
	"github.com/tylerb/graceful"
)

func main() {

	// Instantiate new app
	app := core.NewApplication()
	drainInterval := time.Duration(app.Config.DrainInterval) * time.Second

	// Configure Negroni
	app.Neg.Use(negroni.NewStatic(http.Dir(app.Config.PublicPath)))

	// Logging
	app.Neg.Use(negronilogrus.NewMiddleware())

	// Secure
	app.Neg.Use(negroni.HandlerFunc(app.Secure.HandlerFuncWithNext))

	// Sessions
	app.Neg.Use(sessions.Sessions(app.Config.SessionName, app.CookieStore))

	// Routes
	app.Router.GET("/", web.Index(app.Render))

	// HttpRouter
	app.Neg.UseHandler(app.Router)

	// Graceful shutdown
	graceful.Run(":8888", drainInterval, app.Neg)

}
