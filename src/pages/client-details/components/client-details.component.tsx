import React, { useState } from 'react';

import ClientInfo from './client-info';
import UpadateClientDetailDialog from './update-client-details-dialog';

const ClientDetailsUi = (props: any) => {
  const [isEditClientDialogOpen, toggleEditClientDialog] = useState<boolean>(false);

  const closeEditClientDialog = () => toggleEditClientDialog(false);

  const showEditClientDialog = () => toggleEditClientDialog(true);

  return (
    <>
      <ClientInfo showEditClientDialog={showEditClientDialog} />

      {isEditClientDialogOpen && (
        <UpadateClientDetailDialog closeDialog={closeEditClientDialog} isDialogOpen={isEditClientDialogOpen} />
      )}
    </>
  );
};

export default ClientDetailsUi;
