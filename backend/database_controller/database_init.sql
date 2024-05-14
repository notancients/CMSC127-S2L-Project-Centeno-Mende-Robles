CREATE DATABASE reviewdb;
USE reviewdb;


CREATE TABLE user (
    user_id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    first_name VARCHAR(25),
    last_name VARCHAR(25)
);

CREATE TABLE food (
    food_id integer PRIMARY KEY AUTO_INCREMENT,
    food_name VARCHAR(255) NOT NULL,
    food price integer
);

CREATE TABLE food_image (
    food_image_id integer PRIMARY KEY AUTO_INCREMENT,
    food_id integer FOREIGN KEY REFERENCES food(food_id),
    link VARCHAR(255) NOT NULL
);

CREATE TABLE food_category (
    category VARCHAR(255) NOT NULL,
    food_id integer FOREIGN KEY REFERENCES food(food_id)
);

CREATE TABLE food_ingredient (
    food_image_id integer PRIMARY KEY AUTO_INCREMENT,
    food_id integer FOREIGN KEY REFERENCES food(food_id),
    link VARCHAR(255) NOT NULL
);

-- CREATE VIEW food_view
CREATE TABLE establishment (
    establishment_id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE establishment_hours (
    day_of_the_week VARCHAR(255) NOT NULL,
    start_hours TIME NOT NULL,
    end_hours TIME NOT NULL,
    establishment_id integer FOREIGN KEY REFERENCES establishment(establishment_id)
);

CREATE TABLE review (
    review_id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    review_type integer NOT NULL,
    target_id integer NOT NULL,
    created_by integer FOREIGN KEY REFERENCES user(user_id),
    created TIMESTAMP NOT NULL DEFAULT NOW()
);