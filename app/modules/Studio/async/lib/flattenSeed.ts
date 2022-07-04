import {
  DeepSeed,
  DeepSeedDataRecord,
  GlobalId,
  LocalId,
  Seed,
  isValue,
} from '../../../Common/lib/seed';

const walkChildren = (seed: Seed, deepSeed: DeepSeedDataRecord): GlobalId | LocalId => {
  const { _id, ...fields } = deepSeed;
  seed[_id.v] = {
    _id,
  };

  for (const [field, value] of Object.entries(fields)) {
    if (isValue(value)) {
      seed[_id.v][field] = value;
    } else if (Array.isArray(value)) {
      seed[_id.v][field] = value.map((v) => {
        if (Array.isArray(v))
          throw new Error('Too many nestings man...');
        if (isValue(v))
          return v;

        return walkChildren(seed, v);
      });
    } else {
      seed[_id.v][field] = walkChildren(seed, value);
    }
  }

  return _id;
};

export const flattenSeed = (deepSeed: DeepSeed): Seed => {
  const slice: Seed = {};

  for (const deepRecord of Object.values(deepSeed)) {
    walkChildren(slice, deepRecord);
  }

  return slice;
};
