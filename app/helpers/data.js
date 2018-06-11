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
  if (a < b) return 0;
  if (a > b) return 1;
  return -1;
}

function convertKeysAtoB(obj) {
  const output = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (Object.prototype.toString.apply(v) === '[object Object]') {
      output[atob(k)] = convertKeysAtoB(v);
    } else if (Array.isArray(v)) {
      output[atob(k)] = v.map(i => convertKeysAtoB(i));
    } else {
      output[atob(k)] = v;
    }
  });

  return output;
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
  sort,
  sortIRIS,
};
