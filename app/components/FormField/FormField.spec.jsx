import schema from '@ontologies/schema';
import { fireEvent } from '@testing-library/dom';
import { createForm } from 'final-form';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import validatorMap from '../../helpers/validators';
import argu from '../../ontology/argu';
import { cleanup, render } from '../../test-utils';
import Form from '../Form/Form';

import FormField from './index';

const mockStorage = () => {
  const store = {};
  const storage = {
    getItem: (key) => (
      Object.prototype.hasOwnProperty.call(storage, key)
        ? store[key]
        : null
    ),
    setItem: (key, value) => { store[key] = value; },
  };

  return [store, storage];
};

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
      [`test.${schemaName}`]: '"Test value"',
    };
    const { getByTestId, form } = renderWithTestForm((
      <FormField
        field={schemaName}
        sessionStore={{ getItem: (key) => initial[key] }}
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
    const pinned = calculateFormFieldName(argu.pinned);
    const [store, storage] = mockStorage();

    const {
      getByTestId,
      form,
    } = renderWithTestForm((
      <FormField
        field={pinned}
        sessionStore={storage}
        type="checkbox"
      />
    ));

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: false,
    });
    expect(store[pinned]).toBeFalsy();

    fireEvent.click(getByTestId(pinned));

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: true,
    });
    expect(form.getFieldState(pinned).value).toEqual([true]);
    expect(form.getFieldState(pinned).invalid).toBeFalsy();
    expect(store[`test.${pinned}`]).toBeTruthy();
  });

  describe('persistence', () => {
    const testPersistence = (type, value) => {
      const field = calculateFormFieldName(argu.field);
      const [store, storage] = mockStorage();

      const { getByTestId } = renderWithTestForm((
        <FormField
          field={field}
          sessionStore={storage}
          type={type}
        />
      ));

      expect(getByTestId('test')).toHaveFormValues({
        [field]: '',
      });
      expect(store[field]).toBe(undefined);

      fireEvent.change(getByTestId(field), { target: { value } });

      expect(getByTestId('test')).toHaveFormValues({
        [field]: 'test',
      });

      return store[`test.${field}`];
    };

    it('stores values', () => {
      const result = testPersistence('text', 'test');
      expect(result).toEqual('["test"]');
    });

    it("doesn't store passwords", () => {
      const result = testPersistence('password', 'test');
      expect(result).toEqual(undefined);
    });

    it("doesn't store hidden fields", () => {
      const result = testPersistence('hidden', 'test');
      expect(result).toEqual(undefined);
    });
  });
});
