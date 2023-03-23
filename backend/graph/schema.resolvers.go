package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"backend/graph/generated"
	"backend/graph/model"
	"context"
	"fmt"
	"time"
)

// UpsertBlog is the resolver for the upsertBlog field.
func (r *mutationResolver) UpsertBlog(ctx context.Context, input model.BlogInput) (*model.Blog, error) {
	panic(fmt.Errorf("not implemented: UpsertBlog - upsertBlog"))
}

// Blogs is the resolver for the blogs field.
func (r *queryResolver) Blogs(ctx context.Context) ([]*model.Blog, error) {
	// blogs := make([]*model.Blog, 0)
	blogs := r.BlogStore.getAllBlogs()
	return blogs, nil
	// blogs = append(blogs, &blog)
	// return blogs, nil
	// panic(fmt.Errorf("not implemented: Blogs - blogs"))
}

// LatestBlog is the resolver for the latestBlog field.
func (r *queryResolver) LatestBlog(ctx context.Context) (*model.Blog, error) {
	blogs := r.BlogStore.getAllBlogs()

	var result = &model.Blog{}

	for _, v := range blogs {
		if result.Date == nil {
			result = v
		} else {
			newTime, _ := time.Parse(time.RFC3339, *v.Date)
			resultTime, _ := time.Parse(time.RFC3339, *result.Date)
			if newTime.After(resultTime) {
				result = v
			}
		}
	}
	return result, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
