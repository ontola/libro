import { defaultNS as NS } from 'link-lib';
import { LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { Page } from '../topologies/Page';
import {
  cleanup,
  fireEvent,
  render,
} from '../test-utils';

describe('Actions', () => {
  afterAll(cleanup);

  const testIRI = NS.ex('test');
  const nameIRI = NS.ex('form/name');
  const pinIRI = NS.ex('form/pin');
  const locationIRI = NS.ex('form/location');

  const resources = {
    '@id': testIRI.value,
    [NS.rdf.type]: NS.schema.UpdateAction,
    [NS.dc.identifier]: testIRI,
    [NS.schema.name]: 'Edit object',
    [NS.schema.object]: NS.ex(''),
    [NS.schema.target]: {
      [NS.rdf.type]: NS.schema.EntryPoint,
      [NS.schema.httpMethod]: 'PUT',
      [NS.schema.name]: 'Update',
      [NS.schema.url]: NS.example('endpoint'),
      [NS.ll('actionBody')]: {
        [NS.rdf.type]: NS.sh.NodeShape,
        [NS.sh.targetNode]: {
          '@id': NS.example('resource'),
          [NS.rdf.type]: NS.schema.Thing,
        },
        [NS.sh.property]: [
          {
            '@id': nameIRI,
            [NS.rdf.type]: NS.sh.PropertyShape,
            [NS.sh.datatype]: NS.xsd.string,
            [NS.sh.maxCount]: 1,
            [NS.sh.name]: 'Name',
            [NS.sh.order]: 0,
            [NS.sh.path]: NS.schema.name,
          },
          {
            '@id': locationIRI,
            [NS.rdf.type]: NS.sh.PropertyShape,
            [NS.sh.class]: NS.argu('Placement'),
            [NS.sh.maxCount]: 1,
            [NS.sh.name]: 'Location',
            [NS.sh.order]: 1,
            [NS.sh.path]: NS.schema.location,
            [NS.argu('referredShapes')]: {
              [NS.rdf.type]: NS.sh.NodeShape,
              [NS.sh.targetClass]: NS.argu('Placement'),
            },
          },
          {
            '@id': pinIRI,
            [NS.rdf.type]: NS.sh.PropertyShape,
            [NS.sh.datatype]: NS.xsd.boolean,
            [NS.sh.maxCount]: 1,
            [NS.sh.name]: 'Pin',
            [NS.sh.description]: 'Pin to top of collection',
            [NS.sh.order]: 2,
            [NS.sh.path]: NS.argu('pin'),
            [NS.sh.group]: {
              [NS.rdf.type]: NS.sh.PropertyGroup,
              [NS.rdfs.label]: 'Advanced',
            },
          },
        ],
      },
    },
  };

  it('renders a form within Page', () => {
    const {
      getByLabelText,
      getByTestId,
      getByText,
    } = render(({ iri }) => (
      <Page>
        <LinkedResourceContainer
          forceRender
          subject={iri}
        />
      </Page>
    ), { resources });

    const fieldName = prop => btoa(prop.value);

    // renders the form
    const form = getByTestId(NS.example('endpoint').value);
    expect(form).toBeVisible();

    // renders the form title
    const elem = getByText('Edit object');
    expect(elem).toBeVisible();
    expect(elem).toHaveClass('Heading');

    // initializes an empty form
    expect(form).toHaveFormValues({
      [fieldName(NS.schema.name)]: '',
      [fieldName(NS.argu('pin'))]: false,
    });

    // can edit the form values
    fireEvent.change(
      getByLabelText('Name'),
      { target: { value: 'text' } }
    );

    fireEvent.change(
      getByLabelText('Pin'),
      { target: { checked: true } }
    );

    expect(form).toHaveFormValues({
      [fieldName(NS.schema.name)]: 'text',
      [fieldName(NS.argu('pin'))]: true,
    });
  });
});
