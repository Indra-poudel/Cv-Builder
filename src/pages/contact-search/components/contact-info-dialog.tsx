import * as Yup from 'yup';
import { TFunction } from 'i18next';
import { connect } from 'react-redux';
import { FaPen } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { RootState } from 'src/reducers';
import ToolTip from 'src/components/tool-tip';
import * as contactConstant from './constant';
import { loadingWhite } from 'src/assets/images';
import { isObjectEmpty } from 'src/utils/object';
import notification from 'src/utils/notification';
import LoadingIndicator from 'src/components/loading-indicator';
import RcButton from 'src/components/commons/rc-button/rc-button';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import { ONLY_TEXT_REGEX, ONLY_PHONE_REGEX } from 'src/constants/regex';
import RcSuccessToast from 'src/components/commons/rc-toast/rc-success-toast';
import { UpdateContactInfo, ContactInfo } from 'src/entities/contact-info/types';
import * as contactInfoAction from 'src/pages/contact-search/contact-info.action';
import * as contactSearchActions from 'src/pages/contact-search/contact-search.action';

interface ClientDomainDialogState {
  contactId: string;
  searchKey: string;
  isFetching: boolean;
  isUpdating: boolean;
  isUpdateFail: boolean;
  isDialogOpen: boolean;
  isFetchingFail: boolean;
  contactInfo: ContactInfo;
  searchContacts: (searchKey: string) => void;
  fetchContactInfo: (id: string) => Promise<void>;
  updateContactInfo: (id: string, contactInfo: UpdateContactInfo) => Promise<void>;
  toggleContactDialog: () => void;
}

interface ContactInputProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
}

const validationSchema = (translate: TFunction) =>
  Yup.object().shape({
    firstName: Yup.string().nullable().matches(ONLY_TEXT_REGEX, translate('translation:validation.isName')),
    lastName: Yup.string().nullable().matches(ONLY_TEXT_REGEX, translate('translation:validation.isName')),
    workPhoneNumber: Yup.string()
      .nullable()
      .matches(ONLY_PHONE_REGEX, translate('translation:validation.isPhoneNumber')),
    cellPhoneNumber: Yup.string()
      .nullable()
      .matches(ONLY_PHONE_REGEX, translate('translation:validation.isPhoneNumber')),
  });

const ContactProfile = (props: ClientDomainDialogState) => {
  useEffect(() => {
    props.fetchContactInfo(props.contactId);
  }, [props.contactId]);

  const { isDialogOpen, contactInfo, searchKey } = props;

  const [isEditMode, setEditMode] = useState<boolean>(false);

  const { t } = useTranslation(['contact-search', 'translation']);

  const initialValues: UpdateContactInfo = {
    firstName: contactInfo.firstName,
    lastName: contactInfo.lastName,
    position: contactInfo.position,
    companyName: contactInfo.contactOrganizationName,
    workPhoneNumber: contactInfo.workPhoneNumber,
    cellPhoneNumber: contactInfo.cellPhoneNumber,
    address: contactInfo.address,
  };

  const handleOnSubmit = (formValues: UpdateContactInfo, { setSubmitting }: FormikHelpers<UpdateContactInfo>) => {
    setSubmitting(false);
    props
      .updateContactInfo(contactInfo.id, formValues)
      .then(() => setEditMode(false))
      .then(() => props.fetchContactInfo(contactInfo.id))
      .then(() => props.searchContacts(searchKey));
  };

  const handleDialogClose = () => {
    props.toggleContactDialog();
    setEditMode(false);
  };

  const ContactInfoRow = (props: { label: string; value: string; type?: string }) => {
    switch (props.type) {
      case contactConstant.RowTypes.phone:
        return (
          <div className="row mb-8x text-regular">
            <label className="col-4 text-light">{props.label}</label>
            {props.value ? (
              <a href={`tel:${props.value}`} className="col-8 link-primary">
                {props.value}
              </a>
            ) : (
              <span className="col-8 text-regular">-</span>
            )}
          </div>
        );
      case contactConstant.RowTypes.email:
        return (
          <div className="row mb-8x text-regular">
            <label className="col-4 text-light">{props.label}</label>
            {props.value ? (
              <a href={`mailto:${props.value}`} className="col-8 text-regular email">
                {props.value}
              </a>
            ) : (
              <span className="col-8 text-regular email">-</span>
            )}
          </div>
        );
      case contactConstant.RowTypes.address:
        return (
          <div className="row mb-8x text-regular pre-line">
            <label className="col-4 text-light">{props.label}</label>
            <span className="col-8 text-regular">{props.value || '-'}</span>
          </div>
        );
      default:
        return (
          <div className="row mb-8x text-regular">
            <label className="col-4 text-light">{props.label}</label>
            <span className="col-8 text-regular text-normal">{props.value || '-'}</span>
          </div>
        );
    }
  };

  const ContactInput = (props: ContactInputProps) => {
    switch (props.type) {
      case contactConstant.FieldType.textArea:
        return (
          <div className="input-wrap">
            <label htmlFor={props.name} className="input__label">
              {props.label}
            </label>
            <Field as={props.type} name={props.name} className="input" />
            <p className="input__error">{props.error}</p>
          </div>
        );
      default:
        return (
          <div className="input-wrap">
            <label htmlFor={props.name} className="input__label">
              {props.label}
            </label>
            <Field name={props.name} className="input" />
            <p className="input__error">{props.error}</p>
          </div>
        );
    }
  };

  const contactInfoRowBuilder = () => {
    return {
      [contactConstant.ClientContactDetail.company]: {
        name: contactConstant.ClientContactDetail.company,
        label: t('contact-search:contactInfo.company'),
        value: contactInfo.contactOrganizationName,
        type: contactConstant.RowTypes.label,
      },
      [contactConstant.ClientContactDetail.email]: {
        name: contactConstant.ClientContactDetail.email,
        label: t('contact-search:contactInfo.email'),
        value: contactInfo.email,
        type: contactConstant.RowTypes.email,
      },
      [contactConstant.ClientContactDetail.cellPhone]: {
        name: contactConstant.ClientContactDetail.company,
        label: t('contact-search:contactInfo.cellPhone'),
        value: contactInfo.cellPhoneNumber,
        type: contactConstant.RowTypes.phone,
      },
      [contactConstant.ClientContactDetail.workPhone]: {
        name: contactConstant.ClientContactDetail.workPhone,
        label: t('contact-search:contactInfo.workPhone'),
        value: contactInfo.workPhoneNumber,
        type: contactConstant.RowTypes.phone,
      },
      [contactConstant.ClientContactDetail.address]: {
        name: contactConstant.ClientContactDetail.address,
        label: t('contact-search:contactInfo.address'),
        value: contactInfo.address,
        type: contactConstant.RowTypes.address,
      },
    };
  };

  const copyToClipboard = () => {
    const fullName = [contactInfo.firstName, contactInfo.lastName].filter(Boolean).join(' ') + '\n';
    const Position = contactInfo.position || '' + '\n';

    let contactInformation =
      t('contact-search:contactInfoUpdate.Name') + fullName + t('contact-search:contactInfoUpdate.title') + Position;

    contactInfoRowGroup.map(
      (contactInfo) =>
        (contactInformation = contactInformation.concat(
          `${contactInfo.label + ':' + (contactInfo.value || '') + '\n'}`
        ))
    );
    navigator.clipboard.writeText(contactInformation).then(() => {
      notification(<RcSuccessToast msg={t('contact-search:contactInfo.copied')} />);
    });
  };

  const contactInfoRowMap = contactInfoRowBuilder();
  const contactInfoRowGroup = contactConstant.ContactInfoKeys.map((key: string) => contactInfoRowMap[key]);

  const ContactDetails = () => {
    if (props.isFetching) return <LoadingIndicator />;

    if (props.isFetchingFail) return <div>{t('contact-search:errorMessage')}</div>;

    const fullName = [contactInfo?.firstName, contactInfo?.lastName].filter(Boolean).join(' ');

    return (
      <div className="side-list">
        <div className="side-item">
          <div className="contact__title text-center mb-10x">
            <h1 className="sidebar-floating__title mb-1x pl-7x">
              <span>
                {fullName || t('contact-search:contactInfo.noName')}
                <ToolTip isAlwaysVisible description={t('tool-tip:editInformation')}>
                  <div className="contact__edit" onClick={() => setEditMode(true)}>
                    <FaPen />
                  </div>
                </ToolTip>
              </span>
            </h1>
            <p className="sidebar-floating__subtitle">
              {contactInfo.position || t('contact-search:contactInfo.noTitle')}
            </p>
          </div>
          <div className="contact__detail pt-10x mx-3x">
            <div
              onClick={copyToClipboard}
              className=" cursor-hand copy__contact d-flex align-items-center mb-6x justify-content-end">
              <FiCopy size={14} />
              <span className="text-small ml-2x">{t('contact-search:contactInfo.copyInfo')}</span>
            </div>
            {contactInfoRowGroup.map((contactInfo) => (
              <ContactInfoRow
                key={contactInfo.name}
                label={contactInfo.label}
                value={contactInfo.value}
                type={contactInfo.type}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const contactUpdateFieldBuilder = () => {
    return {
      [contactConstant.ContactUpdateField.firstName]: {
        name: contactConstant.ContactUpdateField.firstName,
        label: t('contact-search:contactInfoUpdate.firstName'),
        type: contactConstant.FieldType.normal,
      },
      [contactConstant.ContactUpdateField.lastName]: {
        name: contactConstant.ContactUpdateField.lastName,
        label: t('contact-search:contactInfoUpdate.lastName'),
        value: contactInfo.email,
        type: contactConstant.FieldType.normal,
      },
      [contactConstant.ContactUpdateField.position]: {
        name: contactConstant.ContactUpdateField.position,
        label: t('contact-search:contactInfoUpdate.position'),
        value: contactInfo.email,
        type: contactConstant.FieldType.normal,
      },
      [contactConstant.ContactUpdateField.cellPhoneNumber]: {
        name: contactConstant.ContactUpdateField.cellPhoneNumber,
        label: t('contact-search:contactInfo.cellPhone'),
        value: contactInfo.cellPhoneNumber,
        type: contactConstant.FieldType.normal,
      },
      [contactConstant.ContactUpdateField.workPhoneNumber]: {
        name: contactConstant.ContactUpdateField.workPhoneNumber,
        label: t('contact-search:contactInfo.workPhone'),
        value: contactInfo.workPhoneNumber,
        type: contactConstant.FieldType.normal,
      },
      [contactConstant.ContactUpdateField.address]: {
        name: contactConstant.ContactUpdateField.address,
        label: t('contact-search:contactInfo.address'),
        value: contactInfo.address,
        type: contactConstant.FieldType.textArea,
      },
    };
  };

  const contactUpdateFieldMap = contactUpdateFieldBuilder();
  const contactUpdateFiledGroup = contactConstant.ContactUpdateInfoKeys.map(
    (key: string) => contactUpdateFieldMap[key]
  );

  const UpdateContactInfo = () => {
    const buttonLabel = props.isUpdating
      ? t('contact-search:contactInfoUpdate.updating')
      : t('contact-search:contactInfoUpdate.saveButton');

    return (
      <Formik validationSchema={() => validationSchema(t)} initialValues={initialValues} onSubmit={handleOnSubmit}>
        {({ errors }) => (
          <Form>
            {contactUpdateFiledGroup.map((contactFiled) => (
              <ContactInput
                key={contactFiled.name}
                name={contactFiled.name}
                label={contactFiled.label}
                type={contactFiled.type}
                error={errors[contactFiled.name]}
              />
            ))}

            <div className="row">
              <div className="col-6">
                <RcButton
                  onClick={() => setEditMode(false)}
                  label={t('contact-search:contactInfoUpdate.cancelButton')}
                  className="btn btn--outlined-grey btn--block"
                />
              </div>
              <div className="col-6">
                <RcButton
                  type="submit"
                  className="btn btn--secondary btn--block"
                  disabled={props.isUpdating || !isObjectEmpty(errors)}
                  label={buttonLabel}>
                  {props.isUpdating && <img src={loadingWhite} alt="Recovvo" width="20" />}
                </RcButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <RightFloatingDialog
      isOpen={isDialogOpen}
      closeDialog={handleDialogClose}
      headerText={isEditMode ? t('contact-search:contactInfoUpdate.updateInformation') : ''}>
      {isEditMode ? <UpdateContactInfo /> : <ContactDetails />}
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isFetching: state.contact.contactInfo.isLoading,
    isFetchingFail: state.contact.contactInfo.isFail,
    isUpdating: state.contact.contactInfoUpdate.isUpdating,
    isUpdateFail: state.contact.contactInfoUpdate.isUpdateFail,
    contactInfo: state.contact.contactInfo.contactInfo,
    isDialogOpen: state.contact.contactInfo.isDialogOpen,
    contactId: state.contact.contactInfo.contactInfo.id,
    searchKey: state.contactSearch.searchKey,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchContactInfo: (id: string) => dispatch(contactInfoAction.getContactInfo(id)),
  searchContacts: (searchKey: string) => dispatch(contactSearchActions.searchContacts(searchKey)),
  updateContactInfo: (id: string, contactInfo: UpdateContactInfo) =>
    dispatch(contactInfoAction.updateContactInfo(id, contactInfo)),
  toggleContactDialog: () => dispatch(contactInfoAction.toggleContactInfoDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactProfile);
