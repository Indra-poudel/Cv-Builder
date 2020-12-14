import debounce from 'lodash.debounce';
import { MdClose, MdSearch } from 'react-icons/md';
import React, { useCallback, useEffect } from 'react';
import { Field, Form, Formik, FormikState, useFormikContext } from 'formik';

interface StateProps {
  placeholder?: string;
  handleSearchSubmit: (searchKey: string) => void;
  className?: string;
}

interface FormValues {
  searchKey: string;
}

const initialFormValues = {
  searchKey: '',
};

// Reference for debounced auto submit on Formik:
// https://github.com/formium/formik/blob/master/examples/DebouncedAutoSave.js
const AutoSubmitSearch = () => {
  const formikContext = useFormikContext<FormValues>();
  const debounceMs = 500;

  const searchKey = formikContext.values.searchKey;

  const debouncedSubmit = useCallback(
    debounce(() => formikContext.submitForm(), debounceMs),
    [formikContext.submitForm]
  );

  useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, searchKey]);

  return null;
};

const SearchBar = (props: StateProps) => {
  const [isInitialLoad, toggleInitialLoad] = React.useState<boolean>(true);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(formValues: FormValues) => {
        // Prevent auto-submit search call when SearchBar component is first mounted
        // FIXME Find better alternative
        if (isInitialLoad) {
          toggleInitialLoad(false);
          return;
        }

        props.handleSearchSubmit(formValues.searchKey);
      }}>
      {({ values }: FormikState<FormValues>) => (
        <Form className={props.className}>
          <AutoSubmitSearch />
          <div className="search-bar">
            <div className="input-wrap input-wrap--icon-left mb-0x">
              <Field name="searchKey" placeholder="Search..." className="input" />
              <span className="form-icon icon-24">
                <MdSearch className="mr-2x" />
              </span>
              <button
                type="reset"
                className={`btn search-close ${values.searchKey ? 'visibility__shown' : 'visibility__hidden'}`}>
                <MdClose className="icon-24" />
              </button>
            </div>
            {/*To trigger onSubmit when pressing enter*/}
            <button type="submit" className="display__none" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
