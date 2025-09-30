package handler

import (
	"encoding/json"
	"github/nikitinvitya/pokemongo/internal/client"
	"github/nikitinvitya/pokemongo/internal/middleware"
	"net/http"
	"strconv"
	"strings"
)

func InitRoutes() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/main", mainPageHandle)
	mux.HandleFunc("/api/pokemon/", pokemonPageHandle)
	mux.HandleFunc("/api/search/", searchPokemonHandle)
	mux.HandleFunc("/api/pokemonNames/", getPokemonNames)

	var handlerWithMiddleware http.Handler = mux
	handlerWithMiddleware = middleware.HeadersMiddleware(handlerWithMiddleware)
	handlerWithMiddleware = middleware.LoggingMiddleware(handlerWithMiddleware)

	return handlerWithMiddleware
}

func mainPageHandle(w http.ResponseWriter, r *http.Request) {
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

	if err = json.NewEncoder(w).Encode(resp); err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to encode response")
		return
	}
}

func pokemonPageHandle(w http.ResponseWriter, r *http.Request) {
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

	if err = json.NewEncoder(w).Encode(resp); err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to encode response")
		return
	}
}

func searchPokemonHandle(w http.ResponseWriter, r *http.Request) {
	c := client.NewClient()

	query := r.URL.Query().Get("query")
	if query == "" {
		NewErrorResponse(w, http.StatusBadRequest, "query is required")
		return
	}

	limitString := r.URL.Query().Get("limit")
	limit, err := strconv.Atoi(limitString)
	if err != nil {
		limit = 10
	}

	resp, err := c.SearchPokemonByName(query, limit)
	if err != nil {
		NewErrorResponse(w, http.StatusBadRequest, "failed to fetch data")
		return
	}

	if err = json.NewEncoder(w).Encode(resp); err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to encode response")
		return
	}
}

func getPokemonNames(w http.ResponseWriter, _ *http.Request) {
	c := client.NewClient()

	resp, err := c.GetAllPokemonNames()
	if err != nil {
		NewErrorResponse(w, http.StatusBadRequest, "failed to fetch data")
		return
	}

	if err = json.NewEncoder(w).Encode(&resp); err != nil {
		NewErrorResponse(w, http.StatusInternalServerError, "failed to encode response")
		return
	}
}
