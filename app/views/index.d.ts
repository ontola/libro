import { ComponentRegistration } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import { ComponentType } from 'react';

declare const register: (lrs: LinkReduxLRSType) => void;
declare const getViews: () => ComponentRegistration<ComponentType>;

export { getViews };

export default register;
