import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { BiCalendar } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import './cv_input_text_box.css';
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
  onChange: (textboxText: string) => void;
}

const CvInputTextBox: React.FC<CvInputTextBoxProps> = (props: CvInputTextBoxProps) => {
  const { t } = useTranslation(['cv-input-text-box']);

  const [selectedValue, setInputValue] = useState<string>();
  const [isColorTextBoxFocused, setFocus] = useState<boolean>(false);

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
                <BiCalendar className="cv_input_date_picker_icon" />
              </div>
            }
          />
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
