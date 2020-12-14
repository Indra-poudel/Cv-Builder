import React from 'react';
import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/reducers';
import { loadingWhite } from 'src/assets/images';
import { isObjectEmpty } from 'src/utils/object';
import notification from 'src/utils/notification';
import { ONLY_TEXT_REGEX } from 'src/constants/regex';
import { CLIENT_INFO_KEY } from '../client-details.constant';
import * as clientDetailAction from '../client-details.action';
import RcButton from 'src/components/commons/rc-button/rc-button';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import { ClientInfo } from 'src/pages/super-admin-client/components/types';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { IClientDetail } from 'src/entities/super-admin-client-details/types';

interface ClientDialogState {
  isDialogOpen: boolean;
  closeDialog: () => void;
  isUpdatingDetail: boolean;
  clientDetails: IClientDetail;
  isUpdatingDetailFail: boolean;
  updateClient: (clientInfo: ClientInfo) => Promise<void>;
}

interface ClientInputProps {
  label: string;
  name: string;
  error?: string;
  isChanged: boolean | undefined;
}

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

  const { firstName, lastName, email, client } = props.clientDetails;

  const initialValues: ClientInfo = {
    organizationName: client,
    organizationAdminFirstName: firstName,
    organizationAdminLastName: lastName,
    organizationAdminEmail: email,
  };
  const handleOnSubmit = (formValues: ClientInfo) => {
    props.updateClient(formValues).then(() => {
      notification(<RcSuccessToast msg={t('clientDialog.toast.updateSuccess')} />);
      closeDialog();
    });
  };

  const handleCloseDialog = () => {
    if (props.isUpdatingDetail) return;
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
    const buttonLabel = props.isUpdatingDetail
      ? t('clientDialog.buttonLabel.updating')
      : t('clientDialog.buttonLabel.update');

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
              className="btn btn--secondary btn--block"
              disabled={props.isUpdatingDetail || !isObjectEmpty(errors)}
              label={buttonLabel}>
              {props.isUpdatingDetail && <img src={loadingWhite} alt="Recovvo" width="20" />}
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
      headerText={t('clientDialog.updateTitle')}>
      {ClientInfo()}
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    clientDetails: state.clientDetail.clientDetail,
    isUpdatingDetail: state.clientDetail.isUpdatingDetail,
    isUpdatingDetailFail: state.clientDetail.isUpdatingDetailFail,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  updateClient: (clientInfo: ClientInfo) => dispatch(clientDetailAction.updateClientDetails(clientInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactProfile);
