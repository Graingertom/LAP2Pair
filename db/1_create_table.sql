DROP TABLE IF EXISTS blogs;

CREATE TABLE blogs (
    id serial PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    pseudonym VARCHAR(30) NOT NULL,
    content VARCHAR(500) NOT NULL,
    url VARCHAR(100) NOT NULL
);
