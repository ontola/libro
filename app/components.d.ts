import { MapDataToPropsParam } from 'link-redux';
import { ComponentRegistration } from 'link-lib';

export { component, components } from './componentsList';

export const componentMap: { [k: number]: [JSX.Element, MapDataToPropsParam] };

export const componentRegistration: () => Array<ComponentRegistration<React.ComponentType<any>>>;
