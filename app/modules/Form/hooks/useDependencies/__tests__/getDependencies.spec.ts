/**
 * @jest-environment jsdom
 */

import * as as from '@ontologies/as';
import rdf, { isNamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { SomeNode, seq } from 'link-lib';
import { useLRS } from 'link-redux';

import { mockStorage } from '../../../../../../tests/test-utils';
import { renderLinkedHook } from '../../../../../../tests/test-utils-hooks';
import example from '../../../../Kernel/ontology/example';
import ontola from '../../../../Kernel/ontology/ontola';
import form from '../../../ontology/form';
import { addDependencies } from '../addDependencies';

export const actionBody = example.ns('form');
export const commentActionBody = example.ns('forms/comment');
export const parentActionBody = example.ns('forms/parent');
export const object = example.ns('object');
export const parentObject = example.ns('object/parent');
export const firstNestedObject = example.ns('nestedObject/1');
export const secondNestedObject = example.ns('nestedObject/2');
export const commentCollection = example.ns('c');
export const commentCollectionPage = example.ns('c?page=1');
export const textURL = example.ns('textURL');
export const publisherObject = example.ns('publisher');
export const linkedURL = example.ns('linkedURL');
export const formID = 'FORM_ID';

export const formData = {
  '@id': actionBody.value,
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
              [sh.path.toString()]: schema.name,
            },
            [rdfx.ns('_1').toString()]: {
              [rdfx.type.toString()]: form.TextInput,
              [sh.path.toString()]: schema.text,
            },
            [rdfx.ns('_2').toString()]: {
              [rdfx.type.toString()]: ontola.Condition,
              [ontola.pass.toString()]: {
                [rdfx.type.toString()]: form.PasswordInput,
                [sh.path.toString()]: schema.description,
              },
            },
            [rdfx.ns('_3').toString()]: {
              [rdfx.type.toString()]: form.AssociationInput,
              [sh.path.toString()]: schema.comment,
              [form.form.toString()]: commentActionBody,
            },
          },
        },
      },
    },
  },
};

export const nestedFormData = {
  '@id': commentActionBody.value,
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
              [rdfx.type.toString()]: form.AssociationInput,
              [sh.path.toString()]: schema.isPartOf,
              [form.form.toString()]: parentActionBody,
            },
            [rdfx.ns('_1').toString()]: {
              [rdfx.type.toString()]: form.TextInput,
              [sh.path.toString()]: schema.url,
            },
            [rdfx.ns('_2').toString()]: {
              [rdfx.type.toString()]: form.ResourceField,
              [sh.path.toString()]: schema.publisher,
            },
            [rdfx.ns('_3').toString()]: {
              [rdfx.type.toString()]: form.ResourceField,
              [schema.url.toString()]: linkedURL,
            },
          },
        },
      },
    },
  },
};

export const parentFormData = {
  '@id': parentActionBody.value,
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
              [sh.path.toString()]: schema.name,
            },
          },
        },
      },
    },
  },
};

export const objectData = {
  '@id': object.value,
  [rdfx.type.toString()]: schema.Thing,
  [schema.name.toString()]: 'Object',
  [schema.description.toString()]: 'Description',
  [schema.comment.toString()]: commentCollection,
};

export const commentCollectionData = {
  '@id': commentCollection.value,
  [rdfx.type.toString()]: as.Collection,
  [ontola.pages.toString()]: commentCollectionPage,
};

export const commentCollectionPageData = {
  '@id': commentCollectionPage.value,
  [rdfx.type.toString()]: ontola.PaginatedView,
  [as.items.toString()]: seq([
    firstNestedObject,
    secondNestedObject,
  ]),
};

export const firstNestedObjectData = {
  '@id': firstNestedObject.value,
  [rdfx.type.toString()]: schema.Thing,
  [schema.name.toString()]: 'Nested Object 1',
  [schema.isPartOf.toString()]: parentObject,
};

export const secondNestedObjectData = {
  '@id': secondNestedObject.value,
  [rdfx.type.toString()]: schema.Thing,
  [schema.name.toString()]: 'Nested Object 2',
  [schema.url.toString()]: textURL,
  [schema.publisher.toString()]: publisherObject,
};

export const parentObjectData = {
  '@id': parentObject.value,
  [rdfx.type.toString()]: schema.Thing,
  [schema.name.toString()]: 'Parent',
};

export const linkedURLData = {
  '@id': linkedURL.value,
  [rdfx.type.toString()]: schema.Thing,
};

export const publisherData = {
  '@id': publisherObject.value,
  [rdfx.type.toString()]: schema.Thing,
};

export const objectAndFormData = [
  objectData,
  formData,
];

export const objectFormsAndNestedFormData = [
  ...objectAndFormData,
  nestedFormData,
];

export const objectFormNestedFormAndCollectionData = [
  ...objectFormsAndNestedFormData,
  commentCollectionData,
];

export const objectFormNestedFormCollectionPageData = [
  ...objectFormNestedFormAndCollectionData,
  commentCollectionPageData,
];

export const objectFormNestedFormCollectionItemsData = [
  ...objectFormNestedFormCollectionPageData,
  firstNestedObjectData,
  secondNestedObjectData,
];

export const allResourcesData = [
  ...objectFormNestedFormCollectionItemsData,
  parentFormData,
  parentObjectData,
  linkedURLData,
  publisherData,
];

export const emptyValues = {
  [btoa(schema.comment.value)]: [],
  [btoa(schema.text.value)]: [],
  [btoa(schema.name.value)]: [],
  [btoa(schema.description.value)]: [],
};

export const allValues = {
  [btoa(schema.comment.value)]: [{
    '@id': firstNestedObject,
    [btoa(schema.isPartOf.value)]: [{
      '@id': parentObject,
      [btoa(schema.name.value)]: [rdf.literal('Parent')],
    }],
    [btoa(schema.publisher.value)]: [],
    [btoa(schema.url.value)]: [],
  }, {
    '@id': secondNestedObject,
    [btoa(schema.isPartOf.value)]: [],
    [btoa(schema.publisher.value)]: [publisherObject],
    [btoa(schema.url.value)]: [textURL],
  }],
  [btoa(schema.text.value)]: [],
  [btoa(schema.name.value)]: [rdf.literal('Object')],
  [btoa(schema.description.value)]: [rdf.literal('Description')],
};

export const objectAndForm = [
  object,
  actionBody,
].sort();

export const objectFormAndNestedForm = [
  ...objectAndForm,
  commentActionBody,
].sort();

export const objectFormNestedFormAndCollection = [
  ...objectFormAndNestedForm,
  commentCollection,
].sort();

export const objectFormNestedFormsAndCollection = [
  ...objectFormNestedFormAndCollection,
  parentActionBody,
  linkedURL,
].sort();

export const objectFormNestedFormsCollectionPage = [
  ...objectFormAndNestedForm,
  commentCollection,
  commentCollectionPage,
  parentActionBody,
  linkedURL,
].sort();

export const objectFormNestedFormsAndCollectionItems = [
  ...objectFormNestedFormsCollectionPage,
  firstNestedObject,
  secondNestedObject,
].sort();

export const allResources = [
  ...objectFormNestedFormsAndCollectionItems,
  publisherObject,
  parentObject,
].sort();

const testGetDependencies = () => {
  const lrs = useLRS();
  const [_, storage] = mockStorage({});

  const dependentResources = new Set<SomeNode>();

  addDependencies(dependentResources, lrs, storage, actionBody, [object], formID, false);

  return [...dependentResources].filter(isNamedNode).sort();
};

describe('getDependencies', () => {
  it('includes all dependencies with object', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      objectData,
    );

    expect(result.current).toEqual(objectAndForm);
  });

  it('includes all dependencies with form', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      formData,
    );

    expect(result.current).toEqual(objectFormAndNestedForm);
  });

  it('includes all dependencies with object and form', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      objectAndFormData,
    );

    expect(result.current).toEqual(objectFormNestedFormAndCollection);
  });

  it('includes all dependencies with object, form and nested form', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      objectFormsAndNestedFormData,
    );

    expect(result.current).toEqual(objectFormNestedFormsAndCollection);
  });

  it('includes all dependencies with object, form and collection', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      objectFormNestedFormAndCollectionData,
    );

    expect(result.current).toEqual(objectFormNestedFormsCollectionPage);
  });

  it('includes all dependencies with object, form, collection and page', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      objectFormNestedFormCollectionPageData,
    );

    expect(result.current).toEqual(objectFormNestedFormsAndCollectionItems);
  });

  it('includes all dependencies with object, form, collection, page and items', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      objectFormNestedFormCollectionItemsData,
    );

    expect(result.current).toEqual(allResources);
  });

  it('includes all dependencies with all resources', async () => {
    const { result } = await renderLinkedHook(
      testGetDependencies,
      allResourcesData,
    );

    expect(result.current).toEqual(allResources);
  });
});
