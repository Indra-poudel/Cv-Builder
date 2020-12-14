import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { MdSearch } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { ActionMeta, OptionTypeBase, ValueType } from 'react-select';

import RcSelect from 'src/components/commons/rc-select/rc-select';
import {
  activeStatusOptions,
  supervisorStatusOptions,
  suppressedStatusOptions,
  userFiltersKeys,
  userSignupOptions,
} from '../user-management.constants';
import reactSelectUtils from 'src/utils/react-select';

export interface ChangedInput {
  key: string;
  value: string;
}

export interface FilterFields {
  search?: string;
  isActive?: boolean;
  isSuppressed?: boolean;
  hasSignedUp?: boolean;
  withSupervisors?: boolean;
}

interface StateProps {
  handleOnInputChange: (event: ChangedInput) => void;
  handleOnClear: () => void;
  filterQuery?: FilterFields;
}

const UserListFilter = (props: StateProps) => {
  const debounceMs = 500;
  const { t } = useTranslation(['translation']);

  const [searchInput, setSearchInput] = useState<string>(props.filterQuery?.search || '');

  useEffect(() => {
    if (searchInput !== props.filterQuery?.search) {
      setSearchInput(props.filterQuery?.search || '');
    }
  }, [props.filterQuery]);

  const debouncedSearch = debounce((eventData) => {
    props.handleOnInputChange(eventData);
  }, debounceMs);

  const searchUser = React.useCallback(
    (event) => {
      const value = event?.target?.value;
      setSearchInput(value);
      const eventData = {
        value,
        key: userFiltersKeys.SEARCH,
      };

      debouncedSearch(eventData);
    },
    [props.filterQuery]
  );

  const handleOnChangeFilter = (selectedOption: ValueType<OptionTypeBase>, action: ActionMeta<OptionTypeBase>) => {
    const option = selectedOption as OptionTypeBase;
    const selectedValue = option && option.value;

    props.handleOnInputChange({
      key: action.name || '',
      value: selectedValue,
    });
  };

  return (
    <div className="filter-block">
      <div className="filter-group user-filter">
        <div className="input-wrap input-wrap--icon-left mb-0x-lg mr-2x flex_1">
          <input
            type="text"
            placeholder={t('translation:userManagement.filterPlaceholders.searchPlaceholder')}
            className="input input--sm"
            onChange={searchUser}
            value={searchInput}
          />
          <span className="form-icon">
            <MdSearch className="mr-2x"></MdSearch>
          </span>
        </div>
        <div className="mb-0x mr-2x flex_1">
          <RcSelect
            options={activeStatusOptions}
            isClearable={true}
            name={userFiltersKeys.IS_ACTIVE}
            placeholder={t('translation:userManagement.filterPlaceholders.activeStatusPlaceholder')}
            value={reactSelectUtils.getSelectedValueFromOptions(activeStatusOptions, props.filterQuery?.isActive)}
            onChange={handleOnChangeFilter}
          />
        </div>
        <div className="mr-2x flex_1">
          <RcSelect
            options={suppressedStatusOptions}
            isClearable={true}
            name={userFiltersKeys.IS_SUPPRESSED}
            placeholder={t('translation:userManagement.filterPlaceholders.suppressedStatusPlaceholder')}
            value={reactSelectUtils.getSelectedValueFromOptions(
              suppressedStatusOptions,
              props.filterQuery?.isSuppressed
            )}
            onChange={handleOnChangeFilter}
          />
        </div>
        <div className="mr-2x flex_1">
          <RcSelect
            options={userSignupOptions}
            isClearable={true}
            name={userFiltersKeys.HAS_SIGNUP}
            placeholder={t('translation:userManagement.filterPlaceholders.userSignupPlaceholder')}
            value={reactSelectUtils.getSelectedValueFromOptions(userSignupOptions, props.filterQuery?.hasSignedUp)}
            onChange={handleOnChangeFilter}
          />
        </div>
        <div className="mr-2x flex_1">
          <RcSelect
            options={supervisorStatusOptions}
            isClearable={true}
            name={userFiltersKeys.WITH_SUPERVISORS}
            placeholder={t('translation:userManagement.filterPlaceholders.supervisorStatusPlaceholder')}
            value={reactSelectUtils.getSelectedValueFromOptions(
              supervisorStatusOptions,
              props.filterQuery?.withSupervisors
            )}
            onChange={handleOnChangeFilter}
          />
        </div>
        <button onClick={props.handleOnClear} className="btn btn--with-icon btn--outlined-primary btn--small">
          Clear filters
        </button>
      </div>
    </div>
  );
};

export default UserListFilter;
