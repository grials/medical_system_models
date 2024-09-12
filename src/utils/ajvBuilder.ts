import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as modules from '../definitions';
import logger from '../logger';
import { findAllSchemaValidatorsNames } from './findAllSchemaValidatorsNames';
import { findAllSchemaValidatorRef } from './findAllSchemaValidatorRef';

export const addNewFormatsToAjv = (ajv: any) => {
  addFormats(ajv);
  ajv.addKeyword({
    keyword: 'isDate',
    type: 'object',
    schemaType: 'boolean',
    compile: (schema: any, parentSchema: any) => {
      const validateFunction: any = (data: any) => (Date.parse(data) ? true : false);
      return parentSchema.isDate ? validateFunction : () => true;
    },
    error: {
      message: 'invalid date',
      params: { type: 'Date' },
    },
  });
};

export function AjvValidatorError(errors: any, status?: any, msg?: any) {
  // @ts-ignore
  this.errors = errors;
  // @ts-ignore
  this.status = status || 422;
  // @ts-ignore
  this.msg = msg || 'Error';
  // @ts-ignore
  this.code = msg?.split(':')[0]?.trim()?.replace('[', '')?.replace(']', '') || '001';
}

export const startSchemasValidators = (SCHEMAS_NAMES?: string[]) => {
  let allSchemasValidators: any = [];
  const allSchemasValidatorsSet = SCHEMAS_NAMES?.length
    ? new Set(
        Object.keys(modules).filter((moduleName) =>
          SCHEMAS_NAMES.find((schemaName) => moduleName.toLowerCase() === `${schemaName}SchemaValidator`.toLowerCase())
        )
      )
    : findAllSchemaValidatorsNames();

  try {
    for (const schemaValidatorName of allSchemasValidatorsSet.values()) {
      // @ts-ignore
      const schemas = [modules[schemaValidatorName]];

      // @ts-ignore
      const modulesDependencyNames = new Set(findAllSchemaValidatorRef(modules[schemaValidatorName]));

      for (const schemaDependencyName of modulesDependencyNames.values()) {
        // @ts-ignore
        const schemaDependency = modules[schemaDependencyName] || null;
        if (schemaDependency) {
          schemas.push(schemaDependency);
        } else {
          throw new Error(`schemaDependency ${schemaDependencyName} not found in ${schemaValidatorName}`);
        }
      }

      allSchemasValidators = [...allSchemasValidators, ...schemas.reverse()];
    }

    const ajv = new Ajv({ schemas: Array.from(new Set(allSchemasValidators).values()) as any, allErrors: true });
    addNewFormatsToAjv(ajv);
    /* tslint:disable */
    return {
      ajv,
      validateData: function (schemaValidatorId: string, data: any) {
        try {
          const ajvValidator = this.ajv.getSchema(schemaValidatorId);
          if (!ajvValidator) {
            logger.error(`schema validator not found | ${schemaValidatorId}`);
            throw new Error(`schema validator not found`);
          }

          if (!ajvValidator(data)) {
            // @ts-ignore
            throw new AjvValidatorError(ajvValidator.errors, 422, `[ISV001]: invalid schema ${schemaValidatorId}`);
          }
        } catch (error) {
          // @ts-ignore
          logger.error(error.msg);
          throw error;
        }
      },
    };
    /* tslint:enable */
  } catch (error) {
    logger.info(`🔴🔴🔴 <=======================================================> 🔴🔴🔴`);
    logger.info(error);
    logger.info(`🔴🔴🔴 <=======================================================> 🔴🔴🔴`);
    process.exit(1);
  }
};
