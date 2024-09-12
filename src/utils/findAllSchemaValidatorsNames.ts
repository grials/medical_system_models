import * as modules from '../definitions';

export const findAllSchemaValidatorsNames = () => {
  const schemaValidatorRegExpr = /[a-z]+SchemaValidator$/gi;
  return new Set(
    Object.keys(modules)
      .filter((moduleName) => schemaValidatorRegExpr.test(moduleName))
      .sort()
  );
};
