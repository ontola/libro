/**
 * @jest-environment jsdom
 */

import { useLRS } from 'link-redux';

import { mockStorage } from '../../../../../../tests/test-utils';
import { renderLinkedHook } from '../../../../../../tests/test-utils-hooks';
import { getDependencies } from '../getDependencies';

import {
  actionBody,
  allResourcesData,
  commentActionBody,
  commentCollection,
  commentCollectionPage,
  firstNestedObject,
  formData,
  formID,
  linkedURL,
  object,
  objectAndFormData,
  objectData,
  objectFormNestedFormAndCollectionData,
  objectFormNestedFormCollectionItemsData,
  objectFormNestedFormCollectionPageData,
  objectFormsAndNestedFormData,
  parentActionBody,
  parentObject,
  publisherObject,
  secondNestedObject,
} from './useInitialValues.spec';

const objectAndForm = [
  object,
  actionBody,
].sort();

const objectFormAndNestedForm = [
  ...objectAndForm,
  commentActionBody,
].sort();

const objectFormNestedFormAndCollection = [
  ...objectFormAndNestedForm,
  commentCollection,
].sort();

const objectFormNestedFormsAndCollection = [
  ...objectFormNestedFormAndCollection,
  parentActionBody,
  linkedURL,
].sort();

const objectFormNestedFormsCollectionPage = [
  ...objectFormAndNestedForm,
  commentCollectionPage,
  parentActionBody,
  linkedURL,
].sort();

const objectFormNestedFormsAndCollectionItems = [
  ...objectFormAndNestedForm,
  parentActionBody,
  linkedURL,
  firstNestedObject,
  secondNestedObject,
].sort();

const allResources = [
  ...objectFormNestedFormsAndCollectionItems,
  publisherObject,
  parentObject,
].sort();

const testGetDependencies = () => {
  const lrs = useLRS();
  const [_, storage] = mockStorage({});

  return getDependencies(lrs, storage, actionBody, object, formID, false).sort();
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
