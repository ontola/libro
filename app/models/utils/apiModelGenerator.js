import { Map, Record } from 'immutable';

export const APIDesc = Record({
  actions: new Map(),
  endpoint: '',
  type: '',
});

export const apiModelGenerator = (properties, apiDesc) => {
  const superClass = Record(Object.assign(
    {},
    { apiDesc },
    properties
  ));

  const APIActionClass = class APIAction extends superClass {
    fetch() {
      this.fetch(this.get('id'));
    }

    index() {
      this.index();
    }
  };

  APIActionClass.fetch = id => ({
    type: apiDesc.get('actions').get('resource'),
    payload: {
      apiAction: true,
      endpoint: apiDesc.get('endpoint'),
      id,
    },
  });

  APIActionClass.index = () => ({
    type: apiDesc.get('actions').get('collection'),
    payload: {
      apiAction: true,
      endpoint: apiDesc.get('endpoint'),
    },
  });

  APIActionClass.create = (attributes, opts = {}) => ({
    type: apiDesc.get('actions').get('create'),
    payload: {
      apiAction: true,
      attributes,
      endpoint: apiDesc.get('endpoint'),
      request: {
        method: 'POST',
        href: opts.href,
      },
      type: apiDesc.get('type'),
    },
  });

  return APIActionClass;
};
