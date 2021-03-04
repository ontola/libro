import { ComponentRegistration } from 'link-lib';
import { RegistrationOpts, register } from 'link-redux';
import React from 'react';

export const buildRegister = (baseMap: RegistrationOpts<any>) =>
  (comp: React.ComponentType, overrides: RegistrationOpts<any>): Array<ComponentRegistration<React.ComponentType<any>>> => (
    register(Object.assign(comp, baseMap, overrides) as React.ComponentType<any> & RegistrationOpts<any>)
  );
