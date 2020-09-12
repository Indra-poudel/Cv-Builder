import React, { useState } from 'react';

import './cv_input_text_box.css';
import { CV_INPUT_TEXT_BOX_TYPES } from 'src/constants/cv-input-text-box';

interface CvInputTextBoxProps {
  label?: string;
  name?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CvInputTextBox: React.FC<CvInputTextBoxProps> = (props: CvInputTextBoxProps) => {
  const [selectedColor, setColor] = useState<string>();
  const [isColorTextBoxFocused, setFocus] = useState<boolean>(false);

  const colorTextBoxFocused = () => setFocus(true);
  const colorTextBoxUnFocused = () => setFocus(false);

  const onColorTextBoxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
    setColor(e.target.value);
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
            <div className="cv_input_text_box__ball" style={{ backgroundColor: selectedColor }}></div>
            <input
              onFocus={colorTextBoxFocused}
              onBlur={colorTextBoxUnFocused}
              name={props.name}
              onChange={onColorTextBoxInputChange}
              className="cv_input_color_text_box"
              placeholder={props.placeholder}
            />
          </div>
        );
      case CV_INPUT_TEXT_BOX_TYPES.TEXT_AREA:
        return <div>TextArea</div>;
      default:
        return (
          <input
            name={props.name}
            onChange={props.onChange}
            className="cv_input_text_box"
            placeholder={props.placeholder}
          />
        );
    }
  };

  return (
    <div className="cv_input_text_box_wrapper">
      <label htmlFor={props.name} className="cv_input_color_text_box_label">
        {props.label}
      </label>
      {/* Here we can't use Tag format like <InputField /> since it makes textbox lose its focus */}
      {InputField()}
    </div>
  );
};

export default CvInputTextBox;
