package storage

import (
	"context"
	"fmt"
	"time"

	"cloud.google.com/go/storage"
	// "google.golang.org/appengine"
	// credentialspb "google.golang.org/genproto/googleapis/iam/credentials/v1"
	// credentials "cloud.google.com/go/iam/credentials/apiv1"
)

// ctx := context.Background()
// client, err := storage.NewClient(ctx)

func GetBlogPictures() string {
	ctx := context.Background()
	// ctx := appengine.NewContext(r)
	// acc, _ := appengine.ServiceAccount(ctx)
	client, err := storage.NewClient(ctx)

	if err != nil {
		fmt.Println(err) 
	}

	bkt := client.Bucket("custom-blog-pictures")

	if err != nil {
		fmt.Println(err)
	}

	attrs, _ := bkt.Attrs(ctx)

	if attrs.Created.IsZero() {
		if err := bkt.Create(ctx, "tiny-teacher-354913", nil); err != nil {
			fmt.Println(err)
		}
	} 

	// attrs, err := bkt.Attrs(ctx)
	// if err != nil {
	// 	fmt.Println(err) 
	// }
	// fmt.Printf("bucket %s, created at %s, is located in %s with storage class %s\n",
	// 	attrs.Name, attrs.Created, attrs.Location, attrs.StorageClass)

	// c, err := credentials.NewIamCredentialsClient(ctx)

	opts := &storage.SignedURLOptions{
		Scheme:  storage.SigningSchemeV4,
		Method:  "GET",
		Expires: time.Now().Add(15 * time.Minute),
	}

	url, err := bkt.SignedURL("blog", opts)

	// url, err := bkt.SignedURL("blog", &storage.SignedURLOptions{ 
	// 	Method: http.MethodGet, 
	// 	Expires: time.Now().Add(time.Minute * 10),
	// 	GoogleAccessID: acc,
	// 	SignBytes: func(b []byte) ([]byte, error) {
	// 		_, signedBytes, err := appengine.SignBytes(ctx, b)
	// 		return signedBytes, err
	// 	},
	//  })

	if err != nil {
		fmt.Println(err)
	}

	return url
}