package database

import (
	"fmt"
	"io"
	"log"
	"os"
	// "time"

	// "github.com/neo4j/neo4j-go-driver/v4/neo4j"
	// "github.com/neo4j/neo4j-go-driver/v4/neo4j/dbtype"
)

type Neo4jConfiguration struct {
	Url string
	Username string
	Password string
	Database string
}

func FindBlogPicturesMap() interface{} {
	


	return nil
}

func lookupEnvOrGetDefault(key string, defaultValue string) string {
	if env, found := os.LookupEnv(key); !found {
		return defaultValue
	} else {
		return env
	}
}

func unsafeClose(closeable io.Closer) {
	if err := closeable.Close(); err != nil {
		log.Fatal(fmt.Errorf("could not close resource: %w", err))
	}
}