package handler

import (
	"encoding/json"
	"github/nikitinvitya/pokemongo/internal/client"
	"net/http"
	"strings"
)

func InitRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/main", mainPageHandle)
	mux.HandleFunc("/api/pokemon/", currentPokemonHandle)

	return mux
}

func mainPageHandle(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c := client.NewClient()

	resp, err := c.GetMainPageData()
	if err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to fetch data")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err = json.NewEncoder(w).Encode(resp); err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to encode response")
		return
	}
}

func currentPokemonHandle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c := client.NewClient()

	pathParts := strings.Split(r.URL.Path, "/")
	if len(pathParts) < 4 || pathParts[3] == "" {
		NewErrorResponse(w, http.StatusBadRequest, "pokemon name is required")
		return
	}

	pokemonName := pathParts[3]

	resp, err := c.GetCurrentPokemonData(pokemonName)
	if err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to fetch data")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err = json.NewEncoder(w).Encode(resp); err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to fetch data")
		return
	}
}
