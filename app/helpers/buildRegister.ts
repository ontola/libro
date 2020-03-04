import { register, RegistrationOpts } from 'link-redux';
import React from 'react';

export const buildRegister = (baseMap: RegistrationOpts<any>) =>
  (comp: React.ComponentType, overrides: RegistrationOpts<any>) => (
    register(Object.assign(comp, baseMap, overrides) as React.ComponentType<any> & RegistrationOpts<any>)
  );
