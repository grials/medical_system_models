import { typeCheck } from 'type-check';
import * as modules from '../definitions';

export const validateRefValues = (value: string, currentThreeKey: string[]) => {
  const validRefRegExpr = /^[a-z]+\.json\#\/definitions\/[a-z]+$/gi;
  if (!validRefRegExpr.test(value)) {
    throw new Error(`Invalid $ref value in ${currentThreeKey.join('/')}`);
  }

  return true;
};

export const findAllRefInObjectValues = (data: any, $refValues: string[], currentThreeKey: string[]) => {
  const newData = { ...data };
  for (const key of Object.keys(newData)) {
    const threeKey = [...currentThreeKey];
    threeKey.push(key);
    if (typeCheck('Object', newData[key])) {
      findAllRefInObjectValues(newData[key], $refValues, threeKey);
    }

    if (typeCheck('Array', newData[key])) {
      findAllRefInArrayValues(newData[key], $refValues, threeKey);
    }

    if (typeCheck('String', newData[key]) && key === '$ref' && newData[key] !== '#') {
      validateRefValues(newData[key], threeKey);
      const dependencyName = newData[key].split('.')[0];
      $refValues.push(dependencyName);
      // @ts-ignore
      const newSchemaValidator = modules[dependencyName];
      if (!newSchemaValidator) {
        throw new Error(`schemaDependency ${dependencyName} not found in ${currentThreeKey.join('/')}`);
      }
      findAllRefInObjectValues(newSchemaValidator, $refValues, [newSchemaValidator.$id]);
    }
  }

  return $refValues;
};

export const findAllRefInArrayValues = (data: any, $refValues: string[], currentThreeKey: string[]) => {
  let index = 0;
  for (const item of data) {
    const threeKey = [...currentThreeKey, `${++index}`];
    if (typeCheck('Object', item)) {
      findAllRefInObjectValues(item, $refValues, threeKey);
    } else if (typeCheck('array', item)) {
      findAllRefInArrayValues(item, $refValues, threeKey);
    }
  }

  return $refValues;
};

export const findAllSchemaValidatorRef = (data: any) => {
  const $refValues: string[] = [];
  if (!typeCheck('Object', data)) {
    throw new Error('Data must be an object');
  }
  if (typeCheck('Object', data)) {
    return findAllRefInObjectValues({ ...data }, $refValues, [data.$id]);
  }

  if (typeCheck('Array', data)) {
    return findAllRefInArrayValues([...data], $refValues, [data.$id]);
  }

  return $refValues;
};
