# Shop node js aws serverless

This project contains all serverless projects for deploy to aws

## Env variables

Fill all variables from .env.sample and rename it to .env to test locally, copy it and rename it to .env.test for run testing suites

## Docker

A docker image with postgres database is mandatory in order to run all tests and run applications locally [Docker docs](https://docs.docker.com/get-docker/)

```bash
docker-compose up -d
```

## Testing

```bash
npm run test
```

## Swagger

Is generated automatically when we deploy to aws

## Serverless operations

### Create new service

```bash
serverless create --template aws-nodejs-typescript --path product-service
```

### Check functions locally

We must enter into each service to develop and run lambdas.

```bash
serverless invoke local --function hello //With data --data '{"body": {"name":"John"}}' //With custom events parameters --path ./src/functions/getProductsById/mock.json
```

### Deploy service

We must enter into each service to develop and run lambdas.

```bash
npm run deploy
```

## Products services

### GetProductsList

```bash
sls invoke local --function getProductsList --path ./src/functions/getProductsList/mock.json
```

### GetProductsById

```bash
sls invoke local --function getProductsById --path ./src/functions/getProductsById/mock.json
```

### PostProducts

```bash
sls invoke local --function postProducts --path ./src/functions/postProducts/mock.json
```
