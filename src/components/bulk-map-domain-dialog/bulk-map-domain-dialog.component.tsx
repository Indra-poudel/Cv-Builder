import React from 'react';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import ToolTip from '../tool-tip';
import UploadCsv from 'src/components/upload-csv';
import * as endpoints from 'src/constants/endpoints';
import RcButton from 'src/components/commons/rc-button/rc-button';
import { BULK_UPLOAD_CLIENT_DOMAIN_TEMPLATE } from 'src/constants/external-link';
import RcCsvDownload from 'src/components/commons/rc-csv-download/rc-csv-download';

interface BulkMapDomainIState {
  onToggleModal: () => void;
  onUploadComplete: () => void;
}

const BulkMapDomainUploadDialog: React.FC<BulkMapDomainIState> = (props: BulkMapDomainIState) => {
  const { onToggleModal, onUploadComplete } = props;

  const { t } = useTranslation();

  return (
    <div className="modal modal--auto">
      <div className="modal__header modal__header--border">
        <h3>{t('bulkUpload.label')}</h3>
        <span className="link-cursor modal__close-icon">
          <ToolTip isAlwaysVisible description={t('tool-tip:close')}>
            <MdClose onClick={onToggleModal} />
          </ToolTip>
        </span>
      </div>
      <div className="modal__body">
        <div className="modal-block modal-block--sm">
          <h2 className="modal-block__title mt-10x mb-2x">{t('bulkUpload.instruction1')}</h2>
          <UploadCsv
            confirmTitle={t('upload-csv:mapUser.confirmationDialog.title')}
            confirmDescription={(fileName) => t('upload-csv:mapUser.confirmationDialog.description', { fileName })}
            endpoint={endpoints.BULK_DOMAIN_UPLOAD}
            onUpload={onUploadComplete}
            isFullWidth={false}
          />
          <p className="fs-small mt-2x">
            {t('bulkUpload.downloadInstruction')}
            <RcCsvDownload
              label={t('addUserDialog.downloadLabel')}
              link={BULK_UPLOAD_CLIENT_DOMAIN_TEMPLATE}
              className="text-bold"
            />
          </p>
        </div>
        <div className="modal-block modal-block--sm mt-15x">
          <p className="text-light-sm">{t('bulkUpload.footer')}</p>
        </div>
      </div>
      <div className="modal__footer justify-content-center">
        <RcButton className="btn btn--grey mr-2x" onClick={onToggleModal} label={t('bulkUpload.cancelBtnLabel')} />
      </div>
    </div>
  );
};

export default BulkMapDomainUploadDialog;
