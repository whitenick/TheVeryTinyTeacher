package database

import (
	// "backend/graph"
	"backend/graph/generated"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	// "github.com/pocketbase/pocketbase"
	"github.com/rs/cors"

	"backend/storage"
)

func runGraphQLServer() {
	const defaultPort = "8080"
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	router := chi.NewRouter()

	// Add CORS middleware around every request
	// See https://github.com/rs/cors for full option listing
	router.Use(cors.New(cors.Options{
		AllowOriginFunc:  func(origin string) bool { return true },
		AllowedMethods:   []string{},
		AllowedHeaders:   []string{},
		AllowCredentials: true,
		Debug:            true,
	}).Handler)

	router.Mount("/api", Routes())

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func Routes() chi.Router {
	router := chi.NewRouter()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: nil}))

	router.Route("/graphiql", func(r chi.Router) {
		r.Get("/", playground.Handler("GraphQL playground", "/api/query"))
	})
	router.Route("/query", func(r chi.Router) {
		r.Handle("/", srv)
	})
	router.Route("/bucket", func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			picture := storage.GetBlogPictures()
			w.Write([]byte(picture))

		})
	})

	return router
}
