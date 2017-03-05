# Nocebo Express Request Validator

Handles schema validation on express request.

## Requirements

Needs harmony to be set when used:

    node --harmony

## Setup

Options:

    schema: String | JSON Schema

Example:

    {
      schema: {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          }
        },
        "required": ["title"]
      }
    }

## Test

To run unit tests:

    npm test
