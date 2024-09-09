import { SchemaDefinition } from 'mongoose';

export const contactPointSchemaDefinition: SchemaDefinition = {
  use: { type: String },
  rank: { type: Number },
  value: { type: String },
  system: { type: String },
};

export const contactPointSubSchemaDefinition: SchemaDefinition = Object.assign({}, contactPointSchemaDefinition, {
  _id: { type: String },
});

export const contactPointSchemaValidator: any = {
  $id: 'http://example.com/schemas/contactPointSchemaValidator.json',
  definitions: {
    contactPointSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Contact Point',
  description: 'A hl7 contact point schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    system: {
      type: 'string',
      enum: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'],
    },
    value: {
      anyOf: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'number',
        },
      ],
    },
    use: {
      type: 'string',
      enum: ['home', 'work', 'temp', 'old', 'mobile', 'administrative'],
    },
    rank: {
      anyOf: [
        {
          type: 'number',
        },
        {
          type: 'null',
        },
      ],
    },
  },
  required: [],
  additionalProperties: false,
};
