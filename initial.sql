CREATE TABLE IF NOT EXISTS Groups (
  id INT AUTO_INCREMENT,
  obfuscatedId varchar(255),
  mainImage INT,
  winImage INT,
  stage INT, -- INT from 0 to 3, 0 is start (game creation), 1 is editing, 2 is voting, 3 is victory
  nextStage INT, -- Time next stage will occur at, used for client side stage bumping / in epoch time
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Images (
  id INT AUTO_INCREMENT,
  path varchar(255),
  votes INT DEFAULT 0,
  mediaType varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Groups_X_Images (
  groupId INT,
  imageId INT,
  PRIMARY KEY (groupId, imageId)
);
