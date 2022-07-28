# Shop node js aws serverless

This project contains all serverless projects for deploy to aws, npm workspaces has been added to share dependencies between packages.

## Env variables

Fill all variables from .env.sample and rename it to .env to test locally on each service folder, copy and rename it to .env.test for running testing suites

## Testing and docker

Docker image with postgres database is mandatory in order to run all tests and run lambdas locally [Docker docs](https://docs.docker.com/get-docker/)

```bash
docker-compose up -d
```

Run tests

```bash
npm run test
```

## Serverless operations

### Create new service

```bash
serverless create --template aws-nodejs-typescript --path product-service
```

## Check functions locally

We must enter into each service to develop and run lambdas.

### Products services

#### GetProductsList

```bash
sls invoke local --function getProductsList --path ./tests/mocks/requests/getProductsList.json
```

#### GetProductsById

```bash
sls invoke local --function getProductsById --path ./tests/mocks/requests/getProductsById.json
```

#### PostProducts

```bash
sls invoke local --function postProducts --path ./tests/mocks/requests/postProducts.json
```

## Swagger

Is generated automatically when we deploy to aws

### Deploy service

We must enter into each service to develop and run lambdas.

```bash
npm run deploy
```
