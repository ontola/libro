import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import { fireEvent } from '@testing-library/dom';
import { createForm } from 'final-form';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import argu from '../../ontology/argu';
import { cleanup, render } from '../../test-utils';
import Form from '../Form/Form';

import FormField from './FormField';

const renderWithTestForm = (ui, options = {}) => {
  const form = createForm({
    onSubmit: () => null,
  });

  return {
    form,
    ...render((
      <Form
        form={form}
        formID={options.formId || 'test'}
      >
        {ui}
      </Form>
    ), options),
  };
};

describe('FormField', () => {
  afterEach(cleanup);

  const schemaName = calculateFormFieldName(schema.name);

  it('renders a plain input', () => {
    const { getByTestId } = renderWithTestForm((
      <FormField path={schema.name} />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: '',
    });
  });

  it('accepts an initial value', () => {
    const { getByTestId } = renderWithTestForm((
      <FormField
        initialValue={[rdf.literal('Test value')]}
        path={schema.name}
      />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: 'Test value',
    });
  });

  it('toggles checkboxes', () => {
    const pinned = calculateFormFieldName(argu.pinned);
    const {
      getByTestId,
      form,
    } = renderWithTestForm((
      <FormField
        path={argu.pinned}
        type="checkbox"
      />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: false,
    });

    fireEvent.click(getByTestId(pinned));

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: true,
    });
    expect(form.getFieldState(pinned).value).toEqual([rdf.literal(true)]);
    expect(form.getFieldState(pinned).invalid).toBeFalsy();
  });
});
