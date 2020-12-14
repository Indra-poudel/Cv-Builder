export const LOGOUT = 'auth/logout';
export const LOGIN_WITH_GOOGLE = 'oauth/google/login';
export const SUPER_ADMIN_LOGIN_WITH_GOOGLE = 'admin/oauth/google/login';

export const SUPER_ADMIN_CLIENT = 'admin/clients';
export const SUPER_ADMIN_CLIENT_DETAILS = 'admin/clients/:id';

export const SAVE_ORGANIZATION_INFO = 'organization/update';
export const GET_ORGANIZATION_SIZES = 'organization-size-options';
export const GET_ONBOARDING_STEP = 'organization-operation/onboarding-step';
export const UPDATE_ONBOARDING_STEP = 'organization-operation/update-onboarding-step';

export const USERS = 'users';
export const GET_USER_DETAILS = 'users/:id';
export const VALIDATE_USER = 'users/validate';
export const UPDATE_USER_DETAILS = 'users/:id';
export const GET_USER_PROFILE = 'users/profile';
export const GET_USERS_SUGGESTIONS = 'users/suggest';
export const ADD_USER_UPLOAD_CSV = 'users/upload-csv';
export const ADD_SUPERVISORS = 'users/:id/add-supervisors';
export const RESEND_INVITATION = 'users/:id/resend-invitation';
export const GET_SUPERVISOR_EXISTING = 'users/:id/supervisors';
export const GET_MAP_DOMAIN_OF_USER = 'users/:id/client-domains';
export const EMAIL_VERIFICATION = 'users/verify-email-invitation';
export const DOWNLOAD_USER_LIST = 'users/supervisors/download-csv';
export const VALIDATE_SUPERVISOR = 'users/:id/validate-supervisor';
export const DOMAIN_MAP_TO_USER = 'users/:id/upload-domain-mapping';
export const REMOVE_SUPERVISOR_EXISTING = 'users/:id/remove-supervisor';
export const MANUALLY_MAP_DOMAIN_TO_USER = 'users/:id/add-domain-mapping';
export const DELETE_CLIENT_DOMAIN_OF_USER = 'users/:id/remove-domain-mapping';
export const GET_SUPERVISOR_SUGGESTIONS = 'users/:id/possible-supervisor-list';
export const GET_SUPERVISOR_RECOMMENDATIONS = 'users/:id/recommended-supervisor-list';
export const DOWNLOAD_USER_CLIENT_DOMAIN_LIST = 'users/client-domains/download-csv';

export const SEARCH_CONTACTS = 'contacts';
export const GET_CONTACT_INFO = 'contacts/:id';
export const DOWNLOAD_CONTACTS = 'contacts/download-csv';
export const GET_EMAIL_ACTIVITIES = 'contacts/:contactId/emails';

export const SEARCH_DOCUMENTS = 'message-parts/attachments';
export const DOWNLOAD_MESSAGE_PART = 'message-parts/:id/presigned-url';

export const ETL_INITIAL = 'service/etl/start-initial-fetch';
export const GET_EMAIL_ACTIVITY_THREAD = 'emails/:emailActivityId/activities';

export const GET_ALL_SUPPRESSION_LIST = 'suppression-list/';
export const UPLOAD_SUPPRESSION_LIST = 'suppression-list/upload';
export const ADD_SUPPRESSION_LIST_USERS = 'suppression-list/users';
export const VALIDATE_SUPPRESSION_LIST = 'suppression-list/validate';
export const GET_SUPPRESSION_LIST_STATUS = 'suppression-list/status';
export const GET_SUPPRESSION_LIST_SUGGESTION = 'suppression-list/suggest';
export const REMOVE_ALL_SUPPRESSION_LIST = 'suppression-list/users/remove';
export const REMOVE_SUPPRESSION_LIST_BY_ID = 'suppression-list/users/:id/remove';

export const MANUAL_IAM_ADMIN = 'pdf/download/manual/iam-admin';
export const MANUAL_GOOGLE_API = 'pdf/download/manual/google-api';
export const MANUAL_GOOGLE_ADMIN = 'pdf/download/manual/google-admin';

export const USAGE_REPORT = 'usage-report';
export const DOWNLOAD_USAGE_REPORT_LIST = 'usage-report/download';

export const GET_CLIENT_DOMAINS = 'client-domain';
export const CLIENT_DOMAIN_VALIDATE = 'client-domain/validate';
export const DOWNLOAD_CLIENT_DOMAIN = 'client-domain/download-csv';
export const BULK_DOMAIN_UPLOAD = 'client-domain/users-csv-upload';
export const DELETE_CLIENT_DOMAIN_BY_ID = 'client-domain/:id/delete';
export const ONBOARDING_DOMAIN_UPLOAD = 'client-domain/upload-domain-csv';

export const UPLOAD_JSON = 'upload-credentials';
export const GET_DEPARTMENTS = 'department-options';
export const GET_INDUSTRY_TYPES = 'industry-type-options';
