import Ajv from 'ajv';
import * as modules from '../definitions';
import logger from '../logger';
import { addNewFormatsToAjv, findAllSchemaValidatorsNames } from '../utils';
import { getMonitoringProcess } from './monitor';
import { findAllSchemaValidatorRef } from '../utils/findAllSchemaValidatorRef';

const validateSchemaValidator = (schemaValidators: any, schemaId: any) => {
  const ajv = new Ajv({ schemas: schemaValidators, allErrors: true });

  addNewFormatsToAjv(ajv);

  return ajv.getSchema(schemaId);
};

const validateSchemaValidators = () => {
  const allSchemasValidators = findAllSchemaValidatorsNames();

  for (const schemaValidatorName of allSchemasValidators.values()) {
    // @ts-ignore
    const allSchemaNamesModules = new Set(findAllSchemaValidatorRef(modules[schemaValidatorName]).sort());
    try {
      // @ts-ignore
      const schemas = [modules[schemaValidatorName]];
      for (const schemaDependencyName of allSchemaNamesModules.values()) {
        // @ts-ignore
        const schemaDependency = modules[schemaDependencyName] || null;
        if (schemaDependency) {
          schemas.push(schemaDependency);
        } else {
          throw new Error(`schemaDependency ${schemaDependencyName} not found in ${schemaValidatorName}`);
        }
      }

      if (modules.hasOwnProperty(schemaValidatorName)) {
        // @ts-ignore
        const response = validateSchemaValidator(schemas.reverse(), modules[schemaValidatorName].$id);
        // console.log(response);
        if (response) {
          logger.info(`🟢🟢🟢 Schema Success | ${schemaValidatorName}`);
        } else {
          logger.info(`🔴🔴🔴 Schema Error not found ${schemaValidatorName}`);
        }
      }
    } catch (error) {
      logger.info();
      logger.info();
      logger.error(`🔴🔴🔴 <=======================================================> 🔴🔴🔴`);
      logger.error();
      logger.error(`schema => ${schemaValidatorName}`);
      logger.error(error);
      logger.error();
      logger.error(`🔴🔴🔴 <=======================================================> 🔴🔴🔴`);
      logger.info();
      logger.info();

      getMonitoringProcess();
      process.exit(1);
    }
  }

  getMonitoringProcess();
};

validateSchemaValidators();
