import { Map, Record } from 'immutable';

export const APIDesc = Record({
  actions: new Map(),
  arguModel: false,
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
    payload: {
      apiAction: true,
      arguModel: apiDesc.get('arguModel'),
      endpoint: apiDesc.get('endpoint'),
      id,
    },
    type: apiDesc.get('actions').get('resource'),
  });

  APIActionClass.index = () => ({
    payload: {
      apiAction: true,
      arguModel: apiDesc.get('arguModel'),
      endpoint: apiDesc.get('endpoint'),
    },
    type: apiDesc.get('actions').get('collection'),
  });

  APIActionClass.create = (attributes, opts = {}) => ({
    payload: {
      apiAction: true,
      attributes,
      endpoint: apiDesc.get('endpoint'),
      request: {
        href: opts.href,
        method: 'POST',
      },
      type: apiDesc.get('type'),
    },
    type: apiDesc.get('actions').get('create'),
  });

  return APIActionClass;
};
