/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import * as xsd from '@ontologies/xsd';
import { fireEvent, waitFor } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { createForm } from 'final-form';
import { DataObject } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import argu from '../../../Argu/ontology/argu';
import example from '../../../../ontology/example';
import form from '../../ontology/form';
import { CardMain } from '../../../../topologies/Card';
import { calculateFormFieldName } from '../../lib/helpers';
import { UnwrappedForm as Form } from '../Form/Form';

const field = example.ns('field');

interface RenderWithTestFormOpts {
  initialValues?: Record<string, unknown>;
  resources: DataObject;
}

const renderWithTestForm = async ({ initialValues, resources }: RenderWithTestFormOpts) => {
  const finalForm = createForm({
    initialValues,
    onSubmit: () => undefined,
  });

  return {
    finalForm,
    ...await renderLinked(({ iri }) => (
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
  const textField: DataObject = {
    '@id': field.value,
    [rdfx.type.toString()]: form.TextInput,
    [schema.name.toString()]: 'Title',
    [schema.text.toString()]: 'Enter the core of your idea here',
    [sh.datatype.toString()]: xsd.string,
    [sh.maxCount.toString()]: 1,
    [sh.maxLength.toString()]: 110,
    [sh.minCount.toString()]: 1,
    [sh.path.toString()]: schema.name,
    [form.helperText.toString()]: '',
  };

  const checkboxField: DataObject = {
    '@id': field.value,
    [rdfx.type.toString()]: form.CheckboxInput,
    [schema.name.toString()]: 'Pinned',
    [schema.text.toString()]: 'Pin item',
    [sh.datatype.toString()]: xsd.xsdboolean,
    [sh.maxCount.toString()]: 1,
    [sh.path.toString()]: argu.pinned,
    [form.helperText.toString()]: '',
  };

  const schemaName = calculateFormFieldName(schema.name);

  it('renders a plain input', async () => {
    const { getByTestId } = await renderWithTestForm({
      resources: textField,
    });
    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: '',
    });
  });

  it('accepts an initial value', async () => {
    const { getByTestId } = await renderWithTestForm({
      initialValues: {
        [schemaName]: [rdf.literal('Test value')],
      },
      resources: textField,
    });

    expect(getByTestId('test')).toHaveFormValues({
      [schemaName]: 'Test value',
    });
  });

  it('toggles checkboxes', async () => {
    const pinned = calculateFormFieldName(argu.pinned);
    const {
      getByTestId,
      getByText,
      finalForm,
    } = await renderWithTestForm({
      resources: checkboxField,
    });

    expect(getByTestId('test')).toHaveFormValues({
      [pinned]: false,
    });

    act(() => {
      fireEvent.click(getByText('Pinned'));
    });

    await waitFor(() => expect(getByTestId('test')).toHaveFormValues({
      [pinned]: true,
    }));
    expect(finalForm.getFieldState(pinned)!.value).toEqual([rdf.literal(true)]);
    expect(finalForm.getFieldState(pinned)!.invalid).toBeFalsy();
  });
});
