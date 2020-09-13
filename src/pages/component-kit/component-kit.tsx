import React from 'react';

import './component-kit.css';
import CvInputHandler from 'src/components/commons/input-text-box';
import { CV_INPUT_TEXT_BOX_TYPES } from 'src/constants/cv-input-text-box';

function componentKit() {
  return (
    <>
      <div className="component_kit_wrapper">
        <CvInputHandler
          label={'color textbox'}
          onChange={(e) => console.log(e)}
          type={CV_INPUT_TEXT_BOX_TYPES.COLOR}
          placeholder={'ex: #ccc or red'}
        />
        <CvInputHandler
          onChange={(e) => console.log(e)}
          label={'normal textbox'}
          type={CV_INPUT_TEXT_BOX_TYPES.NORMAL}
          isRequired
        />
        <CvInputHandler
          onChange={(e) => console.log(e)}
          label={'Date picker textbox'}
          type={CV_INPUT_TEXT_BOX_TYPES.DATE_PICKER}
        />
      </div>
    </>
  );
}

export default componentKit;
