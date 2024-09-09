import { SchemaDefinition } from 'mongoose';
import { auditUserSubSchemaDefinition, humanNameSchemaDefinition, identifierSubSchemaDefinition } from '../0-base';
import { contactPointSubSchemaDefinition } from '../0-base/contactPoint';

export const patientSchemaDefinition: SchemaDefinition = {
  birthDate: { type: Date },
  active: { type: Boolean, default: true },
  _user: { type: auditUserSubSchemaDefinition },
  name: { type: [humanNameSchemaDefinition] },
  telecom: { type: [contactPointSubSchemaDefinition] },
  identification: { type: [identifierSubSchemaDefinition] },
};

export const patientSubSchemaDefinition: SchemaDefinition = Object.assign({}, patientSchemaDefinition, {
  _id: { type: String },
});

export const patientSchemaValidator: any = {
  $id: 'http://example.com/schemas/patientSchemaValidator.json',
  definitions: {
    patientSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Patient',
  description: 'Patient schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    name: {
      type: 'array',
      items: {
        $ref: 'humanNameSchemaValidator.json#/definitions/humanNameSchemaValidator',
      },
    },
    identification: {
      type: 'array',
      items: {
        $ref: 'identifierSchemaValidator.json#/definitions/identifierSchemaValidator',
      },
    },
    birthDate: {
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
    telecom: {
      type: 'array',
      items: {
        $ref: 'contactPointSchemaValidator.json#/definitions/contactPointSchemaValidator',
      },
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
