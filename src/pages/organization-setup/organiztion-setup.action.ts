import { Dispatch } from 'redux';

import notification from 'src/utils/notification';
import { IOrganizationInfo } from 'src/services/organization-setup';
import { SelectOption } from 'src/components/commons/rc-select/rc-select';
import * as organizationSetupService from 'src/services/organization-setup';

export const SHOW_LOADING = '@@action/ORGANIZATION_SETUP/SHOW_LOADING';
export const HIDE_LOADING = '@@action/ORGANIZATION_SETUP/HIDE_LOADING';
export const FETCH_ORGANIZATION_SETUP_OPTIONS = '@@action/ORGANIZATION_SETUP/FETCH_ORGANIZATION_SETUP_OPTIONS';
export const SAVE_ORGANIZATION_INFO = '@@action/ORGANIZATION_SETUP/SAVE_ORGANIZATION_INFO';
export const SAVE_SUCCESS = '@@action/ORGANIZATION_SETUP/SAVE_SUCCESS';

interface OrganizationSetupOptions {
  organizationSizeOptions: Array<SelectOption>;
  industryTypeOptions: Array<SelectOption>;
  departmentOptions: Array<SelectOption>;
}

interface FetchOrganizationSetupOptions {
  type: typeof FETCH_ORGANIZATION_SETUP_OPTIONS;
  payload: OrganizationSetupOptions;
}

interface SaveOrganizationInfo {
  type: typeof SAVE_ORGANIZATION_INFO;
}

interface ShowLoading {
  type: typeof SHOW_LOADING;
}

interface HideLoading {
  type: typeof HIDE_LOADING;
}

interface SaveSuccess {
  type: typeof SAVE_SUCCESS;
}

export type OrganizationSetupTypes =
  | FetchOrganizationSetupOptions
  | ShowLoading
  | HideLoading
  | SaveOrganizationInfo
  | SaveSuccess;

export const fetchOrganizationSetupOptions = () => async (
  dispatch: Dispatch<OrganizationSetupTypes>
): Promise<void> => {
  try {
    dispatch(showLoading());

    const [organizationSizeOptions, industryTypeOptions, departmentOptions] = await Promise.all([
      organizationSetupService.fetchOrganizationSizes(),
      organizationSetupService.fetchIndustryTypes(),
      organizationSetupService.fetchDepartments(),
    ]);

    dispatch({
      type: FETCH_ORGANIZATION_SETUP_OPTIONS,
      payload: {
        organizationSizeOptions,
        industryTypeOptions,
        departmentOptions,
      },
    });

    dispatch(hideLoading());
  } catch (error) {
    // TODO handle Error
    dispatch(hideLoading());
  }
};

export const saveOrganizationInfo = (requestBody: IOrganizationInfo) => async (
  dispatch: Dispatch<OrganizationSetupTypes>
): Promise<void> => {
  try {
    dispatch(showLoading());

    await organizationSetupService.saveOrganizationInfo(requestBody);

    dispatch(hideLoading());
    dispatch(setSaveSuccess());
  } catch (error) {
    const errorMessage = (error.response && error.response.data.message) || error.message;
    dispatch(hideLoading());
    notification(errorMessage);
  }
};

const showLoading = (): ShowLoading => ({
  type: SHOW_LOADING,
});

const hideLoading = (): HideLoading => ({
  type: HIDE_LOADING,
});

const setSaveSuccess = (): SaveSuccess => ({
  type: SAVE_SUCCESS,
});
