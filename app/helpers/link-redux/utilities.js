import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LinkedRenderStore from 'link-lib';
import { createStore } from 'redux';

Enzyme.configure({ adapter: new Adapter() });

export const generateStore = () => createStore(
  (state) => state,
  {}
);

export function defaultContext(properties = {}) {
  const keys = Object.keys(properties);
  const c = {};
  const defaults = {
    lrs: new LinkedRenderStore(),
    schemaObject: {},
    store: generateStore(),
  };
  keys.forEach((key) => {
    if (properties[key] === true) {
      c[key] = defaults[key];
    } else if (properties[key] !== undefined) {
      c[key] = properties[key];
    }
  });

  return c;
}
