package routes

import (
	"github.com/gabrielg2020/discord-message-scraper/handlers"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Load HTML templates
	router.LoadHTMLGlob("views/**/*.html")

	// Page routes
	router.GET("/", handlers.HomeHandler)

	return router
}
