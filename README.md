# Shop node js aws serverless

## Create new service/function

```bash
serverless create --template aws-nodejs-typescript --path product-service
```

## Deploy function

```bash
sls deploy
```

## Check functions locally

```bash
serverless invoke local --function hello //With data --data '{"body": {"name":"John"}}' //With custom request --path ./src/functions/getProductsById/mock.json
```
