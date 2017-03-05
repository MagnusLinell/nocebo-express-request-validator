# Nocebo Express Request Validator

Handles schema validation on express request.

## Requirements

Needs harmony to be set when used:

    node --harmony

## Setup

Options:

    schema.body: String | JSON Schema
    schema.query: String | JSON Schema

Example:

    {
      schema: {
        body: {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            }
          },
          "required": ["title"]
        },
        query: {
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              }
            },
            "required": ["id"]
          }
        }
      }
    }

## Test

To run unit tests:

    npm test
