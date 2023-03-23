package repository

import (
	"fmt"
	"log"
	"time"

	"backend/database"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j/dbtype"
)

func FindAllBlogs() []database.Blog {
	// driver := initDriver()

	// defer unsafeClose(driver)

	configuration := database.ParseConfiguration()

	session := (*database.Driver).NewSession(neo4j.SessionConfig{
		AccessMode: neo4j.AccessModeRead,
		DatabaseName: configuration.Database,
	})
	defer database.UnsafeClose(session)

	blogs, err := session.ReadTransaction(func(tx neo4j.Transaction) (interface{}, error) {
		// records, err := tx.Run(
		// 	`MATCH (blog: Blog)-[:HAS_PICTURE]->(p)
		// 		RETURN p.blog_id as blog_id, blog.title as title, blog.description as description, blog.date as date`,
		// 		nil,
		// )
		records, err := tx.Run(
			`MATCH (blog: Blog)
				RETURN ID(blog) as id, blog.title as title, blog.description as description, blog.date as date`,
				nil,
		)

		if err != nil {
			return nil, err
		}

		var result []database.Blog

		for records.Next() {
			record := records.Record()
			id, _ := record.Get("id")
			title, _ := record.Get("title")
			description, _ := record.Get("description")
			date, _ := record.Get("date")

			fmt.Println(record.Get("blog_id"))

			result = append(result, database.Blog{
				Id: id.(int64),
				Title: title.(string),
				Description: description.(string),
				Date: date.(dbtype.Date).Time().Format(time.RFC3339),
			})
		}
		
		return result, nil
	})

	if err != nil {
		log.Println("error querying search:", err)
		return nil
	}
	
	return blogs.([]database.Blog)
}
