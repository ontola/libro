import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import sh from '@ontologies/shacl';
import schema from '@ontologies/schema';
import xsd from '@ontologies/xsd';
import { createForm } from 'final-form';
import { Set } from 'immutable';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import argu from '../../ontology/argu';
import ll from '../../ontology/ll';
import {
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from '../../test-utils';
import Card from '../../topologies/Card';

import Omniform from './index';

describe('Omniform', () => {
  afterEach(cleanup);

  const schemaText = calculateFormFieldName(schema.text);
  const conAction = NS.ex('/cons/new');
  const proAction = NS.ex('/pros/new');

  const resources = {
    [conAction]: {
      '@id': conAction,
      [rdfx.type]: schema.CreateAction,
      [schema.result]: argu.ConArgument,
      [schema.target]: {
        [rdfx.type]: schema.EntryPoint,
        [ll.actionBody]: {
          [rdfx.type]: sh.NodeShape,
          [sh.targetClass]: argu.Comment,
          [sh.property]: [
            {
              [rdfx.type]: sh.PropertyShape,
              [sh.datatype]: xsd.string,
              [sh.description]: 'prop con desc',
              [sh.maxCount]: 1,
              [sh.maxLength]: 100,
              [sh.minCount]: 1,
              [sh.minLength]: 4,
              [sh.name]: 'prop con',
              [sh.order]: 0,
              [sh.path]: schema.text,
            },
          ],
        },
      },
    },
    [proAction]: {
      '@id': proAction,
      [rdfx.type]: schema.CreateAction,
      [schema.result]: argu.ProArgument,
      [schema.target]: {
        [rdfx.type]: schema.EntryPoint,
        [ll.actionBody]: {
          [rdfx.type]: sh.NodeShape,
          [sh.targetClass]: argu.Comment,
          [sh.property]: [
            {
              [rdfx.type]: sh.PropertyShape,
              [sh.datatype]: xsd.string,
              [sh.description]: 'prop pro desc',
              [sh.maxCount]: 1,
              [sh.maxLength]: 100,
              [sh.minCount]: 1,
              [sh.minLength]: 4,
              [sh.name]: 'prop pro',
              [sh.order]: 0,
              [sh.path]: schema.text,
            },
          ],
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
    const subject = NS.ex('5');
    const omniformSelector = `${subject.value}.omniform`;
    const form = createForm({ onSubmit: () => undefined });

    const {
      getByTestId,
      getByLabelText,
      getByText,
    } = render((
      <Card>
        <Omniform
          actions={new Set([
            NS.ex('/pros/new'),
            NS.ex('/cons/new'),
          ])}
          formInstance={form}
          parentIRI={btoa(subject.value)}
        />
      </Card>
    ), { resources });

    await waitForElement(() => getByTestId(btoa('http://schema.org/text')));
    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: '',
    });

    fireEvent.change(getByLabelText(/prop pro/), { target: { value: 'test' } });

    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(form.getFieldState(schemaText).dirty).toBeTruthy();

    expect(getByText('prop pro')).toBeVisible();
    expect(getByText('Con')).toBeVisible();
    fireEvent.click(getByText('Con'));

    expect(getByText('prop con')).toBeVisible();

    expect(getByTestId(omniformSelector)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(form.getFieldState(schemaText).dirty).toBeTruthy();
  });
});
