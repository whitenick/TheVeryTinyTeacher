package graph

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"backend/database/repository"
	"backend/graph/model"
	"backend/storage"
	"strconv"
)

type Resolver struct {
	BlogStore BlogStore
}

type BlogStore struct {
	// Blog model.Blog
	// Blogs []model.Blog
}

func (b *BlogStore) getAllBlogs() []*model.Blog {
	blogs := repository.FindAllBlogs()
	modelBlogs := []*model.Blog{}
	picture := storage.GetBlogPictures()

	for index, _ := range blogs {
		id := strconv.FormatInt(blogs[index].Id, 10)
		modelBlog := model.Blog{
			ID: &id,
			Title: &blogs[index].Title,
			Description: &blogs[index].Description,
			Date: &blogs[index].Date,
			Pictures: []*string{ &picture },
		}
		modelBlogs = append(
			modelBlogs, 
			&modelBlog,
		)
	}

	return modelBlogs
}