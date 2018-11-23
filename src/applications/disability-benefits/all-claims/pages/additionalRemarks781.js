import React from 'react';

import { PtsdNameTitle } from '../content/ptsdClassification';

const additionalRemarksDescription = (
  <div>
    <h3>Additional Remarks</h3>
    <p>
      If there is anything else you would like to tell us about the stressful
      events that contributed to your PTSD, you can provide that information
      below.
    </p>
    <p>
      If you have any supporting documents or buddy statements to support your
      claim, you‘ll have a chance to upload those later in the application.
    </p>
  </div>
);

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781" />
  ),
  'ui:description': additionalRemarksDescription,
  additionalRemarks: {
    'ui:title': ' ',
    'ui:widget': 'textarea',
    'ui:options': {
      rows: 5,
      maxLength: 32000,
    },
  },
};

export const schema = {
  type: 'object',
  properties: {
    additionalRemarks: {
      type: 'string',
      properties: {},
    },
  },
};