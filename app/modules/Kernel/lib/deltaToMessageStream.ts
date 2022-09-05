import rdf, {
  QuadPosition,
  Quadruple,
} from '@ontologies/core';
import {
  AddFieldMessage,
  FieldSet,
  Messages,
  SetRecordMessage,
  addField,
  deleteAllFieldsMatching,
  deleteField,
  deleteFieldMatching,
  equals,
  invalidateAllWithProperty,
  invalidateRecord,
  mergeTerms,
  setField,
  setRecord,
} from 'link-lib';

import ld from '../ontology/ld';
import ll from '../ontology/ll';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';

const convertAdd = (delta: Quadruple[]): AddFieldMessage[] => {
  const messages: AddFieldMessage[] = [];

  for (const statement of delta) {
    const [id, field, value, graph] = statement;

    if (!equals(graph, ld.add)) {
      continue;
    }

    messages.push(addField(id.value, field.value, value));
  }

  return messages;
};

const convertSupplant = (delta: Quadruple[]): SetRecordMessage[] => {
  const fieldMaps = delta
    .filter((it) => equals(it[QuadPosition.graph], ld.supplant))
    .reduce<Record<string, FieldSet>>((acc, [id, field, value]) => {
      const prior: FieldSet = acc[id.value] ?? {};

      return ({
        ...acc,
        [id.value]: {
          ...prior,
          [field.value]: mergeTerms(prior[field.value], value),
        },
      });
    }, {});

  return Object.entries(fieldMaps).map(([id, fields]) => setRecord(id, fields));
};

const convertRemove = (delta: Quadruple[]): Messages[] => {
  const messages: Messages[] = [];

  for (const statement of delta) {
    const [id, field, value, graph] = statement;

    if (!equals(graph, ontola.remove)) {
      continue;
    }

    const wildId = equals(id, sp.Variable);
    const wildField = equals(field, sp.Variable);
    const wildValue = equals(value, sp.Variable);

    if (!wildId && !wildField && !wildValue) {
      messages.push(deleteFieldMatching(id.value, field.value, value));
    } else if (!wildId && !wildField && wildValue) {
      messages.push(deleteField(id.value, field.value));
    } else if (wildId && !wildField && !wildValue) {
      messages.push(deleteAllFieldsMatching(field.value, value));
    } else {
      throw new Error('unexpected pattern for ontola:remove');
    }
  }

  return messages;
};

const convertInvalidate = (delta: Quadruple[]): Messages[] => {
  const messages: Messages[] = [];

  for (const statement of delta) {
    const [id, field, value, graph] = statement;

    if (!equals(graph, ontola.invalidate)) {
      continue;
    }

    const wildId = equals(id, sp.Variable);
    const wildField = equals(field, sp.Variable);
    const wildValue = equals(value, sp.Variable);

    if (!wildId && wildField && wildValue) {
      messages.push(invalidateRecord(id.value));
    } else if (wildId && !wildField && !wildValue) {
      messages.push(invalidateAllWithProperty(field.value, value));
    } else {
      throw new Error('unexpected pattern for ontola:invalidate');
    }
  }

  return messages;
};

const convertReplace = (delta: Quadruple[]): Messages[] => {
  const messages: Messages[] = [];
  const defaultGraph = rdf.defaultGraph();

  for (const statement of delta) {
    const [id, field, value, graph] = statement;

    if (!(equals(graph, ontola.replace) || equals(graph, ld.replace) || equals(graph, defaultGraph))) {
      continue;
    }

    const wildId = equals(id, sp.Variable);
    const wildField = equals(field, sp.Variable);
    const wildValue = equals(value, sp.Variable);

    if (!wildId && !wildField && !wildValue) {
      messages.push(setField(id.value, field.value, value));
    } else {
      throw new Error('unexpected pattern for ontola:invalidate');
    }
  }

  return messages;
};

export const deltaToMessageStream = (delta: Quadruple[]): Messages[] => {
  const defaultGraph = rdf.defaultGraph();
  const messages: Messages[] = [];

  messages.push(...convertAdd(delta));
  messages.push(...convertSupplant(delta));
  messages.push(...convertRemove(delta));
  messages.push(...convertInvalidate(delta));
  messages.push(...convertReplace(delta));

  const leftover = delta.filter((it) => !equals(it[QuadPosition.graph], ld.supplant)
    && !equals(it[QuadPosition.graph], ontola.remove)
    && !equals(it[QuadPosition.graph], ontola.invalidate)
    && !equals(it[QuadPosition.graph], ontola.replace)
    && !equals(it[QuadPosition.graph], defaultGraph)
    && !equals(it[QuadPosition.graph], ld.add)
    && !equals(it[QuadPosition.graph], ld.replace)
    && !equals(it[QuadPosition.graph], ll.meta));

  if (leftover.length > 0) {
    throw new Error(`Leftover deltas: ${leftover}`);
  }

  return messages;
};
