CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT now(),
    date_modified TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE UNIQUE INDEX idx_users_email on users (email);