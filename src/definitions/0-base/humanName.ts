import { SchemaDefinition } from 'mongoose';

export const humanNameSchemaDefinition: SchemaDefinition = {
  use: { type: String, enum: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'] },
  text: { type: String },
  family: { type: String },
  given: { type: [String] },
  prefix: { type: [String] },
  suffix: { type: [String] },
};

export const humanNameSubSchemaDefinition: SchemaDefinition = Object.assign({}, humanNameSchemaDefinition, {
  _id: { type: String },
});

export const humanNameSchemaValidator: any = {
  $id: 'http://example.com/schemas/humanNameSchemaValidator.json',
  definitions: {
    humanNameSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Human Name',
  description: 'A human name schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    use: {
      description: 'Type of use',
      type: 'string',
      enum: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'],
    },
    text: {
      description: 'Name value',
      type: 'string',
      maxLength: 255,
    },
    family: {
      description: 'Family name value',
      type: 'string',
      maxLength: 255,
    },
    given: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    prefix: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    suffix: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['text'],
  additionalProperties: false,
};
