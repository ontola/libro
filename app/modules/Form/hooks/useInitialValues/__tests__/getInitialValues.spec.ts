/**
 * @jest-environment jsdom
 */

import { useLRS } from 'link-redux';

import { mockStorage } from '../../../../../../tests/test-utils';
import { renderLinkedHook } from '../../../../../../tests/test-utils-hooks';
import { getInitialValues } from '../getInitialValues';
import {
  actionBody,
  allResourcesData,
  allValues,
  emptyValues,
  formData,
  formID,
  object,
  objectData,
} from '../../useDependencies/__tests__/getDependencies.spec';

const testGetInitialValues = () => {
  const lrs = useLRS();
  const [_, storage] = mockStorage({});

  return getInitialValues(lrs, storage, actionBody, object, formID, false);
};

describe('getInitialValues', () => {
  it('should return no values when form is not is present', async () => {
    const { result } = await renderLinkedHook(
      testGetInitialValues,
      [objectData],
    );

    expect(result.current).toEqual({});
  });

  it('should return empty values when object is not is present', async () => {
    const { result } = await renderLinkedHook(
      testGetInitialValues,
      [formData],
    );

    expect(result.current).toEqual(emptyValues);
  });

  it('should return all values when all resources are present', async () => {
    const { result } = await renderLinkedHook(
      testGetInitialValues,
      allResourcesData,
    );

    expect(result.current).toEqual(allValues);
  });
});
