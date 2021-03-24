/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Sets record to items array in a Record
 * @param {string} state A state object
 * @param {string} record A format to display date
 * @param {string} id formatted date string
 * @return {string} state Returns new state that includes record
 */
export const setRecord = (
  state: any,
  record: any,
  id = record.id,
) => {
  const stateId = record?.['@id'] ?? id;

  return {
    ...state,
    items: {
      ...state.items,
      [stateId]: record || null,
    },
  };
};

/**
 * Sets record to items array in a Record,
 * only if there is no existing record.
 * @param {string} state A state object
 * @param {string} record A format to display date
 * @param {string} id formatted date string
 * @return {string} state Returns new state that includes record
 */
export const setRecordIfNew = (
  state: any,
  record: any,
  id = record.id,
) => {
  const stateId = record?.['@id'] ?? id;

  if (state[stateId] === undefined) {
    return ({
      ...state,
      [stateId]: record,
    });
  }

  return state;
};

export const setPlainRecordIfNew = (
  state: any,
  record: any,
  id = record.id,
) => {
  const stateId = record?.['@id'] ?? id;

  if (state[stateId] === undefined) {
    return {
      ...state,
      [stateId]: record,
    };
  }

  return state;
};

/**
 * Deletes record to items array in a Record
 * @param {string} state A state object
 * @param {string} id UUID
 * @return {string} state Returns new state that excludes record with id
 */
export const deleteRecord = (state: any, id: any) => {
  const {
    [id]: _,
    ...other
  } = state.items;

  return {
    ...state,
    items: other,
  };
};

/**
 * Toggles a specific key in a record
 * @param {string} state A state object
 * @param {string} id UUID
 * @param {string} key The key to be toggled
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const toggleValue = (state: any, id: any, key: any) => ({
  ...state,
  items: {
    ...state.items,
    [id]: {
      ...(state.items[id] ?? {}),
      [key]: !state.items[id][key],
    },
  },
});

/**
 * Updates a specific key in a record
 * @param {string} state A state object
 * @param {string} id UUID
 * @param {string} key The key to be updated
 * @param {string} newValue The new value to replace the old one with
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const updateRecordValue = (state: any, id: string, key: string, newValue: unknown) => ({
  ...state,
  items: {
    ...state.items,
    [id]: {
      ...(state.items[id] ?? {}),
      [key]: newValue,
    },
  },
});
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
