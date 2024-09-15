import { SchemaDefinition } from 'mongoose';
import { auditUserSchemaDefinition, codeableConceptSubSchemaDefinition } from '../0-base';

export const procedureTypeSchemaDefinition: SchemaDefinition = {
  specialty: { type: codeableConceptSubSchemaDefinition },
  name: { type: String },
  description: { type: String },
  duration: { type: Number },
  active: { type: Boolean, default: true },
  category: { type: String, default: 'appointment' },
  _user: { type: auditUserSchemaDefinition },
};

export const procedureTypeSubSchemaDefinition: SchemaDefinition = Object.assign({}, procedureTypeSchemaDefinition, {
  _id: { type: String },
});

export const procedureTypeSchemaValidator: any = {
  $id: 'http://example.com/schemas/procedureTypeSchemaValidator.json',
  definitions: {
    procedureTypeSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'ProcedureType',
  description: 'ProcedureType schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    specialty: {
      $ref: 'codeableConceptSchemaValidator.json#/definitions/codeableConceptSchemaValidator',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    duration: {
      type: 'number',
    },
    active: { type: 'boolean' },
    category: {
      type: 'string',
    },
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
};
