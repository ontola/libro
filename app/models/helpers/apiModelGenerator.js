import Immutable, { Map } from 'immutable';

const APIDesc = Immutable.Record({
  actions: new Map(),
  endpoint: '',
  type: '',
});

export const apiModelGenerator = (properties, apiDesc) => {
  const superClass = Immutable.Record(Object.assign(
    {},
    { apiDesc: new APIDesc(apiDesc) },
    properties
  ));
  return class APIAction extends superClass {
    fetch() {
      return {
        type: this.apiDesc.getIn(['actions', 'resource']),
        payload: {
          apiAction: true,
          endpoint: this.apiDesc.get('endpoint'),
          id: this.id,
        },
      };
    }

    index() {
      return {
        type: this.apiDesc.getIn(['actions', 'collection']),
        payload: {
          apiAction: true,
          endpoint: this.apiDesc.get('endpoint'),
        },
      };
    }
  };
};
