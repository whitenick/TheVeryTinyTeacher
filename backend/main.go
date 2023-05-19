package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
)

func main() {
	println("hello")
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}