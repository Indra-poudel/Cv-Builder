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
        <CvButtonHandler type={CV_BUTTON_TYPES.PRIMARY} label={'Cancel'} onClick={(e) => console.log(e)} />
        <CvButtonHandler type={CV_BUTTON_TYPES.WARNING} label={'Delete'} onClick={(e) => console.log(e)} />
        <CvButtonHandler
          type={CV_BUTTON_TYPES.SECONDARY}
          label={'Add Social Activity'}
          onClick={(e) => console.log(e)}
        />
        <CvButtonHandler type={CV_BUTTON_TYPES.ADD_NEW} label={'Add New'} onClick={(e) => console.log(e)} />
        <CvButtonHandler type={CV_BUTTON_TYPES.IMPORT} label={'Export'} onClick={(e) => console.log(e)} />
        <CvButtonHandler type={CV_BUTTON_TYPES.EXPORT} label={'Export'} onClick={(e) => console.log(e)} />
        <CvButtonHandler type={CV_BUTTON_TYPES.BUY_COFFEE} label={'Buy me a Coffee!'} onClick={(e) => console.log(e)} />
        <CvButtonHandler type={CV_BUTTON_TYPES.BUGS} label={'Raise an Issue'} onClick={(e) => console.log(e)} />
        <CvButtonHandler type={CV_BUTTON_TYPES.REACH_ME} label={'cv-builder.com'} onClick={(e) => console.log(e)} />
        <CvButtonHandler type={CV_BUTTON_TYPES.GITHUB} label={'GitHub Repo'} onClick={(e) => console.log(e)} />
      </div>
    </>
  );
}

export default componentKit;
