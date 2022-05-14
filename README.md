# Udacity: Build A Storefront Backend

## Tools and technologies used in the project

Express

TypeScript

Jasmine and Super set for testing

PostgreSQL

### To initialize the project
- npm install

###  To start the server in the production mode

```
 - npm run dev
```

###  To start the server in the development mode

```
 - npm run start
 
```

### Testing

```
 - npm run test

```

### Linting

```
  - npm run lint
```


### Prettier

```
 - npm run format

```
### Typescript watcher

```
 - npm run watch

```




## Initialize Database
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront_dev;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges using pgadmin
- 
### Migrate Database
Navigate to the root directory and run the command below to migrate the database

`db-migrate up -c 5`


## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

```
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_TEST__DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=8773
ENV=dev
SALT_ROUNDS=1
TOKEN_TEST = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6ImFzZCIsImxhc3RuYW1lIjoiYXNkIn0sImlhdCI6MTY1MTM3MDk1NX0.Ik3sQnSCWshS7fPDepmY6A0EU7XqMZJHLdE94__Popo.e30.J8BgsyqA3Y6F71NXbfuYIfRVuvRa_qb08RStxrCVhlQ
TOKEN_SECRET = ####

```



### Running Ports
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication
Tokens are passed along with the http header as
```
Authorization   Bearer <token>
```
