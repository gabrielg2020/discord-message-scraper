package handlers

import (
	"net/http"

	"github.com/gabrielg2020/discord-message-scraper/database"
	"github.com/gin-gonic/gin"
)

func HomeHandler(ctx *gin.Context) {
	numberOfMessages := database.MessageCount()
	ctx.HTML(http.StatusOK, "home.html", gin.H{
		"numberOfMessages": numberOfMessages,
	})
}

