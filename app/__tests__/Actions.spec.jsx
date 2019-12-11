import dcterms from '@ontologies/dcterms';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import xsd from '@ontologies/xsd';
import { Resource } from 'link-redux';
import React from 'react';

import argu from '../ontology/argu';
import ex from '../ontology/ex';
import example from '../ontology/example';
import ll from '../ontology/ll';
import { Page } from '../topologies/Page';
import {
  cleanup,
  fireEvent,
  render,
  wait,
} from '../test-utils';

describe('Actions', () => {
  afterAll(cleanup);

  const testIRI = ex.ns('test');
  const entryPointIRI = example.ns('test/edit');
  const nameIRI = ex.ns('form/name');
  const pinIRI = ex.ns('form/pin');
  const locationIRI = ex.ns('form/location');

  const resources = {
    '@id': testIRI.value,
    [rdfx.type]: schema.UpdateAction,
    [dcterms.identifier]: testIRI,
    [schema.name]: 'Edit object',
    [schema.object]: ex.ns(''),
    [schema.target]: {
      '@id': entryPointIRI,
      [rdfx.type]: schema.EntryPoint,
      [schema.httpMethod]: 'PUT',
      [schema.name]: 'Update',
      [schema.url]: example.ns('endpoint'),
      [ll.actionBody]: {
        [rdfx.type]: sh.NodeShape,
        [sh.targetNode]: {
          '@id': example.ns('resource'),
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
            [sh.class]: argu.Placement,
            [sh.maxCount]: 1,
            [sh.name]: 'Location',
            [sh.order]: 1,
            [sh.path]: schema.location,
          },
          {
            '@id': pinIRI,
            [rdfx.type]: sh.PropertyShape,
            [sh.datatype]: xsd.boolean,
            [sh.maxCount]: 1,
            [sh.name]: 'Pin',
            [sh.description]: 'Pin to top of collection',
            [sh.order]: 2,
            [sh.path]: argu.ns('pin'),
            [sh.group]: {
              [rdfx.type]: sh.PropertyGroup,
              [rdfs.label]: 'Advanced',
            },
          },
        ],
      },
    },
  };

  it('renders a form within Page', async () => {
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

    const fieldName = (prop) => btoa(prop.value);

    await wait();
    // renders the form
    const form = getByTestId(entryPointIRI.value);
    expect(form).toBeVisible();

    // renders the form title
    const elem = getByText('Edit object');
    expect(elem).toBeVisible();
    expect(elem).toHaveClass('Heading');

    await wait();
    // initializes an empty form
    expect(form).toHaveFormValues({
      [fieldName(schema.name)]: '',
      [fieldName(argu.ns('pin'))]: false,
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
      [fieldName(argu.ns('pin'))]: true,
    });
  });
});
