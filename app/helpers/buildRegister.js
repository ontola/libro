import { register } from 'link-redux';

export const buildRegister = baseMap => (comp, overrides) => (
  register(Object.assign(comp, baseMap, overrides))
);
