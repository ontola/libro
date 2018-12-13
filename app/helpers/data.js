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
    if (Object.prototype.toString.apply(v) === '[object Object]' && !Object.prototype.hasOwnProperty.call(v, 'termType')) {
      output[atob(k)] = convertKeysAtoB(v);
    } else if (Array.isArray(v)) {
      output[atob(k)] = v.map(i => convertKeysAtoB(i));
    } else if (v.datatype && v.datatype.value.startsWith('https://argu.co/ns/core#base64File')) {
      output[atob(k)] = dataURItoBlob(v);
    } else {
      output[atob(k)] = v;
    }
  });

  return output;
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

function processRemove(lrs, response) {
  response
    .data
    .filter(s => s.why.sameTerm(NS.argu('remove')))
    .forEach((s) => {
      lrs.store.removeStatements(
        [lrs.store.anyStatementMatching(s.subject, s.predicate, s.object)].filter(Boolean)
      );
    });
}

function processReplace(lrs, response) {
  const replaceables = response
    .data
    .filter(s => s.why.sameTerm(NS.argu('replace')) && lrs.store.anyStatementMatching(s.subject, s.predicate));
  lrs.store.replaceMatches(replaceables);
}

function processDelta(lrs, response) {
  if (typeof response === 'object'
    && Object.hasOwnProperty.call(response, 'data')
    && Array.isArray(response.data)) {
    processRemove(lrs, response);
    processReplace(lrs, response);
  }
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
  convertKeysAtoB,
  filter,
  filterSort,
  listToArr,
  processDelta,
  processRemove,
  processReplace,
  sort,
  sortIRIS,
};
