import { SchemaDefinition } from 'mongoose';
import { auditUserSchemaDefinition } from '../0-base';

export const permissionSchemaDefinition: SchemaDefinition = {
  name: { type: String },
  features: {
    type: [
      {
        name: { type: String },
        level: { type: [Number] },
      },
    ],
  },
  _user: { type: auditUserSchemaDefinition },
};

export const permissionSubSchemaDefinition: SchemaDefinition = Object.assign({}, permissionSchemaDefinition, {
  _id: { type: String },
});

export const permissionSchemaValidator: any = {
  $id: 'http://example.com/schemas/permissionSchemaValidator.json',
  definitions: {
    permissionSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Permission',
  description: 'Permission',
  type: 'object',
  properties: {
    name: { type: 'string' },
    features: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          level: {
            type: 'array',
            items: { type: 'number' },
          },
        },
        required: ['name', 'level'],
        additionalProperties: false,
      },
    },
    _id: {
      type: 'string',
      maxLength: 255,
    },
    _user: {
      $ref: 'auditUserSchemaValidator.json#/definitions/auditUserSchemaValidator',
    },
    active: { type: 'boolean' },
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
  required: ['features', 'name'],
  additionalProperties: false,
};
