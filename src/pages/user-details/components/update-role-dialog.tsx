import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { RootState } from 'src/reducers';
import { UserRoles } from '../user-details.types';
import * as userDetailsAction from '../user-details.action';
import RightFloatingDialog from 'src/components/right-floating-dialog';
import RcSelect, { SelectOption as ISelectOption } from 'src/components/commons/rc-select/rc-select';

interface StateProps {
  closeDialog: () => void;
  isDialogOpen: boolean;
  userId: string;
  userRole: UserRoles;
  updateUserRole: (role: UserRoles, userId: string) => void;
}

interface FormValues {
  role: UserRoles;
}

const roles: Array<ISelectOption> = [
  {
    value: 'Supervisor',
    label: 'Supervisor',
  },
  {
    value: 'User',
    label: 'User',
  },
];

const UpdateRoleDialog = (props: StateProps) => {
  const { t } = useTranslation();

  const initialValues: FormValues = {
    role: props.userRole,
  };

  const defaultSelectedRole: ISelectOption = {
    value: props.userRole,
    label: props.userRole,
  };

  return (
    <RightFloatingDialog
      isOpen={props.isDialogOpen}
      closeDialog={props.closeDialog}
      headerText={t('userDetailPage.updateRoleDialog.title')}>
      <Formik
        initialValues={initialValues}
        onSubmit={(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          props.updateUserRole(formValues.role, props.userId);
          setSubmitting(false);
          props.closeDialog();
        }}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="input-wrap">
              <label htmlFor="role" className="input__label">
                {t('userDetailPage.updateRoleDialog.label.roleSelect')}
              </label>
              <Field
                name="role"
                component={RcSelect}
                options={roles}
                defaultValue={defaultSelectedRole}
                onChange={(option: ISelectOption) => setFieldValue('role', option ? option.value : '')}
              />
            </div>
            <div className="input-wrap">
              <button type="submit" className="btn btn--secondary btn--block" disabled={isSubmitting}>
                {t('userDetailPage.updateRoleDialog.label.saveButton')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </RightFloatingDialog>
  );
};

const mapStateToProps = (state: RootState) => ({
  userId: state.user.userDetails.id,
  userRole: state.user.userDetails.role,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateUserRole: (role: UserRoles, userId: string) => {
    dispatch(userDetailsAction.updateUserRole(role, userId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoleDialog);
