import set from '../../../../platform/utilities/data/set';
import merge from 'lodash/merge';
import fullSchema from 'vets-json-schema/dist/21-526EZ-ALLCLAIMS-schema.json';
import { uiSchema as autoSuggestUiSchema } from 'us-forms-system/lib/js/definitions/autosuggest';
import dateRangeUI from 'us-forms-system/lib/js/definitions/monthYearRange';
import { treatmentView } from '../content/vaMedicalRecords';
import { queryForFacilities, addCheckboxPerDisability } from '../utils';
import {
  validateMilitaryTreatmentCity,
  validateMilitaryTreatmentState,
  startedAfterServicePeriod,
  hasMonthYear,
} from '../validations';
import { USA } from '../constants';
import { validateBooleanGroup } from 'us-forms-system/lib/js/validation';

const { vaTreatmentFacilities } = fullSchema.properties;

export const uiSchema = {
  'ui:description':
    'First we’ll ask you about your VA medical records for your claimed disability.',
  'view:vaMedicalRecordsIntro': {
    'ui:title': 'VA medical records',
    'ui:description':
      'Please tell us where VA treated you for your disability.',
  },
  vaTreatmentFacilities: {
    'ui:options': {
      itemName: 'Facility',
      viewField: treatmentView,
    },
    items: {
      'ui:order': [
        'treatmentCenterName',
        'treatedDisabilityNames',
        'treatmentDateRange',
        'treatmentCenterAddress',
      ],
      treatmentCenterName: autoSuggestUiSchema(
        'Name of VA medical facility',
        queryForFacilities,
        {
          'ui:options': { queryForResults: true, freeInput: true },
          'ui:errorMessages': {
            maxLength: 'Please enter a name with fewer than 100 characters.',
            pattern: 'Please enter a valid name.',
          },
        },
      ),
      treatedDisabilityNames: {
        'ui:title':
          'Please choose the conditions for which you received treatment at this facility.',
        'ui:options': {
          updateSchema: addCheckboxPerDisability,
          showFieldLabel: true,
        },
        'ui:validations': [validateBooleanGroup],
        'ui:errorMessages': {
          atLeastOne: 'Please select at least one condition',
          required: 'Please select at least one condition',
        },
      },
      treatmentDateRange: merge(
        {},
        dateRangeUI(
          'When did you first visit this facility?',
          'When was your most recent visit?',
          'Date of last treatment must be after date of first treatment',
        ),
        {
          from: {
            'ui:validations': dateRangeUI().from['ui:validations'].concat([
              startedAfterServicePeriod,
            ]),
          },
        },
        {
          to: {
            'ui:validations': dateRangeUI().to['ui:validations'].concat([
              hasMonthYear,
            ]),
          },
        },
      ),
      treatmentCenterAddress: {
        'ui:order': ['country', 'state', 'city'],
        country: {
          'ui:title': 'Country',
        },
        state: {
          'ui:title': 'State',
          'ui:validations': [validateMilitaryTreatmentState],
          'ui:options': {
            expandUnder: 'country',
            expandUnderCondition: USA,
          },
        },
        city: {
          'ui:title': 'City',
          'ui:validations': [validateMilitaryTreatmentCity],
        },
      },
    },
  },
};

export const schema = {
  type: 'object',
  properties: {
    'view:vaMedicalRecordsIntro': {
      type: 'object',
      properties: {},
    },
    vaTreatmentFacilities: set(
      'items.properties.treatedDisabilityNames',
      { type: 'object', properties: {} },
      vaTreatmentFacilities,
    ),
  },
};
