package model

type PokemonCardType struct {
	Name  string   `json:"name"`
	Image string   `json:"image"`
	Types []string `json:"types"`
}

type PokemonDetail struct {
	Name    string         `json:"name"`
	Sprites PokemonSprites `json:"sprites"`
	Types   []PokemonType  `json:"types"`
}

type PokemonSprites struct {
	FrontDefault string `json:"front_default"`
	BackDefault  string `json:"back_default"`
}

type PokemonType struct {
	Type NamedAPIResource `json:"type"`
}

type PokemonFullInfo struct {
	Name      string         `json:"name"`
	Height    int            `json:"height"`
	Weight    int            `json:"weight"`
	Stats     []State        `json:"stats"`
	Abilities []Ability      `json:"abilities"`
	Sprites   PokemonSprites `json:"sprites"`
}

type State struct {
	BaseStat int              `json:"base_stat"`
	Stat     NamedAPIResource `json:"stat"`
}

type Ability struct {
	Ability  NamedAPIResource `json:"ability"`
	IsHidden bool             `json:"is_hidden"`
}
