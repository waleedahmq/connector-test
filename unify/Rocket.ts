import { FromSchema } from "json-schema-to-ts";

const rocketSchema = {
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "id": {
      "type": "string",
      "readOnly": true,
      "example": "12345"
    },
    "company": {
      "type": "string",
      "readOnly": true,
      "example": "Apideck"
    },
    "country": {
      "type": "string",
      "readOnly": true,
      "example": "12345"
    },
    "main_image": {
      "type": "string",
      "readOnly": true,
      "example": "https://farm1.staticflickr.com/623/23660653516_5b6cb301d1_b.jpg"
    },
    "cost_per_launch": {
      "type": "object",
      "readOnly": true,
      "properties": {
        "amount": {
          "type": "number",
          "readOnly": true,
          "example": "12345"
        },
        "currency": {
          "type": "string",
          "readOnly": true,
          "example": "USD"
        }
      },
      "example": {
        "amount": "12345",
        "currency": "USD"
      }
    }
  }
} as const;

// Converting JSON schema to typescript type
type Rocket = FromSchema<typeof rocketSchema>;
export default Rocket;