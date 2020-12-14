import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdClose, MdSearch } from 'react-icons/md';
import { Field, Form, Formik, FormikHelpers, FormikState } from 'formik';

interface StateProps {
  placeholder?: string;
  onSearchSubmit: (searchKey: string) => void;
  onCloseClicked?: () => void;
}

interface FormValues {
  searchKey: string;
}

const SecondarySearchBar = (props: StateProps) => {
  const { t } = useTranslation(['contact-search']);

  const initialFormValues = {
    searchKey: '',
  };

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        props.onSearchSubmit(formValues.searchKey);
        setSubmitting(false);
      }}>
      {({ isSubmitting, values }: FormikState<FormValues>) => (
        <Form>
          <div className="search-bar">
            <div className="input-wrap input-wrap--icon-left mb-0x mr-2x">
              <Field
                name="searchKey"
                placeholder={props.placeholder || t('contact-search:searchBar.defaultPlaceholder')}
                className="input input--xs search-filter-input"
              />
              <span className="form-icon icon-16">
                <MdSearch className="mr-2x" />
              </span>
              <button
                type="reset"
                onClick={props.onCloseClicked && props.onCloseClicked}
                className={`btn search-close btn--small ${
                  values.searchKey ? 'visibility__shown' : 'visibility__hidden'
                }`}>
                <MdClose />
              </button>
            </div>
            <button type="submit" className="btn btn--small btn--grey text-normal" disabled={isSubmitting}>
              {t('contact-search:searchBar.btnName')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SecondarySearchBar;
