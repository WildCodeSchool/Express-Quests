# Express API

[ref](https://odyssey.wildcodeschool.com/quests/395)

### Create `.env` file

1. install `dotenv`

```bash
npm install dotenv
```

2. create `.env` file

This file must not be pushed to GitHub but you can include a .env.sample code to share indications on what to declare.

If you cloned a repo with such a file you can use :

```bash
cp .env.sample .env
```

modify the existing variables accordingly and add the `.env`in your `.gitignore`.

3. add below line at the top of `index.js`

```js
require("dotenv").config();
```

4. consume variables as follows

```js
const port = process.env.APP_PORT;
```

5. your environment is set up, run with `npm run dev`

### Create the database (via docker compose)

1. prepare the files

Make sure you have docker installed and update the MYSQL related variables in the `.env` file.

Data from `express_quests.sql` database file will be mounted into the container and the updated data will be persisted in the mysql-data file.

Refer to the `docker-compose.yml` file if you want to update these settings.


2. create mysql container

Create the container by running the below in the terminal :

```bash
docker compose up -d
```

You can access the CLI and check everything is in order with this command : 

```bash
docker exec -it mysql-express-container mysql -u root -p
```

### Install MySQL 2 module

https://www.npmjs.com/package/mysql2

```bash
npm install mysql2
```

### Configure database access

1. Create a `database.js` file next to `index.js`

2. Require the `dotenv` package

Make sure you require the dotenv package at the very top.

```js
require("dotenv").config();
```

3. import `mysql2` package

4. Use `mysql.createPool` to prepare a connection

see `database.js` file


5. test connection

in `database.js`

```js
database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });
```

and run the following command :

```bash
npx nodemon database.js
```

6. don't forget do include `module.exports = database;` at the end of `database.js`

### Postman

Postman is a great and powerful tool that we can use to test our routes.

1. Install Postman

on ubuntu use the command :
```bash
snap install postman
``` 
for other os check [here](https://learning.postman.com/docs/getting-started/installation/installation-and-updates/#install-postman-on-linux)

to launch postman on ubuntu :

```bash
# run in the background
postman &

# bring to the foreground
fg

# get back to the backgroung
# first suspend with `ctrl + Z` then
bg

# prevent background process from being terminated
# when you close the terminal
nohup postman &

```

### Test lifecycle management

The connection to the database prevents our test script from completing its execution, so it will have to be cut after all the tests have been executed.

Add the following to the test files :

```bash
const database = require("../database")

afterAll(() => database.end());
```