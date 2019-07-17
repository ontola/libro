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
      .filter(([s, p, , g]) => g === lrs.namespaces.ontola('replace') && lrs.store.anyStatementMatching(s, p));

  return lrs.store.replaceMatches(replaceables);
}

function processInvalidate(delta: Quadruple[], lrs: LinkReduxLRSType) {
  delta
      .filter(([, , , why]) => why === lrs.namespaces.ontola('invalidate'))
      .forEach(([s, p, o]) => {
        lrs.store.match(
            s === lrs.namespaces.sp('Variable') ? null : s,
            p === lrs.namespaces.sp('Variable') ? null : p,
            o === lrs.namespaces.sp('Variable') ? null : o,
        ).forEach((match: Statement) => {
          lrs.removeResource(match.subject);
        });
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
