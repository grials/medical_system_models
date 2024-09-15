import { SchemaDefinition } from 'mongoose';
import { auditUserSchemaDefinition } from '../0-base';
import { practitionerSubSchemaDefinition } from '../1-core';
import { userSchemaValidator } from './user';
import { permissionSchemaDefinition } from './permission';

export const practitionerUserSchemaDefinition: SchemaDefinition = {
  practitionerProfile: { type: practitionerSubSchemaDefinition },
  permits: {
    type: [permissionSchemaDefinition],
  },
  _user: { type: auditUserSchemaDefinition },
};

export const practitionerUserSchemaValidator: any = {
  $id: 'http://example.com/schemas/practitionerUserSchemaValidator.json',
  definitions: {
    practitionerUserSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Practitioner user',
  description: 'Practitioner user',
  type: 'object',
  properties: {
    ...userSchemaValidator.properties,
    _id: {
      type: 'string',
      maxLength: 255,
    },
    permits: {
      type: 'array',
      items: {
        $ref: 'permissionSchemaValidator.json#/definitions/permissionSchemaValidator',
      },
    },
    practitionerProfile: {
      $ref: 'practitionerSchemaValidator.json#/definitions/practitionerSchemaValidator',
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
