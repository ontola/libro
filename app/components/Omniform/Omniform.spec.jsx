import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as sh from '@ontologies/shacl';
import * as schema from '@ontologies/schema';
import * as xsd from '@ontologies/xsd';
import { act } from '@testing-library/react'
import { createForm } from 'final-form';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import argu from '../../ontology/argu';
import ex from '../../ontology/ex';
import example from '../../ontology/example';
import form from '../../ontology/form';
import ll from '../../ontology/ll';
import {
  cleanup,
  fireEvent,
  render,
} from '../../test-utils';
import Card from '../../topologies/Card';

import Omniform from './index';

describe('Omniform', () => {
  afterEach(cleanup);

  const schemaText = calculateFormFieldName(schema.text);
  const conAction = ex.ns('/cons/new');
  const conEntryPoint = example.ns('cons/new#EntryPoint');
  const proAction = ex.ns('/pros/new');
  const proEntryPoint = example.ns('pros/new#EntryPoint');

  const resources = {
    [conAction]: {
      '@id': conAction,
      [rdfx.type]: schema.CreateAction,
      [schema.result]: argu.ConArgument,
      [schema.object]: {},
      [schema.target]: {
        '@id': conEntryPoint,
        [rdfx.type]: schema.EntryPoint,
        [schema.isPartOf]: conAction,
        [ll.actionBody]: {
          [rdfx.type]: form.Form,
          [form.pages]: {
            [rdfx.type]: rdfx.Seq,
            [rdfx.ns('_0')]: {
              [rdfx.type]: form.Page,
              [form.groups]: {
                [rdfx.type]: rdfx.Seq,
                [rdfx.ns('_0')]: {
                  [rdfx.type]: form.Group,
                  [form.fields]: {
                    [rdfx.type]: rdfx.Seq,
                    [rdfx.ns('_0')]: {
                      [rdfx.type]: form.TextAreaInput,
                      [sh.datatype]: xsd.string,
                      [schema.text]: 'prop con desc',
                      [sh.maxCount]: 1,
                      [sh.maxLength]: 100,
                      [sh.minCount]: 1,
                      [sh.minLength]: 4,
                      [schema.name]: 'prop con',
                      [sh.order]: 0,
                      [sh.path]: schema.text,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    [proAction]: {
      '@id': proAction,
      [rdfx.type]: schema.CreateAction,
      [schema.result]: argu.ProArgument,
      [schema.object]: {},
      [schema.target]: {
        '@id': proEntryPoint,
        [rdfx.type]: schema.EntryPoint,
        [schema.isPartOf]: proAction,
        [ll.actionBody]: {
          [rdfx.type]: form.Form,
          [form.pages]: {
            [rdfx.type]: rdfx.Seq,
            [rdfx.ns('_0')]: {
              [rdfx.type]: form.Page,
              [form.groups]: {
                [rdfx.type]: rdfx.Seq,
                [rdfx.ns('_0')]: {
                  [rdfx.type]: form.Group,
                  [form.fields]: {
                    [rdfx.type]: rdfx.Seq,
                    [rdfx.ns('_0')]: {
                      [rdfx.type]: form.TextAreaInput,
                      [sh.datatype]: xsd.string,
                      [schema.text]: 'prop pro desc',
                      [sh.maxCount]: 1,
                      [sh.maxLength]: 100,
                      [sh.minCount]: 1,
                      [sh.minLength]: 4,
                      [schema.name]: 'prop pro',
                      [sh.order]: 0,
                      [sh.path]: schema.text,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    [argu.ProArgument]: {
      '@id': argu.ProArgument,
      [rdfx.type]: rdfs.Class,
      [rdfs.label]: 'Pro',
      [schema.description]: 'Pro',
    },
    [argu.ConArgument]: {
      '@id': argu.ConArgument,
      [rdfx.type]: rdfs.Class,
      [rdfs.label]: 'Con',
      [schema.description]: 'Con',
    },
  };

  it('keeps modification across action switches', async () => {
    const subject = ex.ns('5');
    const omniformSelector = `${subject.value}.omniform`;
    const formInstance = createForm({ onSubmit: () => undefined });

    const {
      findByTestId,
      getByTestId,
      getByLabelText,
      getByText,
    } = await render((
      <Card>
        <Omniform
          actions={new Set([
            ex.ns('/pros/new'),
            ex.ns('/cons/new'),
          ])}
          formInstance={formInstance}
          parentIRI={btoa(subject.value)}
        />
      </Card>
    ), { resources });

    await findByTestId(btoa('http://schema.org/text'));
    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: '',
    });
    expect(formInstance.getFieldState(schemaText).dirty).toBeFalsy();

    fireEvent.change(getByLabelText(/prop pro/), { target: { value: 'test' } });

    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(formInstance.getFieldState(schemaText).dirty).toBeTruthy();

    expect(getByText('prop pro')).toBeVisible();
    expect(getByText('Con')).toBeVisible();

    act(() => {
      fireEvent.click(getByText('Con'));
    });

    expect(getByText('prop con')).toBeVisible();

    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(formInstance.getFieldState(schemaText).dirty).toBeTruthy();
  });
});
