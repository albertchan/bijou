Bijou
=====

An opinionated project skeleton for web applications comprised of the following core components:

- Negroni, an idiomatic approach to web middleware in Go
- HttpRouter, a lightweight high performance HTTP request router for Go
- pq, a pure Go Postgres driver for the database/sql package

## Getting started

After installing all your dependencies, run the server:
 
```
go run server.go
```

Or if you're doing development and want live-reloading, run using [gin]( https://github.com/codegangsta/gin ):

```
gin -p "8080" -a "8888" run server.go
```

Here, the proxy server port is `8080`, and the Go web server port is `8888` (default). After running that command,
you should see the following:

```
[gin] listening on port 8080
```

You can now point your browser to [http://localhost:8080]( http://localhost:8080 )

## Project structure

```
glass/
├── app/
│   ├── controllers/
│   ├── core/
│   ├── helpers/
│   ├── models/
│   ├── public/
│   ├── views/
│   ├── config.yml
│   └── server.go
├── client/
│   ├── scripts/
│   ├── styles/
│   └── package.json
└── public
    ├── css/
    ├── images/
    └── js/
```

### Backend /app/*

`/controllers`

All controllers that serve defined routes.

`/core`

Core functions and structs.

`/helpers`

Helper functions.

`/models`

Database models and data access layer methods.

`/public`

All static files mapped to `/assets/*` path except `robots.txt` and `favicon.ico` which are mapped to `/`.

`/views`

Templates using standard `Go` template system.

`server.go`

The main entry point for the application. This file also contains routes definitions.


### Frontend /client/*