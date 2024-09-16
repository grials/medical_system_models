import { SchemaDefinition } from 'mongoose';
import {
  auditUserSubSchemaDefinition,
  codeableConceptSubSchemaDefinition,
  humanNameSchemaDefinition,
  identifierSubSchemaDefinition,
} from '../0-base';
import { contactPointSubSchemaDefinition } from '../0-base/contactPoint';

export const practitionerSchemaDefinition: SchemaDefinition = {
  idx: { type: [String] },
  name: { type: [humanNameSchemaDefinition] },
  telecom: { type: [contactPointSubSchemaDefinition] },
  identification: { type: [identifierSubSchemaDefinition] },
  specialties: { type: [codeableConceptSubSchemaDefinition] },
  birthDate: { type: Date },
  active: { type: Boolean, default: true },
  _user: { type: auditUserSubSchemaDefinition },
};

export const practitionerSubSchemaDefinition: SchemaDefinition = Object.assign({}, practitionerSchemaDefinition, {
  _id: { type: String },
});

export const practitionerSchemaValidator: any = {
  $id: 'http://example.com/schemas/practitionerSchemaValidator.json',
  definitions: {
    practitionerSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Practitioner',
  description: 'Practitioner schema validator',
  type: 'object',
  properties: {
    idx: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
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
    specialties: {
      type: 'array',
      items: {
        $ref: 'codeableConceptSchemaValidator.json#/definitions/codeableConceptSchemaValidator',
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
