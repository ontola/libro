/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getCollapsible = (state: any, id: string) => state.getIn(['collapsible', 'items', id]);

export const getCollapsibleGroup = (state: any, group: string) => state.getIn(['collapsible', 'items', group]);

export const getCollapsibleOpened = (state: any, id: string) => !!state.getIn(['collapsible', 'items', id, 'opened']);
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
