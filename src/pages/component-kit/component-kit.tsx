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
          onChange={(e) => console.log(e.target.value)}
          type={CV_INPUT_TEXT_BOX_TYPES.COLOR}
        />
        <CvInputHandler
          onChange={(e) => console.log(e.target.value)}
          label={'normal textbox'}
          type={CV_INPUT_TEXT_BOX_TYPES.NORMAL}
        />
      </div>
    </>
  );
}

export default componentKit;
