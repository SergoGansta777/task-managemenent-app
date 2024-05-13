CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS citext;

BEGIN TRANSACTION;

CREATE TABLE "user" (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  username citext  NOT NULL,
  email citext UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp WITH time ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE status (
  id serial PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  icon VARCHAR NULL
);

CREATE TABLE task (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  title VARCHAR NOT NULL,
  priority VARCHAR NULL,
  label VARCHAR(20) NULL,
  status_id serial REFERENCES status(id),
  created_at timestamp WITH time ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at timestamp WITH TIME ZONE CHECK(created_at <= completed_at) NULL,
  user_id uuid REFERENCES "user"(id)
);

COMMIT TRANSACTION;
