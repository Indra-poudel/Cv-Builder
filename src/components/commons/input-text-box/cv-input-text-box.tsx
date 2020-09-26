import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import './cv_input_text_box.css';
import { IMenuItems } from './types';
import { formatDate } from 'src/utils/date';
import 'react-datepicker/dist/react-datepicker.css';
import { CV_INPUT_TEXT_BOX_TYPES } from 'src/constants/cv-input-text-box';

interface CvInputTextBoxProps {
  isRequired?: boolean;
  label?: string;
  name?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  menuItems?: Array<IMenuItems>;
  iconRenderer?: React.ReactNode;
  menuXPosition?: string;
  menuYPosition?: string;
  onChange: (changedItem: string | File | IMenuItems) => void;
}

const CvInputTextBox: React.FC<CvInputTextBoxProps> = (props: CvInputTextBoxProps) => {
  const { t } = useTranslation(['cv-input-text-box']);

  const [selectedValue, setInputValue] = useState<string>();
  const [isColorTextBoxFocused, setFocus] = useState<boolean>(false);
  const [isMenuOpen, toggleMenu] = useState<boolean>(false);

  const customTextBoxFocused = () => setFocus(true);
  const customTextBoxUnFocused = () => setFocus(false);

  const onTextBoxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
    setInputValue(e.target.value);
  };

  const onDateSelected = (selectedDate: Date | [Date, Date] | null) => {
    const date = selectedDate?.toString();
    date && props.onChange(formatDate(date));
    setInputValue(date);
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && props.onChange(e.target.files[0]);
  };

  const handleToggle = () => {
    toggleMenu((prevState) => !prevState);
  };

  const onSelectMenu = (menuItem: IMenuItems) => {
    props.onChange(menuItem);
    handleToggle();
  };

  const onSelectBoxInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
    setInputValue(e.target.value);
  };

  const InputField = () => {
    switch (props.type) {
      case CV_INPUT_TEXT_BOX_TYPES.COLOR:
        return (
          <div
            className={
              isColorTextBoxFocused
                ? 'cv_input_color_text_box__wrapper cv_input_color_text_box__wrapper_focus'
                : 'cv_input_color_text_box__wrapper'
            }>
            <div className="cv_input_text_box__ball" style={{ backgroundColor: selectedValue }}></div>
            <input
              onFocus={customTextBoxFocused}
              onBlur={customTextBoxUnFocused}
              name={props.name}
              onChange={onTextBoxInputChange}
              className="cv_input_color_text_box"
              placeholder={props.placeholder}
            />
          </div>
        );

      case CV_INPUT_TEXT_BOX_TYPES.DATE_PICKER:
        return (
          <DatePicker
            onCalendarClose={customTextBoxUnFocused}
            onCalendarOpen={customTextBoxFocused}
            className={
              isColorTextBoxFocused
                ? 'cv_input_color_text_box__wrapper cv_input_color_text_box__wrapper_focus'
                : 'cv_input_color_text_box__wrapper'
            }
            onChange={onDateSelected}
            customInput={
              <div className="cv_input_date_picker">
                <span>{getSelectedDateOrPlaceholder()}</span>
                {props.iconRenderer}
              </div>
            }
          />
        );
      case CV_INPUT_TEXT_BOX_TYPES.FILE_UPLOADER:
        return (
          <>
            <label htmlFor="file-input" className="cv-input-file-uploader">
              {props.iconRenderer}
            </label>
            <input
              id="file-input"
              onFocus={customTextBoxFocused}
              onBlur={customTextBoxUnFocused}
              name={props.name}
              type="file"
              onChange={fileChange}
            />
          </>
        );
      case CV_INPUT_TEXT_BOX_TYPES.MENU:
        return (
          <div className="cv-input-menu-wrapper">
            <span onClick={handleToggle}>{props.iconRenderer}</span>
            {isMenuOpen && props.menuItems && (
              <>
                <div onClick={() => toggleMenu(false)} className="backdrop"></div>
                <ul style={{ top: props.menuXPosition, left: props.menuYPosition }}>
                  {props.menuItems.map((menuItem) => (
                    <li onClick={() => onSelectMenu(menuItem)} key={menuItem.id}>
                      {menuItem.icon}
                      <label>{menuItem.label}</label>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      case CV_INPUT_TEXT_BOX_TYPES.DROP_DOWN:
        return (
          <select
            onFocus={customTextBoxFocused}
            onBlur={customTextBoxUnFocused}
            name={props.name}
            onChange={onSelectBoxInputChange}
            className={isColorTextBoxFocused ? `cv_input_select_text_box focus` : `cv_input_select_text_box unfocus`}
            placeholder={props.placeholder}>
            <option disabled selected></option>
            {props.menuItems && props.menuItems.map((option, index) => <option key={option.id}>{option.label}</option>)}
          </select>
        );
      default:
        return (
          <input
            name={props.name}
            onChange={onTextBoxInputChange}
            className="cv_input_text_box"
            placeholder={props.placeholder}
          />
        );
    }
  };

  const getSelectedDateOrPlaceholder = () => {
    if (!selectedValue) {
      return <span className="cv_input_date_picker_placeholder">{props.placeholder || 'dd/MM/yyyy'}</span>;
    }

    return formatDate(selectedValue);
  };

  return (
    <div className="cv_input_text_box_wrapper">
      <label htmlFor={props.name} className="cv_input_color_text_box_label">
        {props.label} {props.isRequired && t('cv-input-text-box:requiredLabel')}
      </label>
      {/* Here we can't use Tag format like <InputField /> since it makes textbox lose its focus */}
      {InputField()}
      {props.isRequired && selectedValue !== undefined && !selectedValue && (
        <label htmlFor={props.name} className="cv_input_color_text_box_required_label">
          {t('cv-input-text-box:errorMessage')}
        </label>
      )}
    </div>
  );
};

export default CvInputTextBox;
