import { typeCheck } from 'type-check';

export const validateObjectValues = (data: any) => {
  const newData = { ...data };
  for (const key of Object.keys(newData)) {
    if (
      typeCheck('Undefined', newData[key]) ||
      typeCheck('Null', newData[key]) ||
      (typeCheck('String', newData[key]) && !newData[key])
    ) {
      delete newData[key];
    }

    if (typeCheck('Object', newData[key])) {
      const response = validateObjectValues(newData[key]);
      if (Object.keys(response).length) {
        newData[key] = response;
      } else {
        delete newData[key];
      }
    }
    if (typeCheck('Array', newData[key])) {
      newData[key] = validateArrayValues(newData[key]);
    }

    if (typeCheck('String', newData[key])) {
      newData[key] = newData[key].trim();
    }
  }

  return newData;
};

export const validateArrayValues = (data: any) => {
  const newData = [];
  for (const item of data) {
    if (typeCheck('Undefined', item) || typeCheck('Null', item) || (typeCheck('String', item) && !item)) {
      continue;
    }

    if (typeCheck('Object', item)) {
      const response = validateObjectValues(item);

      if (Object.keys(response).length) {
        newData.push(response);
      }
    } else if (typeCheck('array', item)) {
      const response: any = validateArrayValues(item);
      newData.push(response);
    } else {
      newData.push(item);
    }
  }

  return newData;
};

export const removeNullAndUndefinedValues = (data: any) => {
  if (typeCheck('Object', data)) {
    return validateObjectValues({ ...data });
  }

  if (typeCheck('Array', data)) {
    return validateArrayValues([...data]);
  }

  return data;
};
