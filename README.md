# meta-realt-server
## Installation
### Database (PostgreSQL) setup
  1. Create database with the next parameters:
  ```
  name: meta-realt
  username: postgres
  password: root
  ```
  2. Create tables:

  install the next packages with npm:
  ```
  npm install -g db-migrate
  npm install -g db-migrate-pg
  ```
  go to 'databaseMigrate' folder and run command:
  ```
  db-migrate up
  ```

### Server setup
  1. Go to root directory and install dependencies from file 'package.json':
  ```
  yarn install
  ```
  2. To enable scraper change const 'scraperEnabled' to 'true' in index.js
  3. Go to folder 'src', start server with the command:
  ```
  node index.js
  ```
### Front-end application setup
install front-end from [repository](https://github.com/voronozavr/meta-realt) to use application
