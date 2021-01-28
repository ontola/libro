import * as dcterms from '@ontologies/dcterms';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import * as xsd from '@ontologies/xsd';
import { Resource } from 'link-redux';
import React from 'react';

import argu from '../ontology/argu';
import ex from '../ontology/ex';
import example from '../ontology/example';
import form from '../ontology/form';
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
  const objectIRI = ex.ns('testObject');
  const nameIRI = ex.ns('form/name');
  const pinIRI = ex.ns('form/pin');
  const locationIRI = ex.ns('form/location');

  const resources = {
    '@id': testIRI.value,
    [rdfx.type]: schema.UpdateAction,
    [dcterms.identifier]: testIRI,
    [schema.name]: 'Edit object',
    [schema.object]: {
      '@id': objectIRI,
      [rdfx.type]: example.ns('Resource'),
    },
    [schema.target]: {
      '@id': entryPointIRI,
      [rdfx.type]: schema.EntryPoint,
      [schema.httpMethod]: 'PUT',
      [schema.name]: 'Update',
      [schema.isPartOf]: testIRI,
      [schema.url]: example.ns('endpoint'),
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
                    '@id': nameIRI,
                    [rdfx.type]: form.TextInput,
                    [sh.datatype]: xsd.string,
                    [sh.maxCount]: 1,
                    [sh.name]: 'Name',
                    [sh.order]: 0,
                    [sh.path]: schema.name,
                  },
                  [rdfx.ns('_1')]: {
                    '@id': locationIRI,
                    [rdfx.type]: form.LocationInput,
                    [sh.shaclclass]: argu.Placement,
                    [sh.maxCount]: 1,
                    [sh.name]: 'Location',
                    [sh.order]: 1,
                    [sh.path]: schema.location,
                  },
                  [rdfx.ns('_2')]: {
                    '@id': pinIRI,
                    [rdfx.type]: form.CheckboxInput,
                    [sh.datatype]: xsd.xsdboolean,
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
                },
              },
            },
          },
        },
      },
    },
  };

  it('renders a form within Page', async () => {
    const {
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
    const formInstance = getByTestId(entryPointIRI.value);
    expect(formInstance).toBeVisible();

    // renders the form title
    const elem = getByText('Edit object');
    expect(elem).toBeVisible();
    expect(elem).toHaveClass('Heading');

    await wait();
    // initializes an empty form
    expect(formInstance).toHaveFormValues({
      [fieldName(schema.name)]: '',
      [fieldName(argu.ns('pin'))]: false,
    });

    // can edit the form values
    fireEvent.change(
      getByTestId(fieldName(schema.name)),
      { target: { value: 'text' } }
    );

    fireEvent.change(
      getByTestId(fieldName(argu.ns('pin'))),
      { target: { checked: true } }
    );

    expect(formInstance).toHaveFormValues({
      [fieldName(schema.name)]: 'text',
      [fieldName(argu.ns('pin'))]: true,
    });
  });
});
