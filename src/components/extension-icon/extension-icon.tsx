import React from 'react';
import { AiFillFile } from 'react-icons/ai';
import { GrDocumentText } from 'react-icons/gr';
import { MdPictureAsPdf } from 'react-icons/md';
import { FaFileCsv, FaFileImage } from 'react-icons/fa';
import { RiFileExcel2Line, RiFileWord2Line } from 'react-icons/ri';

import { EXTENSION_TYPES } from 'src/constants/constants';

interface StateProps {
  extension: string;
  [key: string]: any;
}

const ExtensionIcon = (props: StateProps) => {
  const { extension, ...otherProps } = props;

  switch (extension.toLowerCase()) {
    case EXTENSION_TYPES.CSV:
      return (
        <div className="color-tertiary-green-20">
          <FaFileCsv {...otherProps} />
        </div>
      );
    case EXTENSION_TYPES.PDF:
      return (
        <div className="color-tertiary-red-20">
          <MdPictureAsPdf {...otherProps} />
        </div>
      );
    case EXTENSION_TYPES.PNG:
    case EXTENSION_TYPES.JPEG:
      return (
        <div className="color-tertiary-blue-20">
          <FaFileImage {...otherProps} />
        </div>
      );
    case EXTENSION_TYPES.DOC:
    case EXTENSION_TYPES.DOCX:
      return (
        <div className="color-tertiary-blue-60">
          <RiFileWord2Line {...otherProps} />
        </div>
      );

    case EXTENSION_TYPES.XLS:
      return (
        <div className="color-tertiary-green-40">
          <RiFileExcel2Line {...otherProps} />
        </div>
      );

    case EXTENSION_TYPES.TXT:
      return (
        <div>
          <GrDocumentText {...otherProps} />
        </div>
      );

    default:
      return (
        <div className="color-grey-50">
          <AiFillFile {...otherProps} />
        </div>
      );
  }
};

export default ExtensionIcon;
