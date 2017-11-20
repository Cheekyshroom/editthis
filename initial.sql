CREATE TABLE IF NOT EXISTS Groups (
  id INT AUTO_INCREMENT,
  obfuscatedId varchar(255),
  mainImage INT,
  stage INT, -- INT from 0 to 3, 0 is start (game creation), 1 is editing, 2 is voting, 3
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Images (
  id INT AUTO_INCREMENT,
  path varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Groups_X_Images (
  groupId INT,
  imageId INT,
  PRIMARY KEY (groupId, imageId)
);
