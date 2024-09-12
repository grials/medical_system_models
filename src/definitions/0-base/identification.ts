import { SchemaDefinition } from 'mongoose';
import { codeableConceptSubSchemaDefinition } from './codeableConcept';
import { auditUserSchemaDefinition } from './auditUser';

export const identifierSchemaDefinition: SchemaDefinition = {
  use: { type: String, enum: ['usual', 'official', 'temp', 'secondary', 'old'] },
  identifierType: { type: codeableConceptSubSchemaDefinition },
  system: { type: String },
  value: { type: String },
  assigner: { display: { type: String } },
  _user: { type: auditUserSchemaDefinition },
};

export const identifierSubSchemaDefinition: SchemaDefinition = Object.assign({}, identifierSchemaDefinition, {
  _id: { type: String },
});

export const identifierSchemaValidator: any = {
  $id: 'http://example.com/schemas/identifierSchemaValidator.json',
  definitions: {
    identifierSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Identifier',
  description: 'a hl7 identifier',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    use: {
      type: 'string',
      enum: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'],
    },
    identifierType: {
      anyOf: [
        {
          $ref: 'codeableConceptSchemaValidator.json#/definitions/codeableConceptSchemaValidator',
        },
        {
          type: 'null',
        },
      ],
    },
    system: {
      type: 'string',
      maxLength: 255,
    },
    value: {
      type: 'string',
    },
    assigner: {
      type: 'object',
      properties: {
        display: {
          type: 'string',
          maxLength: 255,
        },
      },
      required: [],
      additionalProperties: false,
    },
  },
  required: ['identifierType', 'value'],
  additionalProperties: false,
};
