import { SchemaDefinition } from 'mongoose';
import { auditUserSchemaDefinition } from './auditUser';

export const codingSchemaDefinition: SchemaDefinition = {
  system: { type: String },
  version: { type: String },
  code: { type: String },
  display: { type: String },
  userSelected: { type: Boolean },
  _user: { type: auditUserSchemaDefinition },
};

export const codingSubSchemaDefinition: SchemaDefinition = Object.assign({}, codingSchemaDefinition, {
  _id: { type: String },
});

export const codingSchemaValidator: any = {
  $id: 'http://example.com/schemas/codingSchemaValidator.json',
  definitions: {
    codingSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Coding',
  description: 'A hl7 coding schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    system: {
      anyOf: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
    version: {
      anyOf: [
        {
          type: 'string',
          maxLength: 255,
        },
        {
          type: 'null',
        },
      ],
    },
    code: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'null',
        },
      ],
    },
    display: {
      type: 'string',
    },
    userSelected: {
      type: 'boolean',
    },
    active: { type: 'boolean' },
    _user: {
      $ref: 'auditUserSchemaValidator.json#/definitions/auditUserSchemaValidator',
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
  required: [],
  additionalProperties: false,
};
