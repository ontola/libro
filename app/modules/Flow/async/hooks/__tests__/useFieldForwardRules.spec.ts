/**
 * @jest-environment jsdom
 */
import { NamedNode } from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import { waitFor } from '@testing-library/react';

import example from '../../../../../ontology/example';
import form from '../../../../../ontology/form';
import { renderLinkedHook } from '../../../../../test-utils-hooks';
import { useFieldForwardRulesImpl } from '../useFieldForwardRules';

const createField = (...fieldTypes: NamedNode[]) => fieldTypes.map((fieldType, index) => ({
  '@id': example.ns(`field${index}`).value,
  [rdf.type.value]: fieldType,
}));

const createRenderer = (...fieldData: NamedNode[]) => {
  const data = createField(...fieldData);

  return (initialField: NamedNode = example.ns('field0'), initialIsMobile = false) => renderLinkedHook(
    ({ field, isMobile }) => useFieldForwardRulesImpl(field, isMobile),
    data,
    {
      initialProps: {
        field: initialField,
        isMobile: initialIsMobile,
      },
    },
  );
};

describe('useFieldForwardRules', () => {
  describe('isAutoForwardField', () => {
    it('returns false when no data is present.', async () => {
      const { result } = await renderLinkedHook(
        () => useFieldForwardRulesImpl(undefined, false),
        {},
      );

      const { isAutoForwardField } = result.current;

      expect(isAutoForwardField).toEqual(false);
    });

    it('should be true when a field is an auto forward field.', async () => {
      const { result } = await createRenderer(form.RadioGroup)();

      const {
        isAutoForwardField,
      } = result.current;

      waitFor(() => expect(isAutoForwardField).toEqual(true));
    });

    it('should be false when a field is not an auto forward field.', async () => {
      const { result } = await createRenderer(form.TextAreaInput)();

      const {
        isAutoForwardField,
      } = result.current;

      waitFor(() => expect(isAutoForwardField).toEqual(false));
    });

    it('should be false on desktop and true on mobile for mobile only autoforward fields', async () => {
      const field = example.ns('field0');

      const { result, rerender } = await createRenderer(form.DateInput)(field, false);

      expect(result.current.isAutoForwardField).toBe(false);

      rerender({
        field,
        isMobile: true,
      });

      waitFor(() => expect(result.current.isAutoForwardField).toBe(true));
    });
  });

  describe('isForwardedByEnter', () => {
    it('returns true when no data is present', async () => {
      const { result } = await renderLinkedHook(
        () => useFieldForwardRulesImpl(undefined, false),
        {},
      );

      const {
        isForwardedByEnter,
      } = result.current;

      expect(isForwardedByEnter).toEqual(true);
    });

    it('should be true when the field is not an auto- or manually forwarded field', async () => {
      const { result } = await createRenderer(form.TextInput)();

      expect(result.current.isForwardedByEnter).toBe(true);
    });

    it('should be false when the field is a manually forwarded field', async () => {
      const { result } = await createRenderer(form.TextAreaInput)();

      waitFor(() => expect(result.current.isForwardedByEnter).toBe(false));
    });

    it('should be false when the field is an auto forwarded field', async () => {
      const { result } = await createRenderer(form.RadioGroup)();

      waitFor(() => expect(result.current.isForwardedByEnter).toBe(false));
    });

    it('should be false when isMobile is true', async () => {
      const { result } = await createRenderer(form.TextInput)(example.ns('field0'), true);

      waitFor(() => expect(result.current.isForwardedByEnter).toBe(false));
    });
  });

  it('should update when activeField changes.', async () => {
    const { result, rerender } = await createRenderer(form.TextAreaInput, form.RadioGroup)();

    expect(result.current.isAutoForwardField).toEqual(false);

    rerender({
      field: example.ns('field1'),
      isMobile: false,
    });

    waitFor(() => expect(result.current.isAutoForwardField).toEqual(true));
  });
});
