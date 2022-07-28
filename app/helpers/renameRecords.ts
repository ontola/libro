import rdf, { SomeTerm, isLiteral } from '@ontologies/core';
import { DataSlice, SomeNode } from 'link-lib';

const updatedId = (originalIds: SomeNode[], newIds: SomeNode[]) => {
  const plainOriginal = originalIds.map((it) => it.value);
  const plainNew = newIds.map((it) => it.value);

  return (id: string): string => {
    const i = plainOriginal.indexOf(id);

    if (i >= 0) {
      return plainNew[i];
    }

    return id;
  };

};

const updatedValue = (originalIds: SomeNode[], newIds: SomeNode[]) => {
  const idUpdater = updatedId(originalIds, newIds);

  return (term: SomeTerm): SomeTerm => {
    if (isLiteral(term)) {
      return term;
    }

    const updated = idUpdater(term.value);

    return updated.startsWith('_:')
      ? rdf.blankNode(updated)
      : rdf.namedNode(updated);
  };
};

export const renameRecords = (slice: DataSlice, original: SomeNode[], updated: SomeNode[]): DataSlice => {
  if (original.length === 0 || original.length !== updated.length) {
    throw new Error('Invalid argument for renameRecords');
  }

  const idUpdater = updatedId(original, updated);
  const updater = updatedValue(original, updated);

  return Object
    .entries(slice)
    .reduce((acc, [id, record]) => ({
      ...acc,
      [idUpdater(id)]: Object.entries(record).reduce((recordAcc, [field, value]) => ({
        ...recordAcc,
        [field]: Array.isArray(value) ? value.map(updater) : updater(value),
      }), {}),
    }), {});
};
