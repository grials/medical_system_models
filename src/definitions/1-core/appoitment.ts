import { SchemaDefinition } from 'mongoose';
import { practitionerSchemaDefinition } from './practitioner';
import { procedureTypeSchemaDefinition } from './procedureType';
import { patientSchemaDefinition } from './patient';
import { auditUserSchemaDefinition } from '../0-base';

export const appointmentSchemaDefinition: SchemaDefinition = {
  practitioner: { type: practitionerSchemaDefinition },
  patient: { type: patientSchemaDefinition },
  date: { type: Date },
  procedureType: { type: procedureTypeSchemaDefinition },
  startTime: { type: Number },
  endTime: { type: Number },
  active: { type: Boolean, default: true },
  _user: { type: auditUserSchemaDefinition },
};

export const appointmentSubSchemaDefinition: SchemaDefinition = Object.assign({}, appointmentSchemaDefinition, {
  _id: { type: String },
});

export const appointmentSchemaValidator: any = {
  $id: 'http://example.com/schemas/appointmentSchemaValidator.json',
  definitions: {
    appointmentSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Appointment',
  description: 'Appointment schema validator',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      maxLength: 255,
    },
    practitioner: {
      $ref: 'practitionerSchemaValidator.json#/definitions/practitionerSchemaValidator',
    },
    patient: {
      $ref: 'patientSchemaValidator.json#/definitions/patientSchemaValidator',
    },
    date: {
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
    procedureType: {
      $ref: 'procedureTypeSchemaValidator.json#/definitions/procedureTypeSchemaValidator',
    },
    startTime: {
      type: 'number',
    },
    endTime: {
      type: 'number',
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
};
