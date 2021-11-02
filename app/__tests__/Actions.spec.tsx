/**
 * @jest-environment jsdom
 */

import { Node } from '@ontologies/core';
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
  renderLinked,
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
    [rdfx.type.toString()]: schema.UpdateAction,
    [dcterms.identifier.toString()]: testIRI,
    [schema.name.toString()]: 'Edit object',
    [schema.object.toString()]: {
      '@id': objectIRI,
      [rdfx.type.toString()]: example.ns('Resource'),
    },
    [schema.target.toString()]: {
      '@id': entryPointIRI,
      [rdfx.type.toString()]: schema.EntryPoint,
      [schema.httpMethod.toString()]: 'PUT',
      [schema.name.toString()]: 'Update',
      [schema.isPartOf.toString()]: testIRI,
      [schema.url.toString()]: example.ns('endpoint'),
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
                    '@id': nameIRI,
                    [rdfx.type.toString()]: form.TextInput,
                    [sh.datatype.toString()]: xsd.string,
                    [sh.maxCount.toString()]: 1,
                    [sh.name.toString()]: 'Name',
                    [sh.order.toString()]: 0,
                    [sh.path.toString()]: schema.name,
                  },
                  [rdfx.ns('_1').toString()]: {
                    '@id': locationIRI,
                    [rdfx.type.toString()]: form.LocationInput,
                    [sh.shaclclass.toString()]: argu.Placement,
                    [sh.maxCount.toString()]: 1,
                    [sh.name.toString()]: 'Location',
                    [sh.order.toString()]: 1,
                    [sh.path.toString()]: schema.location,
                  },
                  [rdfx.ns('_2').toString()]: {
                    '@id': pinIRI,
                    [rdfx.type.toString()]: form.CheckboxInput,
                    [sh.datatype.toString()]: xsd.xsdboolean,
                    [sh.maxCount.toString()]: 1,
                    [sh.name.toString()]: 'Pin',
                    [sh.description.toString()]: 'Pin to top of collection',
                    [sh.order.toString()]: 2,
                    [sh.path.toString()]: argu.ns('pin'),
                    [sh.group.toString()]: {
                      [rdfx.type.toString()]: sh.PropertyGroup,
                      [rdfs.label.toString()]: 'Advanced',
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
      findByTestId,
      findByText,
      getByTestId,
    } = await renderLinked(({ iri }) => (
      <Page>
        <Resource
          forceRender
          subject={iri}
        />
      </Page>
    ), { resources });

    const fieldName = (prop: Node) => btoa(prop.value);

    // renders the form
    const formInstance = await findByTestId(entryPointIRI.value);
    expect(formInstance).toBeVisible();

    // renders the form title
    const elem = await findByText('Edit object');
    expect(elem).toBeVisible();
    expect(elem).toHaveClass('Heading');

    // initializes an empty form
    expect(formInstance).toHaveFormValues({
      [fieldName(schema.name)]: '',
      [fieldName(argu.ns('pin'))]: false,
    });

    // can edit the form values
    fireEvent.change(
      getByTestId(fieldName(schema.name)),
      { target: { value: 'text' } },
    );

    fireEvent.change(
      getByTestId(fieldName(argu.ns('pin'))),
      { target: { checked: true } },
    );

    expect(formInstance).toHaveFormValues({
      [fieldName(schema.name)]: 'text',
      [fieldName(argu.ns('pin'))]: true,
    });
  });
});
