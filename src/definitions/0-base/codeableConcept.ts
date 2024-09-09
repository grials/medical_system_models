import { SchemaDefinition, SchemaTypes } from 'mongoose';
import { codingSubSchemaDefinition } from './coding';

export const codeableConceptSchemaDefinition: SchemaDefinition = {
  coding: { type: [codingSubSchemaDefinition] },
  text: { type: String, trim: true },
  displays: {
    type: [
      {
        value: { type: String },
        language: { type: String },
        abbreviation: { type: String },
      },
    ],
  },
};

export const codeableConceptSubSchemaDefinition: SchemaDefinition = Object.assign({}, codeableConceptSchemaDefinition, {
  _id: { type: String },
});

export const displaySchemaValidator: any = {
  $id: 'http://example.com/schemas/displaySchemaValidator.json',
  definitions: {
    displaySchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Display',
  description: 'A display schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    value: {
      type: 'string',
      maxLength: 255,
    },
    language: {
      type: 'string',
      maxLength: 255,
    },
    abbreviation: {
      type: 'string',
      maxLength: 255,
    },
  },
  required: ['value'],
  additionalProperties: false,
};

export const codeableConceptSchemaValidator: any = {
  $id: 'http://example.com/schemas/codeableConceptSchemaValidator.json',
  definitions: {
    codeableConceptSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'CodeableConcept',
  description: 'Codeable concept schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    coding: {
      type: 'array',
      items: {
        $ref: 'codingSchemaValidator.json#/definitions/codingSchemaValidator',
      },
    },
    text: {
      type: 'string',
    },
    displays: {
      type: 'array',
      items: {
        $ref: 'displaySchemaValidator.json#/definitions/displaySchemaValidator',
      },
    },
  },
  required: [],
  additionalProperties: false,
};
