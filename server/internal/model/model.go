package model

type ApiResponse struct {
	Count    int                `json:"count"`
	Next     string             `json:"next"`
	Previous *string            `json:"previous"`
	Result   []NamedAPIResource `json:"results"`
}

type NamedAPIResource struct {
	Name string `json:"name"`
	Url  string `json:"url"`
}
