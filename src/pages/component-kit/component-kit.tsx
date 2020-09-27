import React from 'react';
import { FaBug, FaCoffee, FaExternalLinkAlt, FaFileExport, FaFileImport, FaPlus } from 'react-icons/fa';

import './component-kit.css';
import CvButtonHandler from 'src/components/commons/Buttons';
import { CV_BUTTON_TYPES } from 'src/constants/cv-buttons-box';
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
      <hr />

      <div className="btn-kits">
        <CvButtonHandler type={CV_BUTTON_TYPES.PRIMARY} label={'Cancel'} onClick={() => console.log('Click')} />
        <CvButtonHandler type={CV_BUTTON_TYPES.WARNING} label={'Delete'} onClick={() => console.log('Click')} />

        <CvButtonHandler
          type={CV_BUTTON_TYPES.SECONDARY}
          icon={<FaBug />}
          label={'GitHub Repo'}
          onClick={() => console.log('Click')}
        />
      </div>
    </>
  );
}

export default componentKit;
