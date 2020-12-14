import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import RcPageContainer from 'src/components/commons/rc-page-container';
import SuperAdminClientTable from './components/super-admin-client-table';
import SuperAdminAddClientDialog from './components/super-admin-client-dialog';

const SuperAdminClient = () => {
  const { t } = useTranslation();

  const [isAddClientDialogOpen, toggleAddClientDialog] = useState<boolean>(false);

  const closeSuppressionDialog = () => toggleAddClientDialog(false);

  const showSuppressionDialog = () => toggleAddClientDialog(true);

  return (
    <div className="content-wrap mt-8x">
      <RcPageContainer>
        <div className="page-heading">
          <h2>{t('super-admin-client:heading')}</h2>
          <div className="page-heading__right">
            <button
              onClick={showSuppressionDialog}
              className="btn btn--small btn--with-icon primary py-2x btn--light-purple">
              <MdAddCircle className="mr-2x" /> {t('super-admin-client:buttonLabel.addClient')}
            </button>
          </div>
        </div>
        <SuperAdminClientTable />
        <SuperAdminAddClientDialog isDialogOpen={isAddClientDialogOpen} closeDialog={closeSuppressionDialog} />
      </RcPageContainer>
    </div>
  );
};

export default SuperAdminClient;
