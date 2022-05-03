import {
  QuadPosition,
  Quadruple,
  Term,
  isBlankNode,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';

import {
  GlobalId,
  LangString,
  LocalId,
  Primitive,
  Seed,
  SeedDataRecord,
  Value,
} from '../../../../helpers/seed';

const toId = (t: Term): GlobalId | LocalId => {
  if (isNamedNode(t)) {
    return {
      type: 'id',
      v: t.value,
    };
  } else if (isBlankNode(t)) {
    return {
      type: 'lid',
      v: t.value,
    };
  }

  throw new Error('Term not named or blank node');
};

const toValue = (t: Term): Value => {
  if (isLiteral(t)) {
    if (t.language !== undefined && t.language !== '') {
      return {
        l: t.language,
        type: 'ls',
        v: t.value,
      } as LangString;
    }

    return {
      dt: t.datatype.value,
      type: 'p',
      v: t.value,
    } as Primitive;
  }

  return toId(t);
};

export const graphToSeed = (quads: Quadruple[]): Seed => {
  const partitioned: Record<string, Quadruple[]> = {};

  for (const quad of quads) {
    partitioned[quad[QuadPosition.subject].value] ||= [];
    partitioned[quad[QuadPosition.subject].value].push(quad);
  }

  return Object.entries(partitioned).reduce<Seed>((slice, [_, data]) => {
    const subject = data[0][QuadPosition.subject];

    const record: SeedDataRecord = data.reduce<SeedDataRecord>((acc, q) => {
      const predicate = q[QuadPosition.predicate].value;
      const value = toValue(q[QuadPosition.object]);

      if (Array.isArray(acc[predicate])) {
        (acc[predicate] as Value[]).push(value);
      } else if (acc[predicate] === undefined) {
        acc[predicate] = value;
      } else {
        acc[predicate] ||= [(acc[predicate] as Value), value];
      }

      return acc;
    }, {
      _id: toId(subject),
    } as SeedDataRecord);

    return {
      ...slice,
      [subject.value]: record,
    };
  }, {});
};
