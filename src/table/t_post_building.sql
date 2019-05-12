CREATE TABLE IF NOT EXISTS post_building(
building_code TINYINT NOT NULL,
post_id INT NOT NULL,
PRIMARY KEY(building_code,post_id),
FOREIGN KEY(building_code) REFERENCES building(building_code) ON UPDATE CASCADE,
FOREIGN KEY(post_id) REFERENCES post(post_id) ON UPDATE CASCADE)ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;