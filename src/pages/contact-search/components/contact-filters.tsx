import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MdCloudDownload } from 'react-icons/md';
import { OptionTypeBase, ValueType } from 'react-select';

import { RootState } from 'src/reducers';
import ToolTip from 'src/components/tool-tip';
import DateRangePicker from 'src/components/date-range-picker';
import { ContactFilterOptions } from '../contact-search.types';
import * as contactSearchActions from '../contact-search.action';
import RcSelect from 'src/components/commons/rc-select/rc-select';
import { clientResponseOptions, hasAttachmentOptions } from '../contact-search.constants';

interface StateProps {
  contactFilterOptions: ContactFilterOptions;
  searchWithFilterOptions: (contactFilterOptions: ContactFilterOptions) => void;
  downloadContactList: () => void;
}

const ContactFilters = (props: StateProps) => {
  const { t } = useTranslation();

  const _setSelectedDateRange = (startDate?: string | null, endDate?: string | null) => {
    props.searchWithFilterOptions({
      ...props.contactFilterOptions,
      startDate: startDate || null,
      endDate: endDate || null,
    });
  };

  const _handleResponsesChange = (selectedOption: ValueType<OptionTypeBase>) => {
    // Typecasting required since it is not possible to match the type with our need
    const option = selectedOption as OptionTypeBase;
    const selectedValue = option ? option.value : null;

    props.searchWithFilterOptions({
      ...props.contactFilterOptions,
      hasClientResponses: selectedValue,
    });
  };

  const _handleAttachmentsChange = (selectedOption: ValueType<OptionTypeBase>) => {
    // Typecasting required since it is not possible to match the type with our need
    const option = selectedOption as OptionTypeBase;
    const selectedValue = option ? option.value : null;

    props.searchWithFilterOptions({
      ...props.contactFilterOptions,
      hasAttachments: selectedValue,
    });
  };

  return (
    <>
      <div className="filter-group search-filter">
        <div className="mr-2x flex_1">
          <RcSelect
            options={clientResponseOptions}
            isClearable={true}
            placeholder={'Responses'}
            onChange={_handleResponsesChange}
          />
        </div>
        <div className="mr-2x flex_1">
          <RcSelect
            options={hasAttachmentOptions}
            isClearable={true}
            placeholder={'Attachments'}
            onChange={_handleAttachmentsChange}
          />
        </div>
        <div className="mr-2x">
          <DateRangePicker onClear={_setSelectedDateRange} setDateRange={_setSelectedDateRange} />
        </div>
        <ToolTip isAlwaysVisible description={t('tool-tip:downloadCSV')}>
          <button
            className="btn btn--with-icon btn--outlined-grey"
            style={{ height: '100%' }}
            onClick={props.downloadContactList}>
            <MdCloudDownload />
          </button>
        </ToolTip>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  contactFilterOptions: state.contactSearch.contactFilterOptions,
});

const mapDispatchToProps = (dispatch: Function) => ({
  searchWithFilterOptions: (contactFilterOptions: ContactFilterOptions) =>
    dispatch(contactSearchActions.searchWithFilterOptions(contactFilterOptions)),
  downloadContactList: () => dispatch(contactSearchActions.downloadContactList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactFilters);
