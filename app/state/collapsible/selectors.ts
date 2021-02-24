export const getCollapsible = (state: any, id: string) => state.getIn(['collapsible', 'items', id]);

export const getCollapsibleOpened = (state: any, id: string) => !!state.getIn(['collapsible', 'items', id, 'opened']);
