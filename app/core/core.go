package core

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"net/http"
	"path/filepath"

	"github.com/codegangsta/negroni"
	"github.com/goincremental/negroni-sessions"
	"github.com/goincremental/negroni-sessions/cookiestore"
	"github.com/julienschmidt/httprouter"
	_ "github.com/lib/pq"
	"github.com/unrolled/render"
	"github.com/unrolled/secure"
	"gopkg.in/yaml.v2"
)

type Application struct {
	Router      *httprouter.Router
	Neg         *negroni.Negroni
	Render      *render.Render
	Secure      *secure.Secure
	Static      *negroni.Static
	DB          *sql.DB
	Config      *Configuration
	CookieStore sessions.Store
}

func NewApplication() *Application {

	// load YAML config file
	filename, _ := filepath.Abs("./config.yml")
	yamlFile, err := ioutil.ReadFile(filename)

	if err != nil {
		panic(err)
	}

	var config Configuration
	err = yaml.Unmarshal(yamlFile, &config)

	app := &Application{}
	app.Config = &config

	// connect to database
	// https://godoc.org/github.com/lib/pq
	db, err := sql.Open("postgres", fmt.Sprintf("user=%v dbname=%s sslmode=verify-full", config.CurrentUser, config.DBName))
	if err != nil {
		panic(err)
	}
	app.DB = db

	// render middleware
	app.Render = render.New(render.Options{
		Directory:  config.ViewPath,
		Extensions: []string{".html", ".tmpl"},
	})

	// secure middleware
	app.Secure = secure.New(secure.Options{
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

	// sessions
	app.CookieStore = cookiestore.New([]byte(app.Config.CookieSecret))

	// HttpRouter
	app.Router = httprouter.New()

	// Negroni
	app.Neg = negroni.New()

	// middleware handler for serving static files
	app.Static = negroni.NewStatic(http.Dir(config.PublicPath))
	app.Static.Prefix = "/assets"

	return app
}
