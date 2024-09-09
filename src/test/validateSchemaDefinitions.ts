import * as modules from '../definitions';
import logger from '../logger';
import { getMonitoringProcess, validateMemory } from './monitor';
import { Schema } from 'mongoose';

const validateSchemaDefinitions = () => {
  const allSchemasDefinitions = new Set(
    Object.keys(modules)
      .filter((moduleName) => moduleName.includes('SchemaDefinition') && !moduleName.includes('Sub'))
      .sort()
  );
  let curretSchemaDefinitionName = '';
  try {
    for (const schemaDefinitionName of allSchemasDefinitions.values()) {
      // validateMemory();
      curretSchemaDefinitionName = schemaDefinitionName;
      // @ts-ignore
      Schema(modules[schemaDefinitionName]);
      logger.info(`🟢🟢🟢 Schema Success | ${schemaDefinitionName}`);
    }
    getMonitoringProcess();
  } catch (error) {
    logger.info();
    logger.info();
    logger.info(`🔴🔴🔴 <=======================================================> 🔴🔴🔴`);
    logger.info(error);
    logger.info(`🔴🔴🔴 Invalid schema definition | ${curretSchemaDefinitionName}`);
    getMonitoringProcess();
  }
};

validateSchemaDefinitions();
