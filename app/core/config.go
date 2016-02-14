package core

type Configuration struct {
	DBHost        string `yaml:"host"`
	DBName        string `yaml:"database"`
	CookieSecret  string `yaml:"cookie_secret"`
	SessionName   string `yaml:"session_name"`
	CurrentUser   string `yaml:"current_user"`
	PublicPath    string `yaml:"public_path"`
	ViewPath      string `yaml:"view_path"`
	DrainInterval int    `yaml:"drain_interval_sec"`
}
