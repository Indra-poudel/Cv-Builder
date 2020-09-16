import React from 'react';

import './component-kit.css';
import CvInputHandler from 'src/components/commons/input-text-box';
import { CV_INPUT_TEXT_BOX_TYPES } from 'src/constants/cv-input-text-box';
import CvButtonHandler from 'src/components/commons/Buttons';
import { CV_BUTTON_TYPES } from 'src/constants/cv-buttons-box';

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
      <hr />

      <div className="btn-kits">
        <CvButtonHandler type={CV_BUTTON_TYPES.NORMAL} text={'Cancel'} />
        <CvButtonHandler type={CV_BUTTON_TYPES.NORMAL} text={'Delete'} color={CV_BUTTON_TYPES.RED} />
        <CvButtonHandler type={CV_BUTTON_TYPES.NORMAL} text={'Add Social Activity'} color={CV_BUTTON_TYPES.WHITE} />
        <CvButtonHandler type={CV_BUTTON_TYPES.ICON} text={'Add New'} color={CV_BUTTON_TYPES.WHITE} />
        <CvButtonHandler
          type={CV_BUTTON_TYPES.ICON}
          text={'Ask Me'}
          color={CV_BUTTON_TYPES.COLOR}
          iconType={CV_BUTTON_TYPES.Email}
        />
      </div>
    </>
  );
}

export default componentKit;
