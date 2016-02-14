package core

import (
	"database/sql"
	"io/ioutil"
	"path/filepath"

	"github.com/codegangsta/negroni"
	"github.com/goincremental/negroni-sessions"
	"github.com/goincremental/negroni-sessions/cookiestore"
	"github.com/julienschmidt/httprouter"
	"github.com/unrolled/render"
	"github.com/unrolled/secure"
	"gopkg.in/yaml.v2"
)

type Application struct {
	Router        *httprouter.Router
	Neg           *negroni.Negroni
	Render        *render.Render
	Secure        *secure.Secure
	DB            *sql.DB
	Config        *Configuration
	CookieStore   sessions.Store
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

	app.Router = httprouter.New()
	app.Neg = negroni.New()

	return app
}
