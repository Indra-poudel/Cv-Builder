import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { RootState } from 'src/reducers';
import { SORT_FIELD_VALUES } from '../contact-search.constants';
import * as contactSearchActions from '../contact-search.action';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import { ContactFilterOptions, SortFieldObject, SortFieldRequest } from '../contact-search.types';

interface StateProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
  contactFilterOptions: ContactFilterOptions;
  searchWithFilterOptions: (contactFilterOptions: ContactFilterOptions) => void;
}

interface FormValues {
  sortBy: SortFieldValue | null;
}

type SortFieldValue =
  | 'recentlyContactedAsc'
  | 'recentlyContactedDsc'
  | 'outboundContactsAsc'
  | 'outboundContactsDsc'
  | 'repliesAsc'
  | 'repliesDsc'
  | 'nameAsc'
  | 'nameDsc';

const sortFieldObjects: Record<SortFieldValue, SortFieldObject> = {
  recentlyContactedAsc: {
    sortField: SortFieldRequest.RECENTLY_CONTACTED,
    sortDirection: 'asc',
  },
  recentlyContactedDsc: {
    sortField: SortFieldRequest.RECENTLY_CONTACTED,
    sortDirection: 'desc',
  },
  outboundContactsAsc: {
    sortField: SortFieldRequest.OUTBOUND_CONTACTS,
    sortDirection: 'asc',
  },
  outboundContactsDsc: {
    sortField: SortFieldRequest.OUTBOUND_CONTACTS,
    sortDirection: 'desc',
  },
  repliesAsc: {
    sortField: SortFieldRequest.CLIENT_REPLIES,
    sortDirection: 'asc',
  },
  repliesDsc: {
    sortField: SortFieldRequest.CLIENT_REPLIES,
    sortDirection: 'desc',
  },
  nameAsc: {
    sortField: SortFieldRequest.CLIENT_NAME,
    sortDirection: 'asc',
  },
  nameDsc: {
    sortField: SortFieldRequest.CLIENT_NAME,
    sortDirection: 'desc',
  },
};

const _getSortTypeFromSelectedValue = (selectedValue: SortFieldValue | null): SortFieldObject => {
  switch (selectedValue) {
    case 'recentlyContactedAsc':
      return sortFieldObjects.recentlyContactedAsc;

    case 'recentlyContactedDsc':
      return sortFieldObjects.recentlyContactedDsc;

    case 'outboundContactsAsc':
      return sortFieldObjects.outboundContactsAsc;

    case 'outboundContactsDsc':
      return sortFieldObjects.outboundContactsDsc;

    case 'repliesAsc':
      return sortFieldObjects.repliesAsc;

    case 'repliesDsc':
      return sortFieldObjects.repliesDsc;

    case 'nameAsc':
      return sortFieldObjects.nameAsc;

    case 'nameDsc':
      return sortFieldObjects.nameDsc;

    default:
      return {
        sortField: null,
        sortDirection: null,
      };
  }
};

const _getSelectedValueFromSortType = (sortFieldObject: SortFieldObject): SortFieldValue | null => {
  switch (sortFieldObject) {
    case sortFieldObjects.recentlyContactedAsc:
      return 'recentlyContactedAsc';

    case sortFieldObjects.recentlyContactedDsc:
      return 'recentlyContactedDsc';

    case sortFieldObjects.outboundContactsAsc:
      return 'outboundContactsAsc';

    case sortFieldObjects.outboundContactsDsc:
      return 'outboundContactsDsc';

    case sortFieldObjects.repliesAsc:
      return 'repliesAsc';

    case sortFieldObjects.repliesDsc:
      return 'repliesDsc';

    case sortFieldObjects.nameAsc:
      return 'nameAsc';

    case sortFieldObjects.nameDsc:
      return 'nameDsc';

    default:
      return null;
  }
};

const ContactSortDialog = (props: StateProps) => {
  const { t } = useTranslation();

  const initialValues: FormValues = {
    sortBy: _getSelectedValueFromSortType(props.contactFilterOptions.sortOption),
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

          props.searchWithFilterOptions({
            ...props.contactFilterOptions,
            sortOption: sortType,
          });

          setSubmitting(false);
          props.closeDialog();
        }}>
        {({ isSubmitting }) => (
          <Form>
            <div role="group">
              <div className="input-wrap">
                <Field
                  type="radio"
                  id="recentlyContactedDsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.recentlyContactedDsc}
                  className="box-links__nodes"
                />
                <label htmlFor="recentlyContactedDsc" className="input__label">
                  {t('contactSearch.sortOptions.recentlyContactedDsc')}
                </label>
              </div>

              <div className="input-wrap">
                <Field
                  type="radio"
                  id="recentlyContactedAsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.recentlyContactedAsc}
                  className="box-links__nodes"
                />
                <label htmlFor="recentlyContactedAsc" className="input__label">
                  {t('contactSearch.sortOptions.recentlyContactedAsc')}
                </label>
              </div>
              <div className="input-wrap">
                <Field
                  type="radio"
                  id="outboundContactsDsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.outboundContactsDsc}
                  className="box-links__nodes"
                />
                <label htmlFor="outboundContactsDsc" className="input__label">
                  {t('contactSearch.sortOptions.outboundContactsDsc')}
                </label>
              </div>
              <div className="input-wrap">
                <Field
                  type="radio"
                  id="outboundContactsAsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.outboundContactsAsc}
                  className="box-links__nodes"
                />
                <label htmlFor="outboundContactsAsc" className="input__label">
                  {t('contactSearch.sortOptions.outboundContactsAsc')}
                </label>
              </div>

              <div className="input-wrap">
                <Field
                  type="radio"
                  id="repliesDsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.repliesDsc}
                  className="box-links__nodes"
                />
                <label htmlFor="repliesDsc" className="input__label">
                  {t('contactSearch.sortOptions.repliesDsc')}
                </label>
              </div>

              <div className="input-wrap">
                <Field
                  type="radio"
                  id="repliesAsc"
                  name="sortBy"
                  value={SORT_FIELD_VALUES.repliesAsc}
                  className="box-links__nodes"
                />
                <label htmlFor="repliesAsc" className="input__label">
                  {t('contactSearch.sortOptions.repliesAsc')}
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
                  {t('contactSearch.sortOptions.nameAsc')}
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
                  {t('contactSearch.sortOptions.nameDsc')}
                </label>
              </div>
            </div>

            <div className="input-wrap">
              <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
                {t('contactSearch.sortOptions.submit')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  contactFilterOptions: state.contactSearch.contactFilterOptions,
});

const mapDispatchToProps = (dispatch: Function) => ({
  searchWithFilterOptions: (contactFilterOptions: ContactFilterOptions) =>
    dispatch(contactSearchActions.searchWithFilterOptions(contactFilterOptions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactSortDialog);
