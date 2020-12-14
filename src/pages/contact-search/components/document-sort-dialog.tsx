import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { RootState } from 'src/reducers';
import { SORT_FIELD_VALUES } from '../contact-search.constants';
import * as documentSearchActions from '../document-search.action';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import { DocumentSortOptions, DocumentSortFieldRequest, DocumentSortFieldValue } from '../contact-search.types';

interface StateProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
  searchKey: string;
  documentSortOptions: DocumentSortOptions;
  searchWithDocumentSortOption: (documentSortOptions: DocumentSortOptions) => void;
}

interface FormValues {
  sortBy: DocumentSortFieldValue | null;
}

const sortFieldObjects: Record<DocumentSortFieldValue, DocumentSortOptions> = {
  recentDocumentAsc: {
    sortField: DocumentSortFieldRequest.RECENT_DOCUMENTS,
    sortDirection: 'asc',
  },
  recentDocumentDsc: {
    sortField: DocumentSortFieldRequest.RECENT_DOCUMENTS,
    sortDirection: 'desc',
  },
  nameAsc: {
    sortField: DocumentSortFieldRequest.FILE_NAME,
    sortDirection: 'asc',
  },
  nameDsc: {
    sortField: DocumentSortFieldRequest.FILE_NAME,
    sortDirection: 'desc',
  },
};

const _getSortTypeFromSelectedValue = (selectedValue: DocumentSortFieldValue | null): DocumentSortOptions => {
  switch (selectedValue) {
    case SORT_FIELD_VALUES.recentDocumentAsc:
      return sortFieldObjects.recentDocumentAsc;

    case SORT_FIELD_VALUES.recentDocumentDsc:
      return sortFieldObjects.recentDocumentDsc;

    case SORT_FIELD_VALUES.nameAsc:
      return sortFieldObjects.nameAsc;

    case SORT_FIELD_VALUES.nameDsc:
      return sortFieldObjects.nameDsc;

    default:
      return {
        sortField: null,
        sortDirection: null,
      };
  }
};

const _getSelectedValueFromSortType = (sortFieldObject: DocumentSortOptions): DocumentSortFieldValue | null => {
  switch (sortFieldObject) {
    case sortFieldObjects.recentDocumentAsc:
      return 'recentDocumentAsc';

    case sortFieldObjects.recentDocumentDsc:
      return 'recentDocumentDsc';

    case sortFieldObjects.nameAsc:
      return 'nameAsc';

    case sortFieldObjects.nameDsc:
      return 'nameDsc';

    default:
      return null;
  }
};

const DocumentSortDialog = (props: StateProps) => {
  const { t } = useTranslation();

  const initialValues: FormValues = {
    sortBy: _getSelectedValueFromSortType(props.documentSortOptions),
  };

  return (
    <RightFloatingDialog
      isOpen={props.isDialogOpen}
      closeDialog={props.closeDialog}
      headerText={t('contactSearch.sortOptions.title')}>
      <Formik
        initialValues={initialValues}
        onSubmit={(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          const sortType = _getSortTypeFromSelectedValue(formValues.sortBy);

          props.searchWithDocumentSortOption(sortType);
          setSubmitting(false);
          props.closeDialog();
        }}>
        {({ isSubmitting }) => (
          <Form>
            <div role="group">
              <div className="input-wrap">
                <Field
                  type="radio"
                  id="recentDocumentDsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.recentDocumentDsc}
                  className="box-links__nodes"
                />
                <label htmlFor="recentDocumentDsc" className="input__label">
                  {t('contactSearch.documentSortOptions.recentDocumentDsc')}
                </label>
              </div>

              <div className="input-wrap">
                <Field
                  type="radio"
                  id="recentDocumentAsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.recentDocumentAsc}
                  className="box-links__nodes"
                />
                <label htmlFor="recentDocumentAsc" className="input__label">
                  {t('contactSearch.documentSortOptions.recentDocumentAsc')}
                </label>
              </div>

              <div className="input-wrap">
                <Field
                  type="radio"
                  id="nameAsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.nameAsc}
                  className="box-links__nodes"
                />
                <label htmlFor="nameAsc" className="input__label">
                  {t('contactSearch.documentSortOptions.nameAsc')}
                </label>
              </div>

              <div className="input-wrap">
                <Field
                  type="radio"
                  id="nameDsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.nameDsc}
                  className="box-links__nodes"
                />
                <label htmlFor="nameDsc" className="input__label">
                  {t('contactSearch.documentSortOptions.nameDsc')}
                </label>
              </div>
            </div>

            <div className="input-wrap">
              <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
                {t('contactSearch.documentSortOptions.submit')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  documentSortOptions: state.documentSearch.documentFilterOptions,
  searchKey: state.documentSearch.secondarySearchKey,
});

const mapDispatchToProps = (dispatch: Function) => ({
  searchWithDocumentSortOption: (documentSortOptions: DocumentSortOptions) =>
    dispatch(documentSearchActions.documentSearchWithSortOptions(documentSortOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentSortDialog);
