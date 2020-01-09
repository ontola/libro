import dcterms from '@ontologies/dcterms';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import xsd from '@ontologies/xsd';
import { defaultNS as NS } from 'link-lib';
import { Resource } from 'link-redux';
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
    [rdfx.type]: schema.UpdateAction,
    [dcterms.identifier]: testIRI,
    [schema.name]: 'Edit object',
    [schema.object]: NS.ex(''),
    [schema.target]: {
      [rdfx.type]: schema.EntryPoint,
      [schema.httpMethod]: 'PUT',
      [schema.name]: 'Update',
      [schema.url]: NS.example('endpoint'),
      [NS.ll('actionBody')]: {
        [rdfx.type]: sh.NodeShape,
        [sh.targetNode]: {
          '@id': NS.example('resource'),
          [rdfx.type]: schema.Thing,
        },
        [sh.property]: [
          {
            '@id': nameIRI,
            [rdfx.type]: sh.PropertyShape,
            [sh.datatype]: xsd.string,
            [sh.maxCount]: 1,
            [sh.name]: 'Name',
            [sh.order]: 0,
            [sh.path]: schema.name,
          },
          {
            '@id': locationIRI,
            [rdfx.type]: sh.PropertyShape,
            [sh.class]: NS.argu('Placement'),
            [sh.maxCount]: 1,
            [sh.name]: 'Location',
            [sh.order]: 1,
            [sh.path]: schema.location,
            [NS.argu('referredShapes')]: {
              [rdfx.type]: sh.NodeShape,
              [sh.targetClass]: NS.argu('Placement'),
            },
          },
          {
            '@id': pinIRI,
            [rdfx.type]: sh.PropertyShape,
            [sh.datatype]: xsd.boolean,
            [sh.maxCount]: 1,
            [sh.name]: 'Pin',
            [sh.description]: 'Pin to top of collection',
            [sh.order]: 2,
            [sh.path]: NS.argu('pin'),
            [sh.group]: {
              [rdfx.type]: sh.PropertyGroup,
              [rdfs.label]: 'Advanced',
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
        <Resource
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
      [fieldName(schema.name)]: '',
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
      [fieldName(schema.name)]: 'text',
      [fieldName(NS.argu('pin'))]: true,
    });
  });
});
