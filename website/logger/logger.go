package logger

import (
	"os"
	"sync"

	"github.com/sirupsen/logrus"
)

var (
	log  *logrus.Logger
	once sync.Once
)

// GetLogger returns the singleton logger instance
func GetLogger() *logrus.Logger {
	once.Do(func() {
		log = logrus.New()

		// Default config
		log.SetOutput(os.Stdout)
		log.SetLevel(logrus.InfoLevel)
		log.SetFormatter(&logrus.TextFormatter{
			DisableColors: false,
			FullTimestamp: true,
		})
	})

	return log
}

// Convenience wrappers

func Info(args ...interface{}) {
	GetLogger().Info(args...)
}

func Infof(format string, args ...interface{}) {
	GetLogger().Infof(format, args...)
}

func Warn(args ...interface{}) {
	GetLogger().Warn(args...)
}

func Warnf(format string, args ...interface{}) {
	GetLogger().Warnf(format, args...)
}

func Error(args ...interface{}) {
	GetLogger().Error(args...)
}

func Errorf(format string, args ...interface{}) {
	GetLogger().Errorf(format, args...)
}

func Debug(args ...interface{}) {
	GetLogger().Debug(args...)
}

func Debugf(format string, args ...interface{}) {
	GetLogger().Debugf(format, args...)
}

func Fatal(args ...interface{}) {
	GetLogger().Fatal(args...)
}

func Fatalf(format string, args ...interface{}) {
	GetLogger().Fatalf(format, args...)
}

func SetLogLevel(level string) {
	l, err := logrus.ParseLevel(level)
	if err != nil {
		GetLogger().Errorf("Invalid log level: %s", level)
		return
	}
	GetLogger().SetLevel(l)
}
