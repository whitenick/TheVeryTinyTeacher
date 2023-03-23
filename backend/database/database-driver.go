package database

import (
	"log"
	"io"
	"fmt"

	"github.com/joho/godotenv"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)


var Driver *neo4j.Driver

func init() {
	initDriver()
}

func initDriver() {
	configuration := ParseConfiguration()
	var err error
	Driver, err = configuration.newDriver()
	
	if err != nil {
		log.Fatal()
	}
}

func ParseConfiguration() *Neo4jConfiguration {
	godotenv.Load()
	database := lookupEnvOrGetDefault("NEO4J_DATABASE", "neo4j")
	
	return &Neo4jConfiguration{
		Url: lookupEnvOrGetDefault("NEO4J_URL", ""),
		Username: lookupEnvOrGetDefault("NEO4J_USER", ""),
		Password: lookupEnvOrGetDefault("NEO4J_PASSWORD", ""),
		Database: database,
	}
}

func UnsafeClose(closeable io.Closer) {
	if err := closeable.Close(); err != nil {
		log.Fatal(fmt.Errorf("could not close resource: %w", err))
	}
}

func (nc *Neo4jConfiguration) newDriver() (*neo4j.Driver, error) {
	driver, err := neo4j.NewDriver(nc.Url, neo4j.BasicAuth(nc.Username, nc.Password, ""))
	return &driver, err
}