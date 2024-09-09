import { SchemaDefinition } from 'mongoose';

export const auditUserSchemaDefinition: SchemaDefinition = {
  date: { type: Date },
  userId: { type: String },
};

export const auditUserSubSchemaDefinition: SchemaDefinition = Object.assign({}, auditUserSchemaDefinition, {
  _id: { type: String },
});

export const auditUserSchemaValidator: any = {
  $id: 'http://example.com/schemas/auditUserSchemaValidator.json',
  definitions: {
    auditUserSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Audit User',
  description: 'Audit User schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    userId: { type: 'string' },
    date: {
      anyOf: [
        {
          type: 'object',
          isDate: true,
        },
        {
          type: 'string',
          format: 'date-time',
        },
      ],
    },
    createdAt: {
      anyOf: [
        {
          type: 'object',
          isDate: true,
        },
        {
          type: 'string',
          format: 'date-time',
        },
      ],
    },
    updatedAt: {
      anyOf: [
        {
          type: 'object',
          isDate: true,
        },
        {
          type: 'string',
          format: 'date-time',
        },
      ],
    },
    __v: {
      type: 'number',
    },
  },
  required: ['userId', 'date'],
  additionalProperties: false,
};
