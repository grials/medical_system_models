import { SchemaDefinition } from 'mongoose';
import { auditUserSchemaDefinition } from '../0-base/auditUser';

export const userSchemaDefinition: SchemaDefinition = {
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String },
  type: { type: String },
  _user: { type: auditUserSchemaDefinition },
  active: { type: Boolean, default: true },
};

export const userSubSchemaDefinition: SchemaDefinition = Object.assign({}, userSchemaDefinition, {
  _id: { type: String },
});

export const userSchemaValidator: any = {
  $id: 'http://example.com/schemas/userSchemaValidator.json',
  definitions: {
    userSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'User',
  description: 'User',
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
      maxLength: 255,
    },
    password: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: ['Superuser', 'Practitioner'],
    },
    _id: {
      type: 'string',
      maxLength: 255,
    },
    __t: {
      type: 'string',
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
  required: ['username', 'email', 'password', 'type'],
  additionalProperties: false,
};
