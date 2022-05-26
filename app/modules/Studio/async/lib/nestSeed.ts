import {
  DeepSeed,
  DeepSeedDataRecord,
  Seed,
  SeedDataRecord,
} from '../../../../helpers/seed';

const nestRecord = (seed: Seed, record: SeedDataRecord): DeepSeedDataRecord => {
  const { _id, ...fields } = record;

  return Object
    .entries(fields)
    .reduce((rAcc, [f, value]) => ({
      ...rAcc,
      [f]: Array.isArray(value)
        ? value.map((v) => v.type === 'lid' ? nestRecord(seed, seed[v.v]) : v)
        : value.type === 'lid' ? nestRecord(seed, seed[value.v]) : value,
    }), { _id });
};

export const nestSeed = (seed: Seed): DeepSeed => Object
  .entries(seed)
  .reduce((acc, [id, record]) => {
    if (id.startsWith('_:') || (!id.includes(':') && !id.startsWith('/'))) {
      return acc;
    }

    return ({
      ...acc,
      [id]: nestRecord(seed, record),
    });
  }, {});
