import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinkedRenderStore from 'link-lib';
import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { linkMiddleware as lrMiddleware, linkReducer } from 'link-redux';

Enzyme.configure({ adapter: new Adapter() });

export const generateStore = (lrs, initialState = undefined) => createStore(
  combineReducers({ linkedObjects: linkReducer }),
  initialState,
  applyMiddleware(lrMiddleware(lrs))
);

const contextDefaults = (state = undefined) => {
  const lrs = new LinkedRenderStore();
  return {
    lrs,
    schemaObject: {},
    store: generateStore(lrs, state),
  };
};

function defaultContext(properties = {}, initialState = undefined) {
  const keys = Object.keys(properties);
  const c = {};
  const defaults = contextDefaults(initialState);
  keys.forEach((key) => {
    if (properties[key] === true) {
      c[key] = defaults[key];
    } else if (properties[key] !== undefined) {
      c[key] = properties[key];
    }
  });
  return c;
}

export {
  defaultContext,
};
