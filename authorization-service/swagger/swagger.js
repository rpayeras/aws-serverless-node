// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "authorization-service",
    "version": "1"
  },
  "paths": {},
  "definitions": {
    "Response": {
      "properties": {
        "statusCode": {
          "title": "Response.statusCode",
          "type": "number"
        },
        "headers": {
          "additionalProperties": {
            "type": "string"
          },
          "title": "Response.headers",
          "type": "object"
        },
        "body": {
          "title": "Response.body",
          "type": "string"
        }
      },
      "required": [
        "statusCode",
        "body"
      ],
      "additionalProperties": false,
      "title": "Response",
      "type": "object"
    },
    "ErrorResponse": {
      "properties": {
        "statusCode": {
          "title": "ErrorResponse.statusCode",
          "type": "number"
        },
        "headers": {
          "additionalProperties": {
            "type": "string"
          },
          "title": "ErrorResponse.headers",
          "type": "object"
        },
        "body": {
          "title": "ErrorResponse.body",
          "type": "string"
        }
      },
      "required": [
        "statusCode",
        "body"
      ],
      "additionalProperties": false,
      "title": "ErrorResponse",
      "type": "object"
    }
  },
  "securityDefinitions": {}
};