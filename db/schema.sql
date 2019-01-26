DROP DATABASE IF EXISTS quiz_db;

CREATE DATABASE quiz_db;

USE quiz_db;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE questions (
	id INT NOT NULL AUTO_INCREMENT,
	question VARCHAR(255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE answers (
    id INT NOT NULL AUTO_INCREMENT,
    answer VARCHAR(255) NOT NULL,
    question_id INT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    PRIMARY KEY (id)
);

CREATE TABLE user_answers (
	id INT NOT NULL AUTO_INCREMENT,
    nam VARCHAR(255) NOT NULL,
    question_id INT NOT NULL,
    answer_id INT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (answer_id) REFERENCES answers(id),
    PRIMARY KEY (id)
);

-- query to get total score from each participant
SELECT nam as 'name', SUM(is_correct) as score FROM `user_answers` GROUP BY nam;