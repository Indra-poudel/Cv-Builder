import React from 'react';
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

const SearchBar = (props: StateProps) => {
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
              <Field name="searchKey" placeholder={props.placeholder || 'Search...'} className="input" />
              <span className="form-icon icon-24">
                <MdSearch className="mr-2x" />
              </span>
              <button
                type="reset"
                onClick={props.onCloseClicked && props.onCloseClicked}
                className={`btn search-close ${values.searchKey ? 'visibility__shown' : 'visibility__hidden'}`}>
                <MdClose className="icon-24" />
              </button>
            </div>
            <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
              {'Search'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
