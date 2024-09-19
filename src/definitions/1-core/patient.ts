import { SchemaDefinition } from 'mongoose';
import {
  auditUserSubSchemaDefinition,
  codeableConceptSchemaDefinition,
  humanNameSchemaDefinition,
  identifierSubSchemaDefinition,
} from '../0-base';
import { contactPointSubSchemaDefinition } from '../0-base/contactPoint';

export const patientSchemaDefinition: SchemaDefinition = {
  idx: { type: [String] },
  birthDate: { type: Date },
  active: { type: Boolean, default: true },
  _user: { type: auditUserSubSchemaDefinition },
  name: { type: [humanNameSchemaDefinition] },
  telecom: { type: [contactPointSubSchemaDefinition] },
  nationality: { type: codeableConceptSchemaDefinition },
  residenceCountry: { type: codeableConceptSchemaDefinition },
  deceasedBoolean: { type: Boolean, default: false },
  deceasedDate: { type: Date },
  referedBy: { type: String },
  identifier: { type: [identifierSubSchemaDefinition] },
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
      minItems: 1,
    },
    nationality: {
      $ref: 'codeableConceptSchemaValidator.json#/definitions/codeableConceptSchemaValidator',
    },
    residenceCountry: {
      $ref: 'codeableConceptSchemaValidator.json#/definitions/codeableConceptSchemaValidator',
    },
    deceasedBoolean: { type: 'boolean' },
    deceasedDate: {
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
    referedBy: { type: 'string' },
    identifier: {
      type: 'array',
      items: {
        $ref: 'identifierSchemaValidator.json#/definitions/identifierSchemaValidator',
      },
      minItems: 1,
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
  required: ['name', 'identifier', 'birthDate'],
  additionalProperties: false,
};
