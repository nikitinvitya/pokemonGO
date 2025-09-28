package client

import (
	"encoding/json"
	"fmt"
	"github/nikitinvitya/pokemongo/internal/model"
	"net/http"
	"strings"
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

func (c *Client) extractAbilityDescription(url string) (string, error) {
	resp, err := c.client.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var detail model.AbilityDetail
	if err := json.NewDecoder(resp.Body).Decode(&detail); err != nil {
		return "", err
	}

	for _, entry := range detail.EffectEntries {
		if entry.Language.Name == "en" {
			return entry.Effect, nil
		}
	}
	return "", nil
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
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var r model.PokemonFullInfo
	if err = json.NewDecoder(resp.Body).Decode(&r); err != nil {
		return nil, err
	}

	for i, ability := range r.Abilities {
		desc, err := c.extractAbilityDescription(ability.Ability.Url)
		if err != nil {
			return nil, err
		}
		r.Abilities[i].Description = desc
	}

	return &r, nil
}

func (c *Client) SearchPokemonByName(query string, limit int) ([]string, error) {
	url := fmt.Sprintf("%s/pokemon?limit=2000&offset=0", baseUrl)

	resp, err := c.client.Get(url)
	if err != nil {
		return nil, err
	}

	var response model.ApiResponse
	if err = json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return nil, err
	}

	var result []string
	for _, pokemon := range response.Result {
		if strings.Contains(pokemon.Name, strings.ToLower(query)) {
			result = append(result, pokemon.Name)
			if len(result) > limit {
				break
			}
		}
	}

	return result, nil
}
