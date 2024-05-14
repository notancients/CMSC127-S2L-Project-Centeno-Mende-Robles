CREATE DATABASE sampledatabase;
USE sampledatabase;

CREATE TABLE notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes(title, contents)
VALUES
('First Note', 'Content for the first note'),
('Second Note', 'Content for the second note')
;