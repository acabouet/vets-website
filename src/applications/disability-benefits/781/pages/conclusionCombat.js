import React from 'react';
import { PtsdNameTitle } from '../helpers';

const conclusionDescription = (
  <div>
    <p>
      Thank you for taking the time to answer our questions. The information you
      provided will help us research your claim.
    </p>
  </div>
);

export const uiSchema = {
  'ui:title': ({ formData }) => (
    <PtsdNameTitle formData={formData} formType="781" />
  ),
  'ui:description': conclusionDescription,
};

export const schema = {
  type: 'object',
  properties: {},
};
