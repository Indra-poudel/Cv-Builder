import React from 'react';

import './component-kit.css';
import { BiCalendar } from 'react-icons/bi';
import { MdFileUpload } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CvInputHandler from 'src/components/commons/input-text-box';
import { IMenuItems } from 'src/components/commons/input-text-box/types';
import { CV_INPUT_TEXT_BOX_TYPES } from 'src/constants/cv-input-text-box';

function componentKit() {
  const menu = ['edit', 'delete'];
  const getMenuItems = (): Array<IMenuItems> => {
    return menu.map(
      (item, index): IMenuItems => ({
        label: item,
        value: item,
        id: index,
        icon: <BiCalendar />,
      })
    );
  };

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
          iconRenderer={<BiCalendar />}
          type={CV_INPUT_TEXT_BOX_TYPES.DATE_PICKER}
        />
        <CvInputHandler
          onChange={(e) => console.log(e)}
          iconRenderer={<MdFileUpload />}
          type={CV_INPUT_TEXT_BOX_TYPES.FILE_UPLOADER}
        />
        <CvInputHandler
          onChange={(e) => console.log(e)}
          menuXPosition="7.5%"
          menuYPosition="53%"
          iconRenderer={<BsThreeDotsVertical />}
          menuItems={getMenuItems()}
          type={CV_INPUT_TEXT_BOX_TYPES.MENU}
        />
      </div>
    </>
  );
}

export default componentKit;
