CREATE database freview1;

use freview1;

CREATE TABLE USER ( 
	user_id INT AUTO_INCREMENT, 
	first_name VARCHAR(50) NOT NULL, 
	last_name VARCHAR(50) NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL, -- needs to have unique username
	user_password VARCHAR(50) NOT NULL, -- password is a reserved keyword 
	user_type VARCHAR(50) DEFAULT 'regular', -- regular, admin, owner (establishment owner)
	CONSTRAINT pk_user PRIMARY KEY (user_id)
	-- CONSTRAINT one_user UNIQUE (first_name, last_name)
	-- ensure that no multiple user accounts
);

CREATE TABLE ESTABLISHMENT (     
	establishment_id INT AUTO_INCREMENT,     
	establishment_name VARCHAR(50) NOT NULL,    
	location VARCHAR(255) NOT NULL,
	operating_hours VARCHAR(255) NOT NULL, -- idk tanggalin lang if proceed sa hours table 
	created TIMESTAMP NOT NULL DEFAULT NOW(), -- additional meta data? to be updated in the table schema??
    created_by INT,
    CONSTRAINT fk_established_by FOREIGN KEY (created_by) REFERENCES USER (user_id),
	CONSTRAINT pk_establishment PRIMARY KEY (establishment_id)
	-- CONSTRAINT establishment_chain UNIQUE (establishment_name, location)
	-- ensure establishment chains are unique in combination to name and location
);

CREATE TABLE FOOD (
	food_id INT AUTO_INCREMENT,     
	food_name VARCHAR(50) NOT NULL,     
	price DECIMAL(10, 2),     
	establishment_id INT,  
    created TIMESTAMP NOT NULL DEFAULT NOW(), -- additional meta data? to be updated in the table schema??
    created_by INT,
    CONSTRAINT fk_food_created_by FOREIGN KEY (created_by) REFERENCES USER (user_id),
	CONSTRAINT pk_food PRIMARY KEY (food_id),   
	CONSTRAINT fk_establishment FOREIGN KEY (establishment_id) REFERENCES ESTABLISHMENT (establishment_id) ON DELETE CASCADE
	
);

CREATE TABLE FOOD_IMAGE ( 
	food_image_id INT AUTO_INCREMENT, 
	food_id INT, 
	link TEXT NOT NULL, 
	CONSTRAINT pk_food_image PRIMARY KEY (food_image_id),
	CONSTRAINT fk_food_id FOREIGN KEY (food_id) REFERENCES FOOD (food_id) ON DELETE CASCADE
); 


CREATE TABLE FOOD_INGREDIENTS (     
	food_id INT,     
	ingredients VARCHAR(255),      
	CONSTRAINT fk_food_id_ingredients FOREIGN KEY (food_id) REFERENCES FOOD(food_id) ON DELETE CASCADE,
    CONSTRAINT pk_food_ingredients PRIMARY KEY (food_id, ingredients)
);


CREATE TABLE FOOD_CATEGORY (
    food_id INT,
    food_category VARCHAR(50) NOT NULL,
    CONSTRAINT fk_food_id_category FOREIGN KEY (food_id) REFERENCES FOOD(food_id) ON DELETE CASCADE,
    CONSTRAINT pk_food_category PRIMARY KEY (food_id, food_category)
    
);

CREATE TABLE REVIEW ( 
	review_id INT AUTO_INCREMENT, -- automatically increment unique id    
	rating DECIMAL(2, 1) NOT NULL, -- users required to have rating
	data_published TIMESTAMP DEFAULT NOW(),     
	post_content TEXT, -- users not required to have content  
	user_id INT, 

	review_type integer NOT NULL, -- food or establishment

	target_id integer NOT NULL, 
	CONSTRAINT pk_review PRIMARY KEY (review_id),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES USER (user_id),
	CONSTRAINT fk_target_establishment FOREIGN KEY (target_id) REFERENCES ESTABLISHMENT (establishment_id) ON DELETE CASCADE,
    CONSTRAINT fk_target_food FOREIGN KEY (target_id) REFERENCES FOOD (food_id) ON DELETE CASCADE,
    CONSTRAINT one_review UNIQUE (user_id, review_type, target_id)

);