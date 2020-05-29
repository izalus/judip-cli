import fs from 'fs-extra';
import path from 'path';
import Package from '../../package.json';
import { getAppDataPath, getRecipeName, getInput } from '../utils';
import { IInputs, IDetails, IForm, IOption } from '../types';

export const getInputs = (inputs: IInputs, details: IDetails) => {
  const res: IForm[] = [];
  Object.keys(inputs).forEach((key) => {
    const input = inputs[key];
    let element = getInput(input);
    const {
      element: el = null,
      label = key,
      placeholder = '',
      optional = false,
      value = '',
    } = details[key] || {};

    if (el) {
      element = el;
    }

    if (element !== null) {
      if (element === 'input' && typeof value === 'string') {
        res.push({
          element,
          type: 'text',
          name: key,
          label,
          value,
          optional,
          placeholder,
        });
      } else if (element === 'textarea' && typeof value === 'string') {
        res.push({
          element,
          name: key,
          label,
          value,
          optional,
          placeholder,
        });
      } else if (
        element === 'radio' &&
        input instanceof Array &&
        typeof value === 'string'
      ) {
        const optionLabels: [string, string] = ['', ''];
        const options: [string, string] = ['', ''];
        let isValueSet = false;
        let firstValue = '';

        input.forEach((val: IOption, i: number) => {
          if (typeof val === 'string') {
            optionLabels[i] = val;
            options[i] = val;
            isValueSet = value === val;
            firstValue = i === 0 ? val : firstValue;
          } else {
            optionLabels[i] = val[0];
            options[i] = val[1];
            isValueSet = value === val[1];
            firstValue = i === 0 ? val[1] : firstValue;
          }
        });

        res.push({
          element,
          name: key,
          optionLabels,
          options,
          value: isValueSet ? value : firstValue,
          optional,
          label,
        });
      } else if (
        element === 'select' &&
        input instanceof Array &&
        typeof value === 'string'
      ) {
        const optionLabels: { 0: string; 1: string; 2: string } & string[] = [
          '',
          '',
          '',
        ];
        const options: { 0: string; 1: string; 2: string } & string[] = [
          '',
          '',
          '',
        ];
        let isValueSet = false;
        let firstValue = '';

        input.forEach((val: IOption, i: number) => {
          const newKey = typeof val === 'string' ? val : val[0];
          const newValue = typeof val === 'string' ? val : val[1];
          isValueSet = value === newValue;
          firstValue = i === 0 ? newValue : firstValue;

          if (i < optionLabels.length) {
            optionLabels[i] = newKey;
            options[i] = newValue;
          } else {
            optionLabels.push(newKey);
            options.push(newValue);
            isValueSet = value === newValue;
          }
        });

        res.push({
          element,
          name: key,
          optionLabels,
          options,
          value: isValueSet ? value : firstValue,
          optional,
          label,
        });
      } else if (element === 'checkbox') {
        res.push({
          element,
          name: key,
          label,
          value: Boolean(value),
          optional,
        });
      }
    }
  });
  return res;
};

export const get = async (recipe: string) => {
  try {
    const recipePath = path.join(
      getAppDataPath(),
      Package.name,
      getRecipeName(recipe),
      'recipe.json'
    );

    const data = await fs.readFile(recipePath, 'utf8');
    const recipeData = JSON.parse(data);
    const inputs = recipeData.inputs;
    const details = recipeData.details || {};
    console.log(JSON.stringify(getInputs(inputs, details), null, 2));
  } catch (err) {
    console.log(err);
  }
};
