import { LinkReduxLRSType } from 'link-redux';
import { Quadruple, Statement } from 'rdflib';

function processRemove(delta: Quadruple[], lrs: LinkReduxLRSType) {
  delta
      .filter(([, , , why]) => why === lrs.namespaces.ontola('remove'))
      .forEach(([s, p, o]) => {
        lrs.store.removeStatements(
            lrs.store.match(
                s === lrs.namespaces.sp('Variable') ? null : s,
                p === lrs.namespaces.sp('Variable') ? null : p,
                o === lrs.namespaces.sp('Variable') ? null : o,
            ),
        );
      });
}

function processReplace(delta: Quadruple[], lrs: LinkReduxLRSType) {
  const replaceables = delta
      .filter(([s, , , g]) => g === lrs.namespaces.ontola('replace') && lrs.store.anyStatementMatching(s));

  return lrs.store.replaceMatches(replaceables);
}

function processInvalidate(delta: Quadruple[], lrs: LinkReduxLRSType) {
  delta
      .filter(([, , , why]) => why === lrs.namespaces.ontola('invalidate'))
      .forEach(([s, p, o]) => {
          if (s
              && s !== lrs.namespaces.sp('Variable')
              && p === lrs.namespaces.sp('Variable')
              && o === lrs.namespaces.sp('Variable')
          ) {
              lrs.api.invalidate(s);
              lrs.store.removeResource(s);
          } else {
              lrs.store.match(
                  s === lrs.namespaces.sp('Variable') ? null : s,
                  p === lrs.namespaces.sp('Variable') ? null : p,
                  o === lrs.namespaces.sp('Variable') ? null : o,
              ).forEach((match) => {
                  lrs.api.invalidate(match.subject);
                  lrs.store.removeResource(match.subject);
              });
          }
      });
}

function processSupplant(delta: Quadruple[], lrs: LinkReduxLRSType) {
    const supplants = delta.filter(([, , , why]) => why === lrs.namespaces.ll('supplant'));

    supplants.forEach(([s]) => {
        lrs.store.removeResource(s);
    });
    supplants.forEach(([s, p, o]) => {
        lrs.store.addStatements([new Statement(s, p, o)]);
    });
}

function arguDeltaProcessor(lrs: LinkReduxLRSType) {
  return {
    deltas: [] as Quadruple[][],

    flush() {
      let statements: Statement[] = [];
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
