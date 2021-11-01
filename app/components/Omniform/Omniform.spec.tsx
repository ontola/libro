/**
 * @jest-environment jsdom
 */

import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as sh from '@ontologies/shacl';
import * as schema from '@ontologies/schema';
import * as xsd from '@ontologies/xsd';
import { act } from '@testing-library/react';
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
    [conAction.toString()]: {
      '@id': conAction,
      [rdfx.type.toString()]: schema.CreateAction,
      [schema.result.toString()]: argu.ConArgument,
      [schema.object.toString()]: {},
      [schema.target.toString()]: {
        '@id': conEntryPoint,
        [rdfx.type.toString()]: schema.EntryPoint,
        [schema.isPartOf.toString()]: conAction,
        [ll.actionBody.toString()]: {
          [rdfx.type.toString()]: form.Form,
          [form.pages.toString()]: {
            [rdfx.type.toString()]: rdfx.Seq,
            [rdfx.ns('_0').toString()]: {
              [rdfx.type.toString()]: form.Page,
              [form.groups.toString()]: {
                [rdfx.type.toString()]: rdfx.Seq,
                [rdfx.ns('_0').toString()]: {
                  [rdfx.type.toString()]: form.Group,
                  [form.fields.toString()]: {
                    [rdfx.type.toString()]: rdfx.Seq,
                    [rdfx.ns('_0').toString()]: {
                      [rdfx.type.toString()]: form.TextAreaInput,
                      [sh.datatype.toString()]: xsd.string,
                      [schema.text.toString()]: 'prop con desc',
                      [sh.maxCount.toString()]: 1,
                      [sh.maxLength.toString()]: 100,
                      [sh.minCount.toString()]: 1,
                      [sh.minLength.toString()]: 4,
                      [schema.name.toString()]: 'prop con',
                      [sh.order.toString()]: 0,
                      [sh.path.toString()]: schema.text,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    [proAction.toString()]: {
      '@id': proAction,
      [rdfx.type.toString()]: schema.CreateAction,
      [schema.result.toString()]: argu.ProArgument,
      [schema.object.toString()]: {},
      [schema.target.toString()]: {
        '@id': proEntryPoint,
        [rdfx.type.toString()]: schema.EntryPoint,
        [schema.isPartOf.toString()]: proAction,
        [ll.actionBody.toString()]: {
          [rdfx.type.toString()]: form.Form,
          [form.pages.toString()]: {
            [rdfx.type.toString()]: rdfx.Seq,
            [rdfx.ns('_0').toString()]: {
              [rdfx.type.toString()]: form.Page,
              [form.groups.toString()]: {
                [rdfx.type.toString()]: rdfx.Seq,
                [rdfx.ns('_0').toString()]: {
                  [rdfx.type.toString()]: form.Group,
                  [form.fields.toString()]: {
                    [rdfx.type.toString()]: rdfx.Seq,
                    [rdfx.ns('_0').toString()]: {
                      [rdfx.type.toString()]: form.TextAreaInput,
                      [sh.datatype.toString()]: xsd.string,
                      [schema.text.toString()]: 'prop pro desc',
                      [sh.maxCount.toString()]: 1,
                      [sh.maxLength.toString()]: 100,
                      [sh.minCount.toString()]: 1,
                      [sh.minLength.toString()]: 4,
                      [schema.name.toString()]: 'prop pro',
                      [sh.order.toString()]: 0,
                      [sh.path.toString()]: schema.text,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    [argu.ProArgument.toString()]: {
      '@id': argu.ProArgument,
      [rdfx.type.toString()]: rdfs.Class,
      [rdfs.label.toString()]: 'Pro',
      [schema.description.toString()]: 'Pro',
    },
    [argu.ConArgument.toString()]: {
      '@id': argu.ConArgument,
      [rdfx.type.toString()]: rdfs.Class,
      [rdfs.label.toString()]: 'Con',
      [schema.description.toString()]: 'Con',
    },
  };

  it('keeps modification across action switches', async () => {
    const subject = ex.ns('5');
    const omniformSelector = `${subject.value}.omniform`;
    const formInstance = createForm<any>({ onSubmit: () => undefined });

    const {
      findByTestId,
      findByText,
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
    ), { resources } as any);

    await findByTestId(btoa('http://schema.org/text'));
    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: '',
    });
    expect(formInstance.getFieldState(schemaText)!.dirty).toBeFalsy();

    act(() => {
      fireEvent.change(getByLabelText(/prop pro/), { target: { value: 'test' } });
    });

    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(formInstance.getFieldState(schemaText)!.dirty).toBeTruthy();

    expect(getByText('prop pro')).toBeVisible();
    expect(getByText('Con')).toBeVisible();

    act(() => {
      fireEvent.click(getByText('Con'));
    });

    await findByText('prop con');

    expect(getByText('prop con')).toBeVisible();

    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(formInstance.getFieldState(schemaText)!.dirty).toBeTruthy();
  });
});
