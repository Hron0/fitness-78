-- ✔ updated image_url columns to TEXT so they can store long URLs / data-URLs
CREATE TABLE IF NOT EXISTS workouts (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  description     TEXT,
  duration        INTEGER       NOT NULL,  -- minutes
  difficulty      VARCHAR(50)   NOT NULL,
  category        VARCHAR(100),
  trainer_id      INTEGER REFERENCES coaches(id),
  image_url       TEXT,                    -- <== widened
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coaches (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR(255) NOT NULL,
  specialization   VARCHAR(255) NOT NULL,
  description      TEXT,
  experience_years INTEGER      NOT NULL,
  rating           DECIMAL(2,1) DEFAULT 0.0,
  price_per_hour   INTEGER      NOT NULL,  -- RUB
  image_url        TEXT,                   -- <== widened
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  name       VARCHAR(255)        NOT NULL,
  phone      VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER REFERENCES users(id),
  coach_id     INTEGER REFERENCES coaches(id),
  workout_id   INTEGER REFERENCES workouts(id),
  booking_date TIMESTAMPTZ      NOT NULL,
  status       VARCHAR(50)      DEFAULT 'pending',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
