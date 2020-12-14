import React from 'react';
import makeAnimated from 'react-select/animated';
import { MdArrowDropDown, MdClose } from 'react-icons/md';
import AsyncCreatableSelect from 'react-select/async-creatable';
import Select, { ActionMeta, OptionsType, OptionTypeBase, StylesConfig, ValueType, components } from 'react-select';

import ToolTip from 'src/components/tool-tip';
import * as selectConstants from 'src/constants/rc-select';

const animatedComponents = makeAnimated();

export interface SelectOption {
  value: string | number | boolean;
  label: string;
}

interface RcSelectProps {
  options?: Array<SelectOption>;
  defaultValue?: SelectOption;
  styles?: StylesConfig;
  placeholder?: String;
  isSearchable?: boolean;
  components?: Object;
  noOptionMessage?: String;
  onChange?: (value: ValueType<OptionTypeBase>, action: ActionMeta<OptionTypeBase>) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  isLoading?: boolean;
  onCreateOption?: Function;
  value?: any; //NOTE: value will be required when using onCreateOption in creatable select
  type?: String;
  onKeyDown?: any;
  onInputChange?: any;
  inputValue?: string;
  handlePaste?: Function;
  loadOptions?: (inputValue: string, callback: (options: OptionsType<OptionTypeBase>) => void) => void;
  defaultOptions?: boolean;
  name?: string;
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <MdArrowDropDown size={24} />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <MdClose size={18} />
    </components.ClearIndicator>
  );
};

const clearIndicatorStyles = (base: any) => ({
  ...base,
  padding: 0,
});

const dropDownIndicatorStyles = (base: any) => ({
  ...base,
  padding: 0,
});

const SingleValue = (props: any) => {
  const { children } = props;
  return (
    <components.SingleValue {...props}>
      <ToolTip description={children}>{children}</ToolTip>
    </components.SingleValue>
  );
};

const DefaultSelect = (props: RcSelectProps) => {
  const { components, noOptionMessage, ...otherProps } = props;

  return (
    <Select
      components={{ SingleValue, DropdownIndicator, ClearIndicator }}
      styles={{ clearIndicator: clearIndicatorStyles, dropdownIndicator: dropDownIndicatorStyles, ...props.styles }}
      classNamePrefix="react-select"
      noOptionsMessage={() => (noOptionMessage ? `${noOptionMessage}` : 'No Options')}
      {...otherProps}
    />
  );
};

// FIXME: Separate this component
const CustomCreatableSelect: React.FC<RcSelectProps> = (props: any) => {
  const { noOptionMessage, ...otherProps } = props;
  return (
    <div onPaste={props.handlePaste}>
      <AsyncCreatableSelect
        noOptionsMessage={() => `${noOptionMessage}`}
        {...otherProps}
        isValidNewOption={() => false}
        maxMenuHeight={150}
      />
    </div>
  );
};

const RcSelect: React.FC<RcSelectProps> = (props: any) => {
  const { components, type } = props;

  const customComponents = { ...animatedComponents, ...components };

  switch (type) {
    case selectConstants.types.SELECT:
      return <DefaultSelect {...props} components={customComponents} />;
    case selectConstants.types.CREATABLE:
      return <CustomCreatableSelect {...props} components={customComponents} />;
    default:
      return <DefaultSelect {...props} components={customComponents} />;
  }
};

export default RcSelect;
