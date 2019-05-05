import { NS } from './LinkedRenderStore';

function filterFind(op) {
  return (bV) => {
    if (Object.prototype.hasOwnProperty.call(bV, 'termType')) {
      return bV.value === op.value && bV.termType === op.termType;
    } else if (bV.constructor === RegExp) {
      return bV.test(op.value);
    }

    throw new Error('Match on regex or IRI');
  };
}

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function dataURItoBlob(literal) {
  const dataURI = literal.value;
  const filename = literal.datatype.value.split('filename=').pop();
  const [preamble, data] = dataURI.split(',');
  const byteString = atob(data);
  const ia = new Uint8Array(new ArrayBuffer(byteString.length));

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const options = { encoding: 'UTF-8', type: preamble.split(':').pop().split(';').shift() };
  const b = new Blob([ia], options);

  return new File([b], filename, options);
}

function convertKeysAtoB(obj) {
  const output = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (k === '@id') {
      output[k] = v;
    } else if (Object.prototype.toString.apply(v) === '[object Object]' && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
      output[atob(k)] = convertKeysAtoB(v);
    } else if (Array.isArray(v)) {
      // eslint-disable-next-line no-use-before-define
      output[atob(k)] = v.map(i => serializableValue(i));
    } else if (v.datatype && v.datatype.value.startsWith('https://argu.co/ns/core#base64File')) {
      output[atob(k)] = dataURItoBlob(v);
    } else {
      output[atob(k)] = v;
    }
  });

  return output;
}

function serializableValue(v) {
  if (Object.prototype.toString.apply(v) === '[object Object]' && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
    return convertKeysAtoB(v);
  } else if (Array.isArray(v)) {
    return v.map(i => serializableValue(i));
  } else if (v.datatype && v.datatype.value.startsWith('https://argu.co/ns/core#base64File')) {
    return dataURItoBlob(v);
  }

  return v;
}

function listToArr(lrs, acc, rest) {
  if (Array.isArray(rest)) {
    return rest;
  }
  if (!rest || rest === NS.rdf('nil')) {
    return acc;
  }

  let first;
  if (rest.termType === 'BlankNode') {
    const firstStatement = lrs.store.anyStatementMatching(rest, NS.rdf('first'));
    first = firstStatement && firstStatement.object;
  } else {
    first = lrs.getResourceProperty(rest, NS.rdf('first'));

    if (!first) {
      return lrs.getEntity(rest);
    }
  }
  acc.push(first);
  listToArr(lrs, acc, lrs.store.anyStatementMatching(rest, NS.rdf('rest')).object);

  return acc;
}

function processInvalidate(delta, lrs) {
  delta
    .filter(([, , , why]) => why === NS.ontola('invalidate'))
    .forEach(([s, p, o]) => {
      lrs.store.match(
        s === NS.sp('Variable') ? null : s,
        p === NS.sp('Variable') ? null : p,
        o === NS.sp('Variable') ? null : o
      ).forEach((match) => {
        lrs.removeResource(match.subject);
      });
    });
}

function processRemove(delta, lrs) {
  delta
    .filter(([, , , why]) => why === NS.ontola('remove'))
    .forEach(([s, p, o]) => {
      lrs.store.removeStatements(
        [lrs.store.anyStatementMatching(s, p, o)].filter(Boolean)
      );
    });
}

function processReplace(delta, lrs) {
  const replaceables = delta
    .filter(([s, p, , g]) => g === NS.ontola('replace') && lrs.store.anyStatementMatching(s, p));
  return lrs.store.replaceMatches(replaceables);
}

function arguDeltaProcessor(lrs) {
  return {
    deltas: [],

    flush() {
      let statements = [];
      for (const delta of this.deltas) {
        statements = statements.concat(this.processDelta(delta));
      }
      this.deltas = [];

      return statements;
    },

    processDelta(delta) {
      processRemove(delta, lrs);
      processInvalidate(delta, lrs);
      return processReplace(delta, lrs);
    },

    queueDelta(delta) {
      this.deltas.push(delta);
    },
  };
}

function sort(order) {
  return (a, b) => {
    const oA = order.findIndex(o => a.value.includes(o));
    const oB = order.findIndex(o => b.value.includes(o));

    if (oA === -1 && oB === -1) return compare(a, b);
    if (oA === -1) return 1;
    if (oB === -1) return -1;
    return compare(oA, oB);
  };
}

function sortIRIS(order, attribute) {
  const orderNormalized = order.map(v => v.value);
  return (a, b) => {
    const oA = orderNormalized.indexOf(a[attribute].value);
    const oB = orderNormalized.indexOf(b[attribute].value);

    if (oA === -1 && oB === -1) return compare(a, b);
    if (oA === -1) return 1;
    if (oB === -1) return -1;
    return compare(oA, oB);
  };
}

function allow(arr, whitelist = []) {
  return arr.filter(op => whitelist.find(filterFind(op)));
}

function filter(arr, blacklist = []) {
  return arr.filter(op => !blacklist.find(filterFind(op)));
}

function filterSort(arr, blacklist = [], order = []) {
  return filter(arr, blacklist).sort(sort(order));
}

function allowSort(arr, whitelist = [], order = []) {
  return allow(arr, whitelist).sort(sort(order));
}

export {
  allow,
  allowSort,
  arguDeltaProcessor,
  convertKeysAtoB,
  filter,
  filterSort,
  listToArr,
  processRemove,
  processReplace,
  sort,
  sortIRIS,
};
