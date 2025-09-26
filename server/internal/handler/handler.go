package handler

import (
	"encoding/json"
	"github/nikitinvitya/pokemongo/internal/client"
	"net/http"
	"strconv"
	"strings"
)

func InitRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/main", mainPageHandle)
	mux.HandleFunc("/api/pokemon/", PokemonPageHandle)

	return mux
}

func mainPageHandle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c := client.NewClient()

	limitString := r.URL.Query().Get("limit")
	offsetString := r.URL.Query().Get("offset")

	limit, err := strconv.Atoi(limitString)
	if err != nil || limit <= 0 {
		limit = 20
	}

	offset, err := strconv.Atoi(offsetString)
	if err != nil || offset < 0 {
		offset = 0
	}

	resp, err := c.GetMainPageData(limit, offset)
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

func PokemonPageHandle(w http.ResponseWriter, r *http.Request) {
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

	resp, err := c.GetPokemonPageData(pokemonName)
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
