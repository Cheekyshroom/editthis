CREATE TABLE IF NOT EXISTS Groups (
  id INT AUTO_INCREMENT,
  obfuscatedId varchar(255),
  mainImage INT,
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
