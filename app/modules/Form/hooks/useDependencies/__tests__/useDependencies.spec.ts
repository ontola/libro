/**
 * @jest-environment jsdom
 */

import { isNamedNode } from '@ontologies/core';

import { mockStorage } from '../../../../../../tests/test-utils';
import { renderLinkedHook } from '../../../../../../tests/test-utils-hooks';
import { useDependencies } from '../index';

import {
  actionBody,
  allResources,
  allResourcesData,
  commentActionBody,
  formData,
  formID,
  object,
  objectAndForm,
  objectData,
  objectFormAndNestedForm,
} from './getDependencies.spec';

const testUseDependencies = () => {
  const [_, storage] = mockStorage({});

  const [loading, dependencies] = useDependencies(
    storage,
    actionBody,
    object,
    formID,
  );

  return [loading, dependencies.filter(isNamedNode).sort()];
};

describe('useDependencies', () => {
  it('should return no values when form is not is present', async () => {
    const { queueEntitySpy, rerender, result } = await renderLinkedHook(
      testUseDependencies,
      objectData,
    );
    rerender();

    const [loading, dependencies] = result.current;

    expect(loading).toBeTruthy();
    expect(dependencies).toEqual(objectAndForm);

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

    const [loading, dependencies] = result.current;

    expect(loading).toBeTruthy();
    expect(dependencies).toEqual(objectFormAndNestedForm);

    const requested = [commentActionBody, object];
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

    const [loading, dependencies] = result.current;

    expect(loading).toBeFalsy();
    expect(dependencies).toEqual(allResources);
    expect(queueEntitySpy).not.toHaveBeenCalled();
  });
});
