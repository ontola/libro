export const setRecord = (
  state,
  record,
  id = record.id
) => state.setIn(['items', id], record);
