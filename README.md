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
  3. Start server with the command:
  ```
  yarn start
  ```

### How to add a new parser
  1. Create a new parser with the next required methods:

  **getParserName**

  |  | Type | Description | Example |
  | --- | --- | --- | --- |
  | parameter | -none- | -none- | -none- |
  | return value | `String` | returns a string with the unique parser name | ```'first_parser'``` |

  **getAdData**

  |  | Type | Description | Example |
  | --- | --- | --- | --- |
  | parameter | `String` | ad url string | ```'site.com/ad/123'``` |
  | return value | `Object` | object with the 7 keys(described in the next table) | ```{address: 'NY, 42nd Street, 5', rooms: 3, price: '35000', square: '70.3', description: 'best flat in NY!!', regionName: 'NY(state)', localityName: 'NY'}``` |

  | Key | Type | Can be null | Description |
  | --- | --- | --- | --- |
  | address | `String` | + | real estate location  address |
  | rooms | `Number` | + | number of rooms |
  | price | `String` | + | real estate price |
  | square | `String` | + | real estate square(m^2) |
  | description | `String` | + | ad description |
  | regionName | `String` | - | region where the real estate is located |
  | localityName | `String` | - | village/city where the real estate is located |

  **getPicsUrlArr**

  |  | Type | Description | Example |
  | --- | --- | --- | --- |
  | parameter | `String` | ad url string | ```'site.com/ad/123'``` |
  | return value | `Array of strings` | ad pics | ```['site.com/pic/1.jpg', 'site.com/pic/2.jpg']``` |

  **getAdsUrlArr**

  |  | Type | Description | Example |
  | --- | --- | --- | --- |
  | parameter | -none- | -none- | -none- |
  | return value | `Array of strings` | ads urls | ```['site.com/ad/1', 'site.com/ad/2']``` |

  2. Import parser in index.js(folder 'parsers') and add in Map like Array(example: ```[parser.getParserName(), parser]```)

### Front-end application setup
install front-end from [repository](https://github.com/voronozavr/meta-realt) to use application
