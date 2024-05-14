-- add user

INSERT INTO USER(first_name, last_name, username, user_password, user_type) VALUES (
    "User 1", "Una", "1resU", "password", "regular"
);

------------------------------------------------------------------

-- add establishment

INSERT INTO ESTABLISHMENT(establishment_name, location, operating_hours, created_by) VALUES (
    "Establishment 1", "Dito", "MWF 9 - 5 | TTH 7 - 10", 1
);

------------------------------------------------------------------

-- add food

INSERT INTO FOOD(food_name, price, establishment_id, created_by) VALUES (
    "Food 1", 20.24, 1, 1
);

------------------------------------------------------------------

-- add review

INSERT INTO REVIEW(rating, post_content, user_id, review_type, target_id) VALUES(
    4.5, "Lorem ipsum", 1, 1, 1
);
------------------------------------------------------------------
-- edit review
UPDATE REVIEW SET post_content="Muspi merol" WHERE review_id=1;
------------------------------------------------------------------
-- search food establishment
SELECT * FROM ESTABLISHMENT WHERE establishment_name LIKE '%ablish%'; 
------------------------------------------------------------------
-- delete food establishment
DELETE FROM ESTABLISHMENT WHERE establishment_id = 2;
------------------------------------------------------------------
-- add food
INSERT INTO FOOD(food_name, price, establishment_id, created_by) VALUES (
    "Menudo ba o Afritada", 60.5, 1, 1
);
------------------------------------------------------------------
-- search food
SELECT * FROM FOOD WHERE food_name LIKE '%ood%'; -- change the middle into the desired prompt, use the qn mark notation thingy
------------------------------------------------------------------
-- delete food
DELETE FROM FOOD WHERE food_id=2; -- non existent delete
------------------------------------------------------------------
-- view all food establishments
SELECT * FROM ESTABLISHMENT;
------------------------------------------------------------------
-- view all reviews for an establishment or item
SELECT * FROM REVIEW WHERE target_id=1 AND review_type=1; -- food review
SELECT * FROM REVIEW WHERE target_id=1 AND review_type=2; -- establishment review
------------------------------------------------------------------
-- view all food from an establishment

SELECT *  FROM FOOD WHERE establishment_id = 1;

SELECT *  FROM FOOD WHERE establishment_id = 2;
------------------------------------------------------------------
-- view all food item that belong to a category

SELECT * FROM FOOD_CATEGORY c, FOOD f WHERE f.food_id=c.food_id AND c.food_category="Meat";

SELECT * FROM FOOD NATURAL JOIN FOOD_CATEGORY WHERE food_category="Meat";
------------------------------------------------------------------
-- view all reviews created within a month
SELECT * FROM REVIEW WHERE DATEDIFF(CURRENT_DATE(), DATE(data_published)) <= 31;

------------------------------------------------------------------
-- view all with high rating
SELECT * FROM ESTABLISHMENT e WHERE e.establishment_id=(
    SELECT r.target_id FROM REVIEW r WHERE r.review_type=2 AND r.rating>=4
);
------------------------------------------------------------------
-- view all items arranged by price
SELECT * FROM FOOD ORDER BY price ASC;
------------------------------------------------------------------
-- search food on all establishments given price range or food type
SELECT * FROM FOOD WHERE price BETWEEN 20 AND 100;
------------------------------------------------------------------