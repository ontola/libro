import rdf, { Node, Quad, Quadruple } from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

import sp from '../ontology/sp';

function processRemove(delta: Quadruple[], lrs: LinkReduxLRSType) {
  delta
      .filter(([, , , why]) => rdf.equals(why, lrs.namespaces.ontola('remove')))
      .forEach(([s, p, o]) => {
        lrs.store.removeStatements(
            lrs.store.match(
                rdf.equals(s, sp.Variable) ? null : s,
                rdf.equals(p, sp.Variable) ? null : p,
                rdf.equals(o, sp.Variable) ? null : o as Node,
            ),
        );
      });
}

function processReplace(delta: Quadruple[], lrs: LinkReduxLRSType) {
  const replaceables = delta
      .filter(([s, , , g]) => rdf.equals(g, lrs.namespaces.ontola('replace'))
          && lrs.store.anyStatementMatching(s));

  return lrs.store.replaceMatches(replaceables);
}

function processInvalidate(delta: Quadruple[], lrs: LinkReduxLRSType) {
  delta
      .filter(([, , , why]) => rdf.equals(why, lrs.namespaces.ontola('invalidate')))
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
              ).forEach((match) => {
                  lrs.api.invalidate(match.subject);
                  lrs.store.removeResource(match.subject);
              });
          }
      });
}

function processSupplant(delta: Quadruple[], lrs: LinkReduxLRSType) {
    const supplants = delta.filter(([, , , why]) => rdf.equals(why, lrs.namespaces.ll('supplant')));

    supplants.forEach(([s]) => {
        lrs.store.removeResource(s);
    });
    supplants.forEach(([s, p, o]) => {
        lrs.store.addStatements([rdf.quad(s, p, o)]);
    });
}

function arguDeltaProcessor(lrs: LinkReduxLRSType) {
  return {
    deltas: [] as Quadruple[][],

    flush() {
      let statements: Quad[] = [];
      for (const delta of this.deltas) {
        statements = statements.concat(this.processDelta(delta));
      }
      this.deltas = [];

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
