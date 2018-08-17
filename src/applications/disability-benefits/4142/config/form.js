// _ from 'lodash/fp';

// Example of an imported schema:
// import fullSchema from '../22-4142-schema.json';
// In a real app this would be imported from `vets-json-schema`:
// import fullSchema from 'vets-json-schema/dist/22-4142-schema.json';

// In a real app this would not be imported directly; instead the schema you
// imported above would import and use these common definitions:
import commonDefinitions from 'vets-json-schema/dist/definitions.json';
import PrivateProviderTreatmentView from '../../../../platform/forms/components/ServicePeriodView';
import dateRangeUI from 'us-forms-system/lib/js/definitions/dateRange';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

import {
  medicalRecDescription,
  letUsKnow,
  aboutPrivateMedicalRecs,
  limitedConsentDescription,
  summary,
} from '../helpers';

const { fullName, ssn, date, dateRange, usaPhone } = commonDefinitions;

// Define all the fields in the form to aid reuse
const formFields = {
  fullName: 'fullName',
  ssn: 'ssn',
  toursOfDuty: 'toursOfDuty',
  privateMedicalProvider: 'privateMedicalProvider',
  viewNoDirectDeposit: 'view:noDirectDeposit',
  viewStopWarning: 'view:stopWarning',
  bankAccount: 'bankAccount',
  accountType: 'accountType',
  accountNumber: 'accountNumber',
  routingNumber: 'routingNumber',
  address: 'address',
  email: 'email',
  altEmail: 'altEmail',
  phoneNumber: 'phoneNumber',
};

// Define all the form pages to help ensure uniqueness across all form chapters
const formPages = {
  applicantInfo: 'applicantInfo',
  uploadInfo: 'uploadInfo',
  serviceHistory: 'serviceHistory',
  treatmentHistory: 'treatmentHistory',
  contactInfo: 'contactInfo',
  directDeposit: 'directDeposit',
};

const formConfig = {
  urlPrefix: '/',
  submitUrl: '/v0/api/something',
  // submit: () =>
  //   Promise.resolve({ attributes: {
  // confirmationNumber: '123123123' } }),
  trackingPrefix: 'complex-form-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '1234',
  version: 0,
  prefillEnabled: true,
  //  prefillTransformer, //TODO: DO WE NEED THIS?
  savedFormMessages: {
    notFound: 'Please start over to apply for benefits.',
    noAuth: 'Please sign in again to continue your application for benefits.',
  },
  //  transformForSumbit: transform,
  title: '4142 Private Medical Record Release Form',
  defaultDefinitions: {
    fullName,
    ssn,
    date,
    dateRange,
    usaPhone,
  },
  chapters: {
    chapterApplicantInfo: {
      title: 'Apply for disability increase',
      pages: {
        [formPages.uploadInfo]: {
          path: 'prviate-medical-record',
          title: 'Supporting Evidence',
          uiSchema: {
            uploadRecs: {
              'ui:description': aboutPrivateMedicalRecs,
              'ui:title': aboutPrivateMedicalRecs,
              'ui:widget': 'radio',
              'ui:options': {
                labels: {
                  yes: 'Yes',
                  no: 'No, please get them from my doctor.',
                },
              },
            },
            'view:privateRecordsChoiceHelp': {
              'ui:description': medicalRecDescription,
            },
          },
          schema: {
            type: 'object',
            properties: {
              uploadRecs: {
                type: 'string',
                'enum': ['Yes', 'No'],
              },
              'view:privateRecordsChoiceHelp': {
                type: 'object',
                properties: {},
              },
            },
          },
        },
      },
    },
    chapterServiceHistory: {
      title: 'Supporting Evidence',
      pages: {
        [formPages.treatmentHistory]: {
          path: 'treatment-history',
          title: 'Supporting Evidence',
          uiSchema: {
            'ui:description': letUsKnow,
            [formFields.privateMedicalProvider]: {
              'ui:options': {
                itemName: 'Provider',
                viewField: PrivateProviderTreatmentView,
                hideTitle: true,
              },
              items: {
                dateRange: dateRangeUI(
                  'Approximate date of first treatment',
                  'Approximate date of last treatment',
                  'End of treatment must be after start of treatment',
                ),
                privateProviderName: {
                  'ui:title': 'Name of private provider or hospital',
                },
                privateProviderCountry: {
                  'ui:title': 'Country',
                },
                privateProviderStreetAddress: {
                  'ui:title': 'Street address',
                },
                privateProviderState: {
                  'ui:title': 'State',
                },
                privateProviderCity: {
                  'ui:title': 'City',
                },
                privateProviderPostalCode: {
                  'ui:title': 'Postal code',
                },
                privatePrimaryPhoneNumber: {
                  'ui:title': 'Primary phone number',
                },
                limitedConsent: {
                  'ui:title':
                    'I give consent, or permission, to my doctor to release only records related to [condition].',
                },
                'view:privateRecordsChoiceHelp': {
                  'ui:description': limitedConsentDescription,
                },
              },
            },
          },
          schema: {
            type: 'object',
            properties: {
              [formFields.privateMedicalProvider]: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    privateProviderName: {
                      type: 'string',
                    },
                    limitedConsent: {
                      type: 'boolean',
                    },
                    'view:privateRecordsChoiceHelp': {
                      type: 'object',
                      properties: {},
                    },
                    dateRange: {
                      $ref: '#/definitions/dateRange',
                    },
                    privateProviderCountry: {
                      type: 'string',
                    },

                    privateProviderStreetAddress: {
                      type: 'string',
                    },
                    privateProviderCity: {
                      type: 'string',
                    },
                    privateProviderState: {
                      type: 'string',
                    },
                    privateProviderPostalCode: {
                      type: 'string',
                    },
                    privatePrimaryPhoneNumber: {
                      type: 'string',
                    },
                  },
                  //  required: ['dateRange', 'serviceBranch'], //TODO
                },
              },
            },
          },
        },
      },
    },
    chapterAdditionalInfo: {
      title: 'Supporting Evidence',
      pages: {
        [formPages.contactInfo]: {
          path: 'summary-information',
          title: 'Summary Information',
          uiSchema: {
            'ui:title': 'Summary of evidence',
            'ui:description': summary,
          },
          schema: {
            type: 'object',
            properties: {},
          },
        },
      },
    },
  },
};

export default formConfig;