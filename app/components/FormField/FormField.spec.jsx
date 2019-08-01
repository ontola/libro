import { fireEvent } from '@testing-library/dom';
import { createForm } from 'final-form';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import validatorMap from '../../helpers/validators';
import { cleanup, render } from '../../test-utils';
import Form from '../Form/Form';

import FormField from './index';

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

  const schemaName = calculateFormFieldName(NS.schema.name);

  it('renders a plain input', () => {
    const { getByTestId } = renderWithTestForm((
      <FormField field={schemaName} />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: '',
    });
  });

  it('accepts an initial value', () => {
    const { getByTestId } = renderWithTestForm((
      <FormField
        field={schemaName}
        initialValue="Test value"
      />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: 'Test value',
    });
  });

  it('retrieves an initial value from session storage', () => {
    const initial = {
      [`test.${schemaName}`]: 'Test value',
    };
    const { getByTestId, form } = renderWithTestForm((
      <FormField
        field={schemaName}
        sessionStorage={{ getItem: key => initial[key] }}
        validate={validatorMap.required}
      />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: 'Test value',
    });
    expect(form.getFieldState(schemaName).value).toEqual('Test value');
    expect(form.getFieldState(schemaName).invalid).toBeFalsy();
  });

  it('toggles checkboxes', () => {
    const pinned = calculateFormFieldName(NS.argu('pinned'));
    const storage = {};

    const {
      getByTestId,
      form,
    } = renderWithTestForm((
      <FormField
        field={pinned}
        sessionStorage={{
          getItem: key => storage[key],
          setItem: (key, value) => { storage[key] = value; },
        }}
        type="checkbox"
      />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: false,
    });
    expect(storage[pinned]).toBeFalsy();

    fireEvent.click(getByTestId(pinned));

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: true,
    });
    expect(form.getFieldState(pinned).value).toEqual(true);
    expect(form.getFieldState(pinned).invalid).toBeFalsy();
    expect(storage[`test.${pinned}`]).toBeTruthy();
  });

  describe('persistence', () => {
    const testPersistence = (type, value) => {
      const field = calculateFormFieldName(NS.argu('field'));
      const storage = {};

      const { getByTestId } = renderWithTestForm((
        <FormField
          field={field}
          sessionStorage={{
            getItem: key => storage[key],
            setItem: (key, v) => { storage[key] = v; },
          }}
          type={type}
        />
      ));

      expect(getByTestId('test')).toHaveFormValues({
        [field]: '',
      });
      expect(storage[field]).toBe(undefined);

      fireEvent.change(getByTestId(field), { target: { value: 'test' } });

      expect(getByTestId('test')).toHaveFormValues({
        [field]: 'test',
      });
      expect(storage[`test.${field}`]).toBe(value);
    };

    it('stores text fields', () => {
      testPersistence('text', 'test');
    });

    it("doesn't store passwords", () => {
      testPersistence('password', undefined);
    });

    it("doesn't store hidden fields", () => {
      testPersistence('hidden', undefined);
    });
  });
});
