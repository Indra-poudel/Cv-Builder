import { SelectOption } from 'src/components/commons/rc-select/rc-select';

export interface ReactSelectOptions {
  value: string | number;
  label: string;
}

/**
 * If model is passed will generates react select options from given array of objects.
 * If model is not passed will generates react select options for given array of string
 * @param {Array} array
 * @param {Object} model Object keys from which react select's value and label is to fetched.
 * @returns {Array}
 */
const generateReactSelectOptions = (array: Array<any>) => {
  return array.reduce((previousValue: Array<ReactSelectOptions>, item: any) => {
    return previousValue.concat({ value: item, label: item });
  }, []);
};

/**
 * Return SelectOption object based on selected value.
 *
 * @param options Array of options which is shown.
 * @param selectedValue Value of selected option.
 */
const getSelectedValueFromOptions = (options: Array<SelectOption>, selectedValue?: boolean | string | number) => {
  const value = options.find((item) => item.value === selectedValue);

  return value || null;
};

const reactSelectUtils = {
  generateReactSelectOptions,
  getSelectedValueFromOptions,
};

export default reactSelectUtils;
