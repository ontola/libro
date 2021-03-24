import * as actions from '../action-types';

import collapsible, { createCollapsible } from './reducer'

describe('Collapsible reducer', () => {
  it('should return the initial state', () => {
    expect(Object.keys(collapsible(undefined, {}).items).length).toEqual(0);
  });

  it('should handle COLL_ADD', () => {
    const reduced = collapsible(undefined, {
      payload: {
        identifier: 'CDA',
        startOpened: false,
      },
      type: actions.COLL_ADD,
    });

    expect(reduced.items.CDA.opened).toEqual(false);
  });

  it('should handle COLL_TOGGLE_ONE', () => {
    const initialState = {
      items: {
        CDA: createCollapsible({
          opened: false,
        }),
      },
    };

    const reduced = collapsible(initialState, {
      payload: 'CDA',
      type: actions.COLL_TOGGLE_ONE,
    });

    expect(reduced.items.CDA.opened).toEqual(true);
  });

  it('should handle COLL_TOGGLE_GROUP', () => {
    const initialState = {
      items: {
        CDA: createCollapsible({
          group: 'politiek',
          opened: true,
        }),
        VVD: createCollapsible({
          group: 'politiek',
          opened: true,
        }),
      },
    };

    const reduced = collapsible(initialState, {
      payload: {
        id: 'politiek',
      },
      type: actions.COLL_TOGGLE_GROUP,
    });

    expect(reduced.items.CDA.group).toEqual('politiek');
    expect(reduced.items.CDA.opened).toEqual(false);

    expect(reduced.items.VVD.group).toEqual('politiek');
    expect(reduced.items.VVD.opened).toEqual(false);
  });
});
