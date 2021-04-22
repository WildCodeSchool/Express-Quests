DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `director` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `color` tinyint(1) NOT NULL,
  `duration` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
INSERT INTO
  `movies` (title, director, year, color, duration)
VALUES
  ('Citizen Kane', 'Orson Wells', '1941', 0, 120),
  (
    'The Godfather',
    'Francis Ford Coppola',
    '1972',
    1,
    180
  ),
  (
    'Pulp Fiction',
    'Quentin Tarantino',
    '1994',
    1,
    180
  ),
  (
    'Apocalypse Now',
    'Francis Ford Coppola',
    '1979',
    1,
    150
  ),
  (
    '2001 a space odyssey',
    'Stanley Kubrick',
    '1968',
    1,
    160
  ),
  (
    'The Dark Knight',
    'Christopher Nolan',
    '2008',
    1,
    150
  );
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `firstname` varchar(255) NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `email` varchar(255) UNIQUE NOT NULL,
    `city` varchar(255) DEFAULT NULL,
    `language` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8;
INSERT INTO
  `users`
VALUES
  (
    1,
    'John',
    'Doe',
    'john.doe@example.com',
    'Paris',
    'English'
  ),(
    2,
    'Valeriy',
    'Appius',
    'valeriy.ppius@example.com',
    'Moscow',
    'Russian'
  ),(
    3,
    'Ralf',
    'Geronimo',
    'ralf.geronimo@example.com',
    'New York',
    'Italian'
  ),(
    4,
    'Maria',
    'Iskandar',
    'maria.iskandar@example.com',
    'New York',
    'German'
  ),(
    5,
    'Jane',
    'Doe',
    'jane.doe@example.com',
    'London',
    'English'
  ),(
    6,
    'Johanna',
    'Martino',
    'johanna.martino@example.com',
    'Milan',
    'Spanish'
  );