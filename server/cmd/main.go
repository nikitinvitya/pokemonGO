package main

import (
	server "github/nikitinvitya/pokemongo"
	"github/nikitinvitya/pokemongo/internal/handler"
	"log/slog"
)

func main() {
	srv := new(server.Server)

	if err := srv.Run(":8080", handler.InitRoutes()); err != nil {
		slog.Error("server is not running")
	}
}
