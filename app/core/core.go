package core

import (
	"database/sql"
	"io/ioutil"
	"path/filepath"

	"github.com/codegangsta/negroni"
	"github.com/julienschmidt/httprouter"
	"github.com/unrolled/render"
	"gopkg.in/yaml.v2"
)

type Application struct {
	Router *httprouter.Router
	Neg    *negroni.Negroni
	Ren    *render.Render
	DB     *sql.DB
	Config *Configuration
}

func NewApplication() *Application {

	// load config
	filename, _ := filepath.Abs("./config.yml")
	yamlFile, err := ioutil.ReadFile(filename)

	if err != nil {
		panic(err)
	}

	var config Configuration
	err = yaml.Unmarshal(yamlFile, &config)

	app := &Application{}
	app.Config = &config
	app.Ren = render.New(render.Options{
		Directory:  "views",
		Extensions: []string{".html", ".tmpl"},
	})
	app.Router = httprouter.New()
	app.Neg = negroni.New()

	return app
}
