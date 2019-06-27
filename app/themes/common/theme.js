import components from './components';
import variables from './variables';

variables.theme.overrides = components.reduce(
  (acc, component) => ({ ...acc, ...component(variables) }),
  {}
);

export default variables.theme;
