import {
  Node,
  QuadPosition,
  Quadruple, 
} from '@ontologies/core';
import * as rdf from '@ontologies/rdf';
import { RecordState, equals } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import ll from '../ontology/ll';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';

export interface DeltaProcessors {
  deltas: Quadruple[][];
  flush(): Set<string>;
  processDelta(delta: Quadruple[]): void;
  queueDelta(delta: Quadruple[], subjects: number[]): void;
}

function processRemove(delta: Quadruple[], lrs: LinkReduxLRSType) {
  const removes = delta.filter(([, , , why]) => equals(why, ontola.remove));

  for (const [s, p, o] of removes) {
    const wildSubject = equals(s, sp.Variable);
    const wildPredicate = equals(p, sp.Variable);
    const wildObject = equals(o, sp.Variable);

    if (!wildSubject && !wildPredicate && wildObject) {
      lrs.store.getInternalStore().store.deleteField(s.value, p.value);
    } else if (!wildSubject && !wildPredicate && !wildObject) {
      lrs.store.getInternalStore().store.deleteFieldMatching(s.value, p.value, o);
    } else if (!wildSubject && wildPredicate && wildObject) {
      lrs.store.removeResource(s);
    } else {
      lrs.store.removeQuads(
        lrs.store.match(
          wildSubject ? null : s,
          wildPredicate ? null : p,
          wildObject ? null : o as Node,
        ),
      );
    }
  }
}

function processReplace(delta: Quadruple[], lrs: LinkReduxLRSType) {
  const store = lrs.store.getInternalStore().store;
  const replaceables = delta.filter(([s, , , g]) => {
    const isReplace = equals(g, ontola.replace);

    if (isReplace
      && s.termType === 'NamedNode'
      && store.getField(s.value, rdf.type.value) === undefined) {
      lrs.queueEntity(s, { reload: true });
    }

    return isReplace;
  });

  return lrs.store.replaceMatches(replaceables);
}

function processInvalidate(delta: Quadruple[], lrs: LinkReduxLRSType) {
  const invalidates = delta.filter(([, , , why]) => equals(why, ontola.invalidate));

  for (const [s, p, o] of invalidates) {
    const wildSubject = equals(s, sp.Variable);
    const wildPredicate = equals(p, sp.Variable);
    const wildObject = equals(o, sp.Variable);

    if (!wildSubject && wildPredicate && wildObject) {
      lrs.store.removeResource(s);
      lrs.store.getInternalStore().store.journal.transition(s.value, RecordState.Absent);
    } else {
      lrs.store.match(
        wildSubject ? null : s,
        wildPredicate ? null : p,
        wildObject ? null : o as Node,
      ).forEach((match: Quadruple) => {
        lrs.store.removeResource(match[QuadPosition.subject]);
      });
    }
  }
}

function processSupplant(delta: Quadruple[], lrs: LinkReduxLRSType) {
  const supplants = delta.reduce<Quadruple[]>(
    (acc, [s, p, o, g]) => equals(g, ll.supplant) ? [...acc, [s, p, o, g]] : acc,
    [],
  );

  const resources = Array.from(new Set(supplants.map(([s]) => s)));

  for (const s of resources) {
    lrs.store.removeResource(s);
  }

  lrs.store.addQuadruples(supplants);
}

function arguDeltaProcessor(lrs: LinkReduxLRSType): DeltaProcessors {
  return {
    deltas: [] as Quadruple[][],

    flush(): Set<string> {
      const nextDeltas = this.deltas;
      this.deltas = [];

      for (const delta of nextDeltas) {
        try {
          this.processDelta(delta);
        } catch (e) {
          lrs.report(e);
        }
      }

      // Records will be updated via operations on the store.
      return new Set();
    },

    processDelta(delta: Quadruple[]): void {
      processSupplant(delta, lrs);
      processRemove(delta, lrs);
      processInvalidate(delta, lrs);
      processReplace(delta, lrs);
    },

    queueDelta(delta: Quadruple[]) {
      this.deltas.push(delta);
    },
  };
}

export default arguDeltaProcessor;
