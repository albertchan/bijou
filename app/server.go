package main

import (

	"net/http"
	"time"

	"github.com/albertchan/bijou/app/controllers/web"
	"github.com/albertchan/bijou/app/core"
	"github.com/codegangsta/negroni"
	_ "github.com/lib/pq"
	"github.com/meatballhat/negroni-logrus"
	"github.com/tylerb/graceful"
	"github.com/unrolled/secure"
)

func main() {

	// Instantiate new app
	app := core.NewApplication()
	drainInterval := time.Duration(app.Config.DrainInterval) * time.Second

	// Configure Negroni
	app.Neg.Use(negroni.NewStatic(http.Dir(app.Config.PublicPath)))

	// Logging
	app.Neg.Use(negronilogrus.NewMiddleware())

	// Security - change these for production!
	secureMiddleware := secure.New(secure.Options{
		AllowedHosts:          []string{"example.com", "ssl.example.com"},
		SSLRedirect:           true,
		SSLHost:               "ssl.example.com",
		SSLProxyHeaders:       map[string]string{"X-Forwarded-Proto": "https"},
		STSSeconds:            315360000,
		STSIncludeSubdomains:  true,
		STSPreload:            true,
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		ContentSecurityPolicy: "default-src 'self'",
		IsDevelopment:         true,
	})
	app.Neg.Use(negroni.HandlerFunc(secureMiddleware.HandlerFuncWithNext))

	// Routes
	app.Router.GET("/", web.Index(app.Ren))

	// HttpRouter
	app.Neg.UseHandler(app.Router)
	graceful.Run(":8888", drainInterval, app.Neg)

}
