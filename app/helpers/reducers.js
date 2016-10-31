/**
 * Sets record to items array in immutable Map
 * @param {string} state A state object
 * @param {string} record A format to display date
 * @param {string} id formatted date string
 * @param {model} Model The model to be used for initialising
 * @return {string} state Returns new state that includes record
 */
export const setRecord = (
  state,
  record,
  id = record.id,
  Model
) => {
  let newRecord;

  const stateId = record && record['@id'] ? record['@id'] : id;
  if (Model) {
    newRecord = state.getIn(['items', stateId]) !== undefined
      ? state.getIn(['items', stateId])
      : new Model({ id, loading: true });

    if (record && record.get('title') === '') {
      if (newRecord.get('title').length > 0) {
        return state.setIn(['items', stateId], newRecord);
      }
    }
  }
  return state.setIn(['items', stateId], record || newRecord);
};

/**
 * Deletes record to items array in immutable Map
 * @param {string} state A state object
 * @param {string} id UUID
 * @return {string} state Returns new state that excludes record with id
 */
export const deleteRecord = (state, id) =>
  state.deleteIn(['items', id]);

/**
 * Toggles a specific key in a record
 * @param {string} state A state object
 * @param {string} id UUID
 * @param {string} key The key to be toggled
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const toggleValue = (state, id, key) =>
  state.updateIn(['items', id, key], value => !value);

/**
 * Updates a specific key in a record
 * @param {string} state A state object
 * @param {string} id UUID
 * @param {string} key The key to be updated
 * @param {string} newValue The new value to replace the old one with
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const updateRecordValue = (state, id, key, newValue) =>
  state.setIn(['items', id, key], newValue);

/**
 * Increases the specifief value by 1
 * @param {string} state A state object
 * @param {string} value The value to increase by 1
 * @return {string} state Returns new state that has toggled the key of the specified record
 */
export const increaseValue = (state, value) =>
  state.update(value, v => v + 1);
