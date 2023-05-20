package controller

import (
	"encoding/json"
	"fmt"
	"os"

	"backend/database/repository"

	"github.com/graphql-go/graphql"
)

var blogType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Blog",
		Fields: graphql.Fields{
			"id": &graphql.Field{
				Type: graphql.String,
			},
			"title": &graphql.Field{
				Type: graphql.String,
			},
			"description": &graphql.Field{
				Type: graphql.String,
			},
		},
	},
)	

type blog struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
}

var data map[string]blog

var queryType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"blog": &graphql.Field{
				Type: blogType,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					idQuery, isOk := p.Args["id"].(string)
					if isOk {
						return data[idQuery], nil
					}
					return nil, nil
				},
			},
			"blogs": &graphql.Field{
				Type: graphql.NewList(blogType),
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					// v := make([]blog, 0, len(data))
					// for _, value := range data {
					// 	v = append(v, value)
					// }
					// return v, nil
					return repository.FindAllBlogs(), nil
				},
			},
		},
	},
)

var schema, _ = graphql.NewSchema(
	graphql.SchemaConfig{
		Query: queryType,
	},
)

func executeQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})
	if len(result.Errors) > 0 {
		fmt.Printf("wrong result, unexpected errors: %v", result.Errors)
	}
	return result
}

// func main() {
// 	_ = importJSONDataFromFile("data.json", &data)

// 	http.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
// 		result := executeQuery(r.URL.Query().Get("query"), schema)
// 		json.NewEncoder(w).Encode(result)
// 	})

// 	fmt.Println("Now server is running on port 8080")
// 	fmt.Println("Test with Get      : curl -g 'http://localhost:8080/graphql?query={user(id:\"1\"){name}}'")
// 	http.ListenAndServe(":8080", nil)
// }

//Helper function to import json from file to map
func importJSONDataFromFile(fileName string, result interface{}) (isOK bool) {
	isOK = true
	content, err := os.ReadFile(fileName)
	if err != nil {
		fmt.Print("Error:", err)
		isOK = false
	}
	err = json.Unmarshal(content, result)
	if err != nil {
		isOK = false
		fmt.Print("Error:", err)
	}
	return
}