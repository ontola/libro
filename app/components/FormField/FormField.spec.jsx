import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import * as xsd from '@ontologies/xsd';
import { fireEvent } from '@testing-library/dom';
import { createForm } from 'final-form';
import { Resource } from 'link-redux';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import argu from '../../ontology/argu';
import example from '../../ontology/example';
import form from '../../ontology/form';
import ontola from '../../ontology/ontola';
import { cleanup, render } from '../../test-utils';
import { CardMain } from '../../topologies/Card';
import Form from '../Form/Form';

const field = example.ns('field');

const renderWithTestForm = ({ initialValues, resources }) => {
  const finalForm = createForm({
    initialValues,
    onSubmit: () => null,
  });

  return {
    finalForm,
    ...render(({ iri }) => (
      <CardMain>
        <Form
          form={finalForm}
          formID="test"
        >
          {() => (
            <Resource
              forceRender
              subject={iri}
            />
          )}
        </Form>
      </CardMain>
    ), { resources }),
  };
};

describe('FormField', () => {
  afterEach(cleanup);

  const textField = {
    '@id': field.value,
    [rdfx.type]: form.TextInput,
    [schema.name]: 'Title',
    [schema.text]: 'Enter the core of your idea here',
    [sh.datatype]: xsd.string,
    [sh.maxCount]: 1,
    [sh.maxLength]: 110,
    [sh.minCount]: 1,
    [sh.path]: schema.name,
    [ontola.helperText]: '',
  };
  const checkboxField = {
    '@id': field.value,
    [rdfx.type]: form.CheckboxInput,
    [schema.name]: 'Pinned',
    [schema.text]: 'Pin item',
    [sh.datatype]: xsd.xsdboolean,
    [sh.maxCount]: 1,
    [sh.path]: argu.pinned,
    [ontola.helperText]: '',
  };

  const schemaName = calculateFormFieldName(schema.name);

  it('renders a plain input', () => {
    const { getByTestId } = renderWithTestForm({
      resources: textField,
    });
    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: '',
    });
  });

  it('accepts an initial value', () => {
    const { getByTestId } = renderWithTestForm({
      initialValues: {
        [schemaName]: [rdf.literal('Test value')],
      },
      resources: textField,
    });

    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: 'Test value',
    });
  });

  it('toggles checkboxes', () => {
    const pinned = calculateFormFieldName(argu.pinned);
    const {
      getByTestId,
      finalForm,
    } = renderWithTestForm({
      resources: checkboxField,
    });

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: false,
    });

    fireEvent.click(getByTestId(pinned));

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: true,
    });
    expect(finalForm.getFieldState(pinned).value).toEqual([rdf.literal(true)]);
    expect(finalForm.getFieldState(pinned).invalid).toBeFalsy();
  });
});
