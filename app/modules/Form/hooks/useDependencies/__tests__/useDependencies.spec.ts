/**
 * @jest-environment jsdom
 */

import { isNamedNode } from '@ontologies/core';

import { mockStorage } from '../../../../../../tests/test-utils';
import { renderLinkedHook } from '../../../../../../tests/test-utils-hooks';
import { useDependencies } from '../index';

import {
  actionBody,
  allResourcesData,
  commentActionBody,
  formAndNestedForm,
  formData,
  formID,
  formNestedFormsAndShInProp,
  object,
  objectCollectionItemsAndParent,
  objectData,
} from './getDependencies.spec';

const testUseDependencies = () => {
  const [_, storage] = mockStorage({});

  const [loading, objectDependencies, formDependencies] = useDependencies(
    storage,
    actionBody,
    object,
    formID,
  );

  return [
    loading,
    objectDependencies.filter(isNamedNode).sort(),
    formDependencies.filter(isNamedNode).sort(),
  ];
};

describe('useDependencies', () => {
  it('should return no values when form is not is present', async () => {
    const { queueEntitySpy, rerender, result } = await renderLinkedHook(
      testUseDependencies,
      objectData,
    );
    rerender();

    const [loading, objectDependencies, formDependencies] = result.current;

    expect(loading).toBeTruthy();
    expect(objectDependencies).toEqual([object]);
    expect(formDependencies).toEqual([actionBody]);

    const requested = [actionBody];
    expect(queueEntitySpy).toHaveBeenCalledTimes(requested.length);
    requested.map((record, i) => {
      expect(queueEntitySpy).toHaveBeenNthCalledWith(i + 1, record);
    });
  });

  it('should return empty values when loading', async () => {
    const { queueEntitySpy, rerender, result } = await renderLinkedHook(
      testUseDependencies,
      formData,
    );
    rerender();

    const [loading, objectDependencies, formDependencies] = result.current;

    expect(loading).toBeTruthy();
    expect(objectDependencies).toEqual([object]);
    expect(formDependencies).toEqual(formAndNestedForm);

    const requested = [object, commentActionBody];
    expect(queueEntitySpy).toHaveBeenCalledTimes(requested.length);
    requested.map((record, i) => {
      expect(queueEntitySpy).toHaveBeenNthCalledWith(i + 1, record);
    });
  });

  it('should return all values when all resources are present', async () => {
    const { queueEntitySpy, rerender, result } = await renderLinkedHook(
      testUseDependencies,
      allResourcesData,
    );
    rerender();

    const [loading, objectDependencies, formDependencies] = result.current;

    expect(loading).toBeFalsy();
    expect(objectDependencies).toEqual(objectCollectionItemsAndParent);
    expect(formDependencies).toEqual(formNestedFormsAndShInProp);
    expect(queueEntitySpy).not.toHaveBeenCalled();
  });
});
