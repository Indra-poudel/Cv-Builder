import React from 'react';
import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { ClientInfo } from './types';
import { RootState } from 'src/reducers';
import { loadingWhite } from 'src/assets/images';
import { isObjectEmpty } from 'src/utils/object';
import notification from 'src/utils/notification';
import { ONLY_TEXT_REGEX } from 'src/constants/regex';
import { httpConstants } from 'src/constants/http-constants';
import * as clientAddAction from '../super-admin-client.action';
import RcButton from 'src/components/commons/rc-button/rc-button';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';

interface ClientDialogState {
  isDialogOpen: boolean;
  isSendingInvitation: boolean;
  isSendingInvitationFail: boolean;
  closeDialog: () => void;
  addClient: (clientInfo: ClientInfo) => Promise<void>;
  fetchClient: () => Promise<void>;
}

interface ClientInputProps {
  label: string;
  name: string;
  error?: string;
  isChanged: boolean | undefined;
}

const CLIENT_INFO_KEY = {
  ORGANIZATION_NAME: 'organizationName',
  ORGANIZATION_ADMIN_FIRST_NAME: 'organizationAdminFirstName',
  ORGANIZATION_ADMIN_LAST_NAME: 'organizationAdminLastName',
  ORGANIZATION_ADMIN_EMAIL: 'organizationAdminEmail',
};

const validationSchema = (translate: TFunction) =>
  Yup.object().shape({
    [CLIENT_INFO_KEY.ORGANIZATION_NAME]: Yup.string().required(translate('clientDialog.errorLabel.required')),
    [CLIENT_INFO_KEY.ORGANIZATION_ADMIN_FIRST_NAME]: Yup.string()
      .required(translate('clientDialog.errorLabel.required'))
      .matches(ONLY_TEXT_REGEX, translate('clientDialog.errorLabel.firstName')),
    [CLIENT_INFO_KEY.ORGANIZATION_ADMIN_LAST_NAME]: Yup.string()
      .required(translate('clientDialog.errorLabel.required'))
      .matches(ONLY_TEXT_REGEX, translate('clientDialog.errorLabel.lastName')),
    [CLIENT_INFO_KEY.ORGANIZATION_ADMIN_EMAIL]: Yup.string()
      .required('Required')
      .email(translate('clientDialog.errorLabel.email')),
  });

const ContactProfile = (props: ClientDialogState) => {
  const { isDialogOpen, closeDialog } = props;

  const { t } = useTranslation('super-admin-client');

  const initialValues: ClientInfo = {
    organizationName: '',
    organizationAdminFirstName: '',
    organizationAdminLastName: '',
    organizationAdminEmail: '',
  };

  const handleOnSubmit = (formValues: ClientInfo) => {
    props
      .addClient(formValues)
      .then(() => {
        notification(<RcSuccessToast msg={t('clientDialog.toast.inviteSuccess')} />);
        closeDialog();
        props.fetchClient();
      })
      .catch((error) => {
        if (error.code !== httpConstants.statusCode.BAD_REQUEST) {
          closeDialog();
        }
      });
  };

  const handleCloseDialog = () => {
    if (props.isSendingInvitation) return;
    closeDialog();
  };

  const ClientInput = (props: ClientInputProps) => (
    <div className="input-wrap">
      <label htmlFor={props.name} className="input__label">
        {props.label}
      </label>
      <Field name={props.name} className="input" />
      {props.isChanged && props.error && <p className="input__error">{props.error}</p>}
    </div>
  );

  const clientFieldBuilder = () => {
    return [
      {
        name: CLIENT_INFO_KEY.ORGANIZATION_NAME,
        label: t('clientDialog.formLabel.companyName'),
      },
      {
        name: CLIENT_INFO_KEY.ORGANIZATION_ADMIN_FIRST_NAME,
        label: t('clientDialog.formLabel.adminFirstName'),
      },
      {
        name: CLIENT_INFO_KEY.ORGANIZATION_ADMIN_LAST_NAME,
        label: t('clientDialog.formLabel.adminLastName'),
      },
      {
        name: CLIENT_INFO_KEY.ORGANIZATION_ADMIN_EMAIL,
        label: t('clientDialog.formLabel.adminEmail'),
      },
    ];
  };

  const ClientInfo = () => {
    const buttonLabel = props.isSendingInvitation
      ? t('clientDialog.buttonLabel.sendingInvitation')
      : t('clientDialog.buttonLabel.sendInvitation');

    return (
      <Formik validationSchema={() => validationSchema(t)} initialValues={initialValues} onSubmit={handleOnSubmit}>
        {({ errors, touched }) => (
          <Form>
            {clientFieldBuilder().map((clientField) => (
              <ClientInput
                key={clientField.name}
                name={clientField.name}
                label={clientField.label}
                isChanged={touched[clientField.name]}
                error={errors[clientField.name]}
              />
            ))}

            <RcButton
              type="submit"
              className="btn btn--primary btn--block mt-7x"
              disabled={props.isSendingInvitation || !isObjectEmpty(errors)}
              label={buttonLabel}>
              {props.isSendingInvitation && <img src={loadingWhite} alt="Recovvo" width="20" />}
            </RcButton>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <RightFloatingDialog
      isOpen={isDialogOpen}
      closeDialog={handleCloseDialog}
      headerText={t('clientDialog.title')}
      description={t('clientDialog.description')}>
      {ClientInfo()}
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isSendingInvitation: state.superAdminClient.addClient.isClientAdding,
    isSendingInvitationFail: state.superAdminClient.addClient.isClientAddFail,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  addClient: (clientInfo: ClientInfo) => dispatch(clientAddAction.addClient(clientInfo)),
  fetchClient: () => dispatch(clientAddAction.fetchSuperAdminClient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactProfile);
