# Shop node js aws serverless

Available getProductsList and getProductsById

## Create new service/function

```bash
serverless create --template aws-nodejs-typescript --path product-service
```

## Check functions locally

```bash
serverless invoke local --function hello //With data --data '{"body": {"name":"John"}}' //With custom request --path ./src/functions/getProductsById/mock.json
```

## Deploy function

```bash
sls deploy
```