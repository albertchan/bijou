package models

type User struct {
	ID       int64  `db:"id"`
	Email    string `db:"email"`
	Username string `db:"username"`
	Password []byte `db:"password"`
}
