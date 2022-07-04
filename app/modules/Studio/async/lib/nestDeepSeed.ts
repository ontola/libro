import {
  DeepSeed,
  DeepSeedDataRecord,
  DeepSeedFieldValue,
  Value,
  isValue,
} from '../../../Common/lib/seed';

const unpackSingularFieldValue = (seed: DeepSeed, value: Value | DeepSeedDataRecord) => {
  if (value.type === 'lid') {
    if (isValue(value)) {
      return nestRecord(seed, seed[value.v]);
    }

    return nestRecord(seed, value);
  }

  return value;
};

const unpackFieldValue = (seed: DeepSeed, value: DeepSeedFieldValue) => {
  if (Array.isArray(value)) {
    return value.map((v) => unpackSingularFieldValue(seed, v));
  }

  return unpackSingularFieldValue(seed, value);

};

const nestRecord = (seed: DeepSeed, record: DeepSeedDataRecord): DeepSeedDataRecord => {
  const { _id, ...fields } = record;

  return Object
    .entries(fields)
    .reduce((rAcc, [f, value]) => ({
      ...rAcc,
      [f]: unpackFieldValue(seed, value),
    }), { _id });
};

export const nestDeepSeed = (deepSeed: DeepSeed): DeepSeed => Object
  .entries(deepSeed)
  .reduce((acc, [id, record]) => {
    if (id.startsWith('_:') || (!id.includes(':') && !(id.startsWith('/') || id.startsWith('#')))) {
      return acc;
    }

    return ({
      ...acc,
      [id]: nestRecord(deepSeed, record),
    });
  }, {});
