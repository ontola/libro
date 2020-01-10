/**
 * Sets record to items array in immutable Map
 * @param {string} state A state object
 * @param {string} record A format to display date
 * @param {string} id formatted date string
 * @return {string} state Returns new state that includes record
 */
export const setRecord = (
  state,
  record,
  id = record.id
) => {
  let newRecord;
  const stateId = (record && record['@id']) || id;

  return state.setIn(['items', stateId], record || newRecord);
};

/**
 * Sets record to items array in immutable Map,
 * only if there is no existing record.
 * @param {string} state A state object
 * @param {string} record A format to display date
 * @param {string} id formatted date string
 * @return {string} state Returns new state that includes record
 */
export const setRecordIfNew = (
  state,
  record,
  id = record.id
) => {
  const stateId = (record && record['@id']) || id;

  if (state.get(stateId) === undefined) {
    return state.set(stateId, record);
  }

  return state;
};

/**
 * Deletes record to items array in immutable Map
 * @param {string} state A state object
 * @param {string} id UUID
 * @return {string} state Returns new state that excludes record with id
 */
export const deleteRecord = (state, id) => state.deleteIn(['items', id]);

/**
 * Toggles a specific key in a record
 * @param {string} state A state object
 * @param {string} id UUID
 * @param {string} key The key to be toggled
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const toggleValue = (state, id, key) => state.updateIn(['items', id, key], (value) => !value);

/**
 * Updates a specific key in a record
 * @param {string} state A state object
 * @param {string} id UUID
 * @param {string} key The key to be updated
 * @param {string} newValue The new value to replace the old one with
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const updateRecordValue = (state, id, key, newValue) => state.setIn(['items', id, key], newValue);

/**
 * Increases the specific value by 1
 * @param {string} state A state object
 * @param {string} value The value to increase by 1
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const increaseValue = (state, value) => state.update(value, (v) => v + 1);
