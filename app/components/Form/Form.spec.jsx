import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import * as xsd from '@ontologies/xsd';
import { Resource } from 'link-redux';
import React from 'react';

import { calculateFormFieldName } from '../../helpers/forms';
import {
  getStorageKey,
  parseForStorage,
  serializeForStorage,
} from '../../helpers/persistence';
import argu from '../../ontology/argu';
import example from '../../ontology/example';
import form from '../../ontology/form';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import {
  cleanup,
  fireEvent,
  render,
  waitForElement,
} from '../../test-utils';
import { Page } from '../../topologies/Page';

const action = example.ns('new');
const entryPoint = example.ns('new#EntryPoint');
const formSelector = action.value;
const schemaText = calculateFormFieldName(schema.text);
const arguPassword = calculateFormFieldName(ontola.password);

const mockStorage = (initialValues) => {
  const store = initialValues;
  const storage = {
    getItem: (key) => store[key],
    setItem: (key, value) => { store[key] = value; },
  };

  return [store, storage];
};

describe('Form', () => {
  afterAll(cleanup);

  const resources = {
    '@id': action.value,
    [rdfx.type]: schema.CreateAction,
    [schema.name]: 'Action',
    [schema.result]: argu.ConArgument,
    [schema.object]: {},
    [schema.target]: {
      '@id': entryPoint,
      [rdfx.type]: schema.EntryPoint,
      [schema.isPartOf]: action,
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
                    [rdfx.type]: form.TextInput,
                    [sh.datatype]: xsd.string,
                    [schema.text]: 'text desc',
                    [sh.maxCount]: 1,
                    [sh.maxLength]: 100,
                    [sh.minCount]: 1,
                    [sh.minLength]: 4,
                    [schema.name]: 'text label',
                    [sh.order]: 0,
                    [sh.path]: schema.text,
                  },
                  [rdfx.ns('_1')]: {
                    [rdfx.type]: form.PasswordInput,
                    [sh.datatype]: xsd.string,
                    [sh.path]: ontola.password,
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  describe('persistence', async () => {
    it('retrieves an initial value from session storage', async () => {
      const [_, storage] = mockStorage({});
      const storeKey = getStorageKey(action.value, undefined, schema.text);
      storage.setItem(storeKey, serializeForStorage([rdf.literal('Test value')]));

      const {
        getByTestId,
      } = render(({ iri }) => (
        <Page>
          <Resource
            forceRender
            sessionStore={storage}
            subject={iri}
          />
        </Page>
      ), { resources });

      await waitForElement(() => getByTestId(btoa('http://schema.org/text')));

      expect(getByTestId(action.value)).toHaveFormValues({
        [btoa(schema.text.value)]: 'Test value',
      });
    });

    const testPersistence = async (fieldName, value) => {
      const [store, storage] = mockStorage({});

      const {
        getByTestId,
      } = render(({ iri }) => (
        <Page>
          <Resource
            forceRender
            sessionStore={storage}
            subject={iri}
          />
        </Page>
      ), { resources });

      await waitForElement(() => getByTestId(btoa('http://schema.org/text')));

      expect(getByTestId(formSelector)).toHaveFormValues({
        [fieldName]: '',
      });
      expect(store[fieldName]).toBe(undefined);

      fireEvent.change(getByTestId(fieldName), { target: { value } });

      expect(getByTestId(formSelector)).toHaveFormValues({
        [fieldName]: 'test',
      });

      return store[`${action.value}.${fieldName}`];
    };

    it('stores values', async () => {
      const result = await testPersistence(schemaText, 'test');
      expect(parseForStorage(result).map((val) => val.value)).toEqual(['test']);
    });

    it("doesn't store passwords", async () => {
      const result = await testPersistence(arguPassword, 'test');
      expect(result).toEqual(undefined);
    });
  });
});
