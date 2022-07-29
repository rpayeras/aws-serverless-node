// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "string",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "Get a list of products",
        "description": "Get a list of products with all their properties",
        "tags": [
          "Products"
        ],
        "operationId": "getProductsList.get.products",
        "consumes": [],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "List of products",
            "schema": {
              "$ref": "#/definitions/data"
            }
          },
          "400": {
            "description": "failed Post",
            "schema": {
              "$ref": "#/definitions/Error message"
            }
          },
          "502": {
            "description": "server error"
          }
        }
      },
      "post": {
        "summary": "Create a new product",
        "description": "Creates a new product passing post parameters",
        "tags": [
          "Products"
        ],
        "operationId": "postProducts.post.products",
        "consumes": [],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "A product",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          },
          "400": {
            "description": "failed Post",
            "schema": {
              "$ref": "#/definitions/Error message"
            }
          },
          "502": {
            "description": "server error"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "Get products by id",
        "description": "Returns a product by id",
        "tags": [
          "Products"
        ],
        "operationId": "getProductsById.get.products/{productId}",
        "consumes": [],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "A product",
            "schema": {
              "$ref": "#/definitions/data"
            }
          },
          "400": {
            "description": "failed Post",
            "schema": {
              "$ref": "#/definitions/Error message"
            }
          },
          "502": {
            "description": "server error"
          }
        }
      }
    },
    "/catalog": {
      "get": {
        "summary": "Manage items of SQS catalogitemsQueue",
        "description": "Manage items of SQS catalogitemsQueue",
        "tags": [
          "Products"
        ],
        "operationId": "catalogBatchProcess.get.catalog",
        "consumes": [],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "List of products"
          },
          "400": {
            "description": "Failed response"
          },
          "502": {
            "description": "server error"
          }
        }
      }
    }
  },
  "definitions": {},
  "securityDefinitions": {},
  "basePath": "/products",
  "host": "https://dg6etd0ogl.execute-api.eu-west-1.amazonaws.com/dev",
  "schemes": [
    "https"
  ]
};