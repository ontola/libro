export const getCollapsible = (state: any, id: any) => state.getIn(['collapsible', 'items', id]);

export const getCollapsibleGroup = (state: any, group: any) => state.getIn(['collapsible', 'items', group]);

export const getCollapsibleOpened = (state: any, id: any) => !!state.getIn(['collapsible', 'items', id, 'opened']);
