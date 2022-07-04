import { MapDataToPropsParam } from 'link-redux';
import { ComponentClass, FunctionComponent } from 'react';

export interface TopologyMap {
  [k: number]: [FunctionComponent<any> | ComponentClass<any>, MapDataToPropsParam | undefined];
}
