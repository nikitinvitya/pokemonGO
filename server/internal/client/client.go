package client

import (
	"encoding/json"
	"fmt"
	"github/nikitinvitya/pokemongo/internal/model"
	"net/http"
)

type Client struct {
	client *http.Client
}

func NewClient() *Client {
	return &Client{
		client: &http.Client{},
	}
}

var baseUrl = "https://pokeapi.co/api/v2"

func extractTypes(detailInfo model.PokemonDetail) []string {
	var types []string
	for _, pokemonType := range detailInfo.Types {
		types = append(types, pokemonType.Type.Name)
	}
	return types
}

func (c *Client) GetMainPageData(limit int, offset int) (*model.PokemonListResponse, error) {
	url := fmt.Sprintf("%s/pokemon?limit=%d&offset=%d", baseUrl, limit, offset)
	resp, err := c.client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var r model.ApiResponse
	if err = json.NewDecoder(resp.Body).Decode(&r); err != nil {
		return nil, err
	}

	var cards []model.PokemonCardType
	for _, pokemon := range r.Result {
		detailResp, err := c.client.Get(pokemon.Url)
		if err != nil {

			return nil, err
		}

		var detailInfo model.PokemonDetail
		if err = json.NewDecoder(detailResp.Body).Decode(&detailInfo); err != nil {
			detailResp.Body.Close()
			return nil, err
		}
		detailResp.Body.Close()

		cards = append(cards, model.PokemonCardType{
			Name:  detailInfo.Name,
			Image: detailInfo.Sprites.FrontDefault,
			Types: extractTypes(detailInfo),
		})
	}

	return &model.PokemonListResponse{
		Count: r.Count,
		Cards: cards,
	}, nil
}

func (c *Client) GetPokemonPageData(pokemonName string) (*model.PokemonFullInfo, error) {
	url := fmt.Sprintf("%s/pokemon/%s", baseUrl, pokemonName)

	resp, err := c.client.Get(url)
	var r model.PokemonFullInfo
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if err = json.NewDecoder(resp.Body).Decode(&r); err != nil {
		return nil, err
	}

	return &r, nil
}
