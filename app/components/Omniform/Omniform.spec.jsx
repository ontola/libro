import { createForm } from 'final-form';
import { Set } from 'immutable';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import { NS } from '../../helpers/LinkedRenderStore';
import {
  cleanup,
  fireEvent,
  render,
} from '../../test-utils';
import Card from '../../topologies/Card';

import Omniform from './index';

describe('Omniform', () => {
  afterEach(cleanup);

  const schemaText = calculateFormFieldName(NS.schema.text);
  const conAction = NS.ex('/cons/new');
  const proAction = NS.ex('/pros/new');

  const resources = {
    [conAction]: {
      '@id': conAction,
      [NS.rdf.type]: NS.schema.CreateAction,
      [NS.schema.result]: NS.argu('ConArgument'),
      [NS.schema.target]: {
        [NS.rdf.type]: NS.schema.EntryPoint,
        [NS.ll('actionBody')]: {
          [NS.rdf.type]: NS.sh.NodeShape,
          [NS.sh.targetClass]: NS.argu('Comment'),
          [NS.sh.property]: [
            {
              [NS.rdf.type]: NS.sh.PropertyShape,
              [NS.sh.datatype]: NS.xsd.string,
              [NS.sh.description]: 'prop con desc',
              [NS.sh.maxCount]: 1,
              [NS.sh.maxLength]: 100,
              [NS.sh.minCount]: 1,
              [NS.sh.minLength]: 4,
              [NS.sh.name]: 'prop con',
              [NS.sh.order]: 0,
              [NS.sh.path]: NS.schema.text,
            },
          ],
        },
      },
    },
    [proAction]: {
      '@id': proAction,
      [NS.rdf.type]: NS.schema.CreateAction,
      [NS.schema.result]: NS.argu('ProArgument'),
      [NS.schema.target]: {
        [NS.rdf.type]: NS.schema.EntryPoint,
        [NS.ll('actionBody')]: {
          [NS.rdf.type]: NS.sh.NodeShape,
          [NS.sh.targetClass]: NS.argu('Comment'),
          [NS.sh.property]: [
            {
              [NS.rdf.type]: NS.sh.PropertyShape,
              [NS.sh.datatype]: NS.xsd.string,
              [NS.sh.description]: 'prop pro desc',
              [NS.sh.maxCount]: 1,
              [NS.sh.maxLength]: 100,
              [NS.sh.minCount]: 1,
              [NS.sh.minLength]: 4,
              [NS.sh.name]: 'prop pro',
              [NS.sh.order]: 0,
              [NS.sh.path]: NS.schema.text,
            },
          ],
        },
      },
    },
    [NS.argu('ProArgument')]: {
      '@id': NS.argu('ProArgument'),
      [NS.rdf.type]: NS.rdfs.Class,
      [NS.rdfs.label]: 'Pro',
      [NS.schema.description]: 'Pro',
    },
    [NS.argu('ConArgument')]: {
      '@id': NS.argu('ConArgument'),
      [NS.rdf.type]: NS.rdfs.Class,
      [NS.rdfs.label]: 'Con',
      [NS.schema.description]: 'Con',
    },
  };

  it('keeps modification across action switches', () => {
    const subject = NS.ex('5');
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

    expect(getByTestId(subject.value)).toHaveFormValues({
      [schemaText]: '',
    });

    fireEvent.change(getByLabelText(/prop pro/), { target: { value: 'test' } });

    expect(getByTestId(subject.value)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(form.getFieldState(schemaText).dirty).toBeTruthy();

    expect(getByText('prop pro')).toBeVisible();
    expect(getByText('Con')).toBeVisible();
    fireEvent.click(getByText('Con'));

    expect(getByText('prop con')).toBeVisible();

    expect(getByTestId(subject.value)).toHaveFormValues({
      [schemaText]: 'test',
    });
    expect(form.getFieldState(schemaText).dirty).toBeTruthy();
  });
});
