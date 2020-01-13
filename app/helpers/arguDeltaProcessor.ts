import rdf, { Node, Quad, Quadruple } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

import ll from '../ontology/ll';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';

function processRemove(delta: Quadruple[], lrs: LinkReduxLRSType) {
  delta
      .filter(([, , , why]) => rdf.equals(why, ontola.remove))
      .forEach(([s, p, o]) => {
        lrs.store.removeQuads(
            lrs.store.match(
                rdf.equals(s, sp.Variable) ? null : s,
                rdf.equals(p, sp.Variable) ? null : p,
                rdf.equals(o, sp.Variable) ? null : o as Node,
                null,
            ),
        );
      });
}

function processReplace(delta: Quadruple[], lrs: LinkReduxLRSType) {
  const replaceables = delta
      .filter(([s, , , g]) => rdf.equals(g, ontola.replace)
          && lrs.store.find(s, null, null, null));

  return lrs.store.replaceMatches(replaceables);
}

function processInvalidate(delta: Quadruple[], lrs: LinkReduxLRSType) {
  delta
      .filter(([, , , why]) => rdf.equals(why, ontola.invalidate))
      .forEach(([s, p, o]) => {
          if (s
              && !rdf.equals(s, sp.Variable)
              && rdf.equals(p, sp.Variable)
              && rdf.equals(o, sp.Variable)
          ) {
              lrs.api.invalidate(s);
              lrs.store.removeResource(s);
          } else {
              lrs.store.match(
                  rdf.equals(s, sp.Variable) ? null : s,
                  rdf.equals(p, sp.Variable) ? null : p,
                  rdf.equals(o, sp.Variable) ? null : o as Node,
                  null,
              ).forEach((match: Quad) => {
                  lrs.api.invalidate(match.subject);
                  lrs.store.removeResource(match.subject);
              });
          }
      });
}

function processSupplant(delta: Quadruple[], lrs: LinkReduxLRSType) {
    const supplants = delta.filter(([, , , why]) => rdf.equals(why, ll.supplant));

    supplants.forEach(([s]) => {
        lrs.store.removeResource(s);
    });
    supplants.forEach(([s, p, o]) => {
        lrs.store.addQuads([rdf.quad(s, p, o)]);
    });
}

function arguDeltaProcessor(lrs: LinkReduxLRSType) {
  return {
    deltas: [] as Quadruple[][],

    flush() {
      let statements: Quad[] = [];
      const nextDeltas = this.deltas;
      this.deltas = [];

      for (const delta of nextDeltas) {
        try {
          statements = statements.concat(this.processDelta(delta));
        } catch (e) {
          lrs.report(e);
        }
      }

      return statements;
    },

    processDelta(delta: Quadruple[]) {
      processSupplant(delta, lrs);
      processRemove(delta, lrs);
      processInvalidate(delta, lrs);

      return processReplace(delta, lrs);
    },

    queueDelta(delta: Quadruple[]) {
      this.deltas.push(delta);
    },
  };
}

export default arguDeltaProcessor;
