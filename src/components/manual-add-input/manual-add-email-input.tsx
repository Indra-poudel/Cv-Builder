import debounce from 'lodash.debounce';
import toast from 'src/utils/notification';
import makeAnimated from 'react-select/animated';
import React, { useEffect, useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { OptionsType, OptionTypeBase, ValueType } from 'react-select';

import ManualAddInputOptions from './manual-add-input.types';
import * as validationService from 'src/services/validate-user';

interface ManualAddInputState {
  id?: string;
  noOptionMessage: string;
  placeholder?: string;
  maxMenuHeight?: number;
  minTextBoxHeight?: number;
  selectedValue: ValueType<OptionTypeBase>;
  onAddedValue: (selectedOptions: ValueType<OptionTypeBase>) => void;
  validateValue?: (values: Array<string>, id?: string) => Promise<Array<validationService.ValidateState>>;
  getSuggestion: (searchString: string) => Promise<Array<string>>;
}

const ManualAddInput: React.FC<ManualAddInputState> = (props: ManualAddInputState) => {
  const debounceMs = 500;

  const { minTextBoxHeight = 70, placeholder, getSuggestion, onAddedValue, validateValue, maxMenuHeight = 150 } = props;

  const animatedComponents = makeAnimated();

  const [manuallyEnteredText, setManuallyEnteredText] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [defaultSuggestion, setDefaultSuggestion] = useState<Array<ManualAddInputOptions>>([]);

  const loadSuggestedOptions = React.useCallback(
    debounce((inputValue: string, callback: (options: OptionsType<OptionTypeBase>) => void) => {
      getSuggestedValue(inputValue)
        .then((suggestedUsers) => {
          callback(suggestedUsers);
        })
        .catch((error) => toast(error.message));
    }, debounceMs),
    []
  );

  const loadDefaultSuggestion = () => {
    !manuallyEnteredText &&
      getSuggestedValue('')
        .then((suggestedUsers) => setDefaultSuggestion(suggestedUsers))
        .catch(() => setDefaultSuggestion([]))
        .finally(() => setIsLoading(false));
  };

  const getSuggestedValue = async (searchKey: string) => {
    const suggestedValues = await getSuggestion(searchKey);

    return suggestedValues.map(
      (suggestedValue: string): ManualAddInputOptions => ({
        value: suggestedValue,
        label: suggestedValue,
        isValid: true,
      })
    );
  };

  const checkValidation = async (values: Array<string> | string): Promise<Array<validationService.ValidateState>> => {
    const unCheckedValues = Array.isArray(values) ? values : [values];
    if (validateValue) {
      try {
        const validatedValue = await validateValue(unCheckedValues, props.id);
        return validatedValue;
      } catch (err) {
        toast(err);
        throw err;
      }
    }
    return unCheckedValues.map((values) => ({
      validateValue: values,
      isValid: false,
    }));
  };

  const IndicatorsContainer = () => <span className="display__none" />;

  const customChips = { ...animatedComponents, IndicatorsContainer };

  const onSelectOption = (selectedOption: ValueType<OptionTypeBase>) =>
    selectedOption ? onAddedValue([...selectedOption]) : onAddedValue([]);

  const onInputChange = (inputValue: string) => setManuallyEnteredText(inputValue);

  const onPaste = (clipboardEvent: React.ClipboardEvent<HTMLDivElement>) => {
    clipboardEvent.preventDefault();

    const pastedText = clipboardEvent.clipboardData?.getData('text');

    pastedText && selectValueFromManuallyEnterText(pastedText);
  };

  // change the text into  chip if user press 'commas'.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ',') {
      event.preventDefault();
      selectValueFromManuallyEnterText(manuallyEnteredText);
      setManuallyEnteredText('');
    }
  };

  const checkInvalidValue = (value: ManualAddInputOptions) => value.isValid === false;

  const selectValue = (Options: Array<string>): Array<ManualAddInputOptions> =>
    Options.map((label) => ({
      value: label,
      label: label,
      isValid: false,
    }));

  const selectValueFromManuallyEnterText = async (value: string) => {
    if (!value.trim()) {
      return;
    }

    const removedSpacesText = value.replace(/ /g, '');

    const replacedLineBreakText = removedSpacesText.replace(/(\r\n|\n|\r)/gm, ',');

    // to remove last commas from the pasted text
    let pastedText = replacedLineBreakText.replace(/,\s*$/, '').split(',');

    pastedText = pastedText.filter((email) => email);

    onAddedValue([...props.selectedValue, ...selectValue(pastedText)]);

    if (validateValue) {
      const validateValue = (await checkValidation(pastedText)).map((user) => ({
        label: user.validateValue,
        value: user.validateValue,
        isValid: user.isValid,
      }));

      const selectedValue = [...props.selectedValue, ...validateValue];

      // Remove duplicate emails if there in a pasted text or while manually typing
      const selectedValueMap = new Map(selectedValue.map((item) => [item.value, item]));
      const filterSelectedValue = Array.from(selectedValueMap, ([key, value]) => value);

      onAddedValue(filterSelectedValue);
    }
  };

  const stylesOnInvalidCondition = {
    control: () =>
      props.selectedValue?.some(checkInvalidValue)
        ? { ...control, border: '1px solid #F82B60', minHeight: minTextBoxHeight }
        : { ...control, minHeight: minTextBoxHeight },
    multiValue: (style: Object, state: any) =>
      state.data.isValid ? { ...style, ...customEmailChipStyle } : { ...style, ...customInvalidChip },
    multiValueRemove: (styles: Object, state: any) => (state.data.isValid ? styles : { ...styles, color: '#F82B60' }),
    multiValueLabel: (styles: Object, state: any) => (state.data.isValid ? styles : { ...styles, color: '#F82B60' }),
  };

  return (
    <div onPaste={onPaste}>
      <AsyncCreatableSelect
        onChange={onSelectOption}
        placeholder={placeholder ? placeholder : false}
        components={customChips}
        styles={stylesOnInvalidCondition}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        isMulti={true}
        value={props.selectedValue}
        closeMenuOnSelect={false}
        inputValue={manuallyEnteredText}
        defaultOptions={defaultSuggestion}
        onMenuOpen={loadDefaultSuggestion}
        loadOptions={loadSuggestedOptions}
        isValidNewOption={() => false}
        noOptionsMessage={() => (isLoading ? 'Loading...' : props.noOptionMessage)}
        maxMenuHeight={maxMenuHeight}
      />
    </div>
  );
};

// Here we are using css object to make react-select dynamic style while emails are invalid
const customInvalidChip = {
  backgroundColor: '#FAFAFA',
  border: '1px solid #F82B60',
  borderRadius: '4px',
};

const control = {
  border: '1px solid #D3D4D9',
  padding: '5px',
  borderRadius: '4px',
  overflow: 'auto',
};
const customEmailChipStyle = {
  backgroundColor: '#FAFAFA',
  border: '1px solid #D3D4D9',
  borderRadius: '4px',
};

export default ManualAddInput;
