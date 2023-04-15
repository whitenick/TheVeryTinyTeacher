package main

import (
	"bufio"
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/sashabaranov/go-openai"
	"jobin/chatGPT/resources"
)

func main() {
	// chatGPT(os.Getenv("OPENAI_API_KEY"))
	resources.Decibel()
}

func chatGPT(apiKey string) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	result, err := GetRecipeDescriptionFromImage("tacos.jpeg", os.Getenv("OPENAI_API_KEY"))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(result)
	client := openai.NewClient(apiKey)
	messages := make([]openai.ChatCompletionMessage, 0)
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("Conversation")
	fmt.Println("---------------------")

	for {
		fmt.Print("-> ")
		text, _ := reader.ReadString('\n')
		// convert CRLF to LF
		text = strings.Replace(text, "\n", "", -1)
		messages = append(messages, openai.ChatCompletionMessage{
			Role:    openai.ChatMessageRoleUser,
			Content: text,
		})

		resp, err := client.CreateChatCompletion(
			context.Background(),
			openai.ChatCompletionRequest{
				Model:    openai.GPT3Dot5Turbo,
				Messages: messages,
			},
		)

		if err != nil {
			fmt.Printf("ChatCompletion error: %v\n", err)
			continue
		}

		content := resp.Choices[0].Message.Content
		messages = append(messages, openai.ChatCompletionMessage{
			Role:    openai.ChatMessageRoleAssistant,
			Content: content,
		})
		fmt.Println(content)
	}
}

type ClipRequest struct {
	Model  string   `json:"model"`
	Images [][]byte `json:"images"`
	Texts  []string `json:"texts"`
}

type ClipResponse struct {
	Scores [][]float64 `json:"scores"`
}

func GetRecipeDescriptionFromImage(imageFilePath string, apiKey string) (string, error) {
	// Read in the image file
	log.Println(imageFilePath)
	imageBytes, err := os.ReadFile(imageFilePath)
	if err != nil {
		return "", err
	}

	encodedImage := base64.StdEncoding.EncodeToString(imageBytes)

	// Prepare the CLIP API request
	clipRequest := ClipRequest{
		Model:  "clip-ViT-B-32",
		Images: [][]byte{[]byte(encodedImage)},
		Texts:  []string{"food recipe"},
	}
	clipRequestBody, err := json.Marshal(clipRequest)
	if err != nil {
		return "", err
	}

	// Send the CLIP API request
	clipUrl := "https://api.openai.com/v1/engines"
	req, err := http.NewRequest("GET", clipUrl, bytes.NewBuffer(clipRequestBody))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Parse the CLIP API response
	clipResponse := ClipResponse{}
	err = json.NewDecoder(resp.Body).Decode(&clipResponse)
	if err != nil {
		return "", err
	}

	fmt.Print(&clipResponse)

	// Find the index of the highest-scoring recipe text
	maxScore := -1.0
	maxIndex := -1

	if len(clipResponse.Scores) > 0 {
		for i, score := range clipResponse.Scores[0] {
			if score > maxScore {
				maxScore = score
				maxIndex = i
			}
		}
	}

	// Return the text of the highest-scoring recipe
	if clipRequest.Texts[maxIndex] == "" {
		return "Not found", nil
	}

	return clipRequest.Texts[maxIndex], nil
}
