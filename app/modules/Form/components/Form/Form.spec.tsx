/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import * as xsd from '@ontologies/xsd';
import { Resource } from 'link-redux';
import React from 'react';

import {
  fireEvent,
  mockStorage,
  renderLinked,
} from '../../../../../tests/test-utils';
import argu from '../../../Argu/ontology/argu';
import {
  getStorageKey,
  parseForStorage,
  serializeForStorage,
} from '../../../Common/lib/persistence';
import Page from '../../../Common/topologies/Page';
import example from '../../../Kernel/ontology/example';
import ll from '../../../Kernel/ontology/ll';
import ontola from '../../../Kernel/ontology/ontola';
import dependencies from '../../dependencies';
import { calculateFormFieldName } from '../../lib/helpers';
import form from '../../ontology/form';

const action = example.ns('new');
const entryPoint = example.ns('new#EntryPoint');
const formSelector = action.value;
const schemaText = calculateFormFieldName(schema.text);
const arguPassword = calculateFormFieldName(ontola.password);
const commentObject = calculateFormFieldName(schema.comment);
const commentText = calculateFormFieldName(schema.comment, 0, schema.text);

const storedValue = (store: Record<string, string>, fieldName: string) => parseForStorage(store[`${action.value}.${fieldName}`]);

describe('Form', () => {
  const resources = {
    '@id': action.value,
    [rdfx.type.toString()]: schema.CreateAction,
    [schema.name.toString()]: 'Action',
    [schema.result.toString()]: argu.ConArgument,
    [schema.object.toString()]: {},
    [schema.target.toString()]: {
      '@id': entryPoint,
      [rdfx.type.toString()]: schema.EntryPoint,
      [schema.isPartOf.toString()]: action,
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
                    [rdfx.type.toString()]: form.TextInput,
                    [sh.datatype.toString()]: xsd.string,
                    [schema.text.toString()]: 'text desc',
                    [sh.maxCount.toString()]: 1,
                    [sh.maxLength.toString()]: 100,
                    [sh.minCount.toString()]: 1,
                    [sh.minLength.toString()]: 4,
                    [schema.name.toString()]: 'text label',
                    [sh.order.toString()]: 0,
                    [sh.path.toString()]: schema.text,
                  },
                  [rdfx.ns('_1').toString()]: {
                    [rdfx.type.toString()]: form.PasswordInput,
                    [sh.datatype.toString()]: xsd.string,
                    [sh.path.toString()]: ontola.password,
                  },
                  [rdfx.ns('_2').toString()]: {
                    [rdfx.type.toString()]: form.AssociationInput,
                    [sh.path.toString()]: schema.comment,
                    [sh.minCount.toString()]: 1,
                    [form.form.toString()]: {
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
                                  [rdfx.type.toString()]: form.TextInput,
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
              },
            },
          },
        },
      },
    },
  };

  describe('persistence', () => {
    it('retrieves an initial value from session storage', async () => {
      const [_, storage] = mockStorage({});
      const storeKey = getStorageKey(action.value, undefined, schema.text);
      storage.setItem(storeKey, serializeForStorage([rdf.literal('Test value')]));

      const {
        findByTestId,
        getByTestId,
      } = await renderLinked(({ iri }) => (
        <Page>
          <Resource
            forceRender
            sessionStore={storage}
            subject={iri}
          />
        </Page>
      ), {
        modules: dependencies,
        resources,
      });

      await findByTestId(btoa('http://schema.org/text'));

      expect(getByTestId(action.value)).toHaveFormValues({
        [btoa(schema.text.value)]: 'Test value',
      });
    });

    const testPersistence = async (fieldName: string, value: unknown) => {
      const [store, storage] = mockStorage({});

      const {
        findByTestId,
        getByTestId,
      } = await renderLinked(({ iri }) => (
        <Page>
          <Resource
            forceRender
            sessionStore={storage}
            subject={iri}
          />
        </Page>
      ), {
        modules: dependencies,
        resources,
      });

      await findByTestId(btoa('http://schema.org/text'));

      expect(getByTestId(formSelector)).toHaveFormValues({
        [fieldName]: '',
      });
      expect(store[fieldName]).toBe(undefined);

      fireEvent.change(getByTestId(fieldName), { target: { value } });

      expect(getByTestId(formSelector)).toHaveFormValues({
        [fieldName]: 'test',
      });

      return store;
    };

    it('stores values', async () => {
      const result = await testPersistence(schemaText, 'test');
      expect(storedValue(result, schemaText)!.map((val) => val.value)).toEqual(['test']);
    });

    it("doesn't store passwords", async () => {
      const result = await testPersistence(arguPassword, 'test');
      expect(storedValue(result, arguPassword)).toEqual(undefined);
    });

    it('saves association when changing a nested value', async () => {
      const result = await testPersistence(commentText, 'test');
      const commentBody = storedValue(result, commentObject);
      expect(commentBody).toBeDefined();
      const textKey = calculateFormFieldName(commentBody![0], schema.text);
      expect(storedValue(result, textKey)!.map((val) => val.value)).toEqual(['test']);
    });
  });
});
