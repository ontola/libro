import { handleActions } from 'redux-actions';

import {
  setRecord,
  toggleValue,
} from '../../helpers/reducers';
import {
  COLL_ADD,
  COLL_CLOSE_ONE,
  COLL_OPEN_GROUPED,
  COLL_TOGGLE_GROUP,
  COLL_TOGGLE_ONE,
} from '../action-types';

interface Collapsible {
  group?: string | undefined;
  opened: boolean;
}

interface CollapsibleState {
  items: Record<string, Collapsible | undefined>;
}

interface CollapsiblePayload {
  identifier: string;
  group: string;
}

export const createCollapsible = (opts: Partial<Collapsible>): Collapsible => ({
  group: undefined,
  opened: false,
  ...opts,
});

const initialState: CollapsibleState = {
  items: {},
};

// Opens all collapsibles if one or more in the group are currently closed
// The group should be a string preferably formatted as 'type_id', e.g. 'event_292104-247914'
const toggleAll = (state: CollapsibleState, group: string | undefined) => {
  let shouldOpen = false;

  const items = Object
    .entries(state.items)
    .reduce((acc, [k, coll]) => {
      if (coll?.group !== group) {
        return {
          ...acc,
          [k]: coll,
        };
      }

      if (coll?.opened === false) {
        shouldOpen = true;
      }

      return {
        ...acc,
        [k]: {
          ...coll ?? {},
          opened: true,
        },
      };
    }, {});

  if (shouldOpen) {
    return {
      ...state,
      items,
    };
  }

  return {
    ...state,
    items: Object
      .entries(state.items)
      .reduce((acc: Record<string, Collapsible | undefined>, [k, coll]: [string, Collapsible | undefined]) => ({
        ...acc,
        [k]: {
          ...coll ?? {},
          opened: false,
        },
      }), {}),
  };
};

const closeGroup = (state: CollapsibleState, group: string | undefined): CollapsibleState => ({
  ...state,
  items: Object
    .entries(state.items)
    .filter(([_, item]: any) => item.group === group)
    .reduce((acc, [k, item]: any) => {
      if (item.group !== group) {
        return {
          ...acc,
          [k]: item,
        };
      }

      return {
        ...acc,
        [k]: {
          ...item,
          opened: false,
        },
      };
    }, {}),
});

const recordCollapsible = ({ group, startOpened }: any) => createCollapsible({
  group,
  opened: startOpened,
});

const openOne = (state: any, payload: any) => ({
  ...state,
  items: {
    ...state.items,
    [payload.identifier]: {
      ...state.items[payload.identifier],
      opened: true,
    },
  },
});

const closeOne = (state: any, payload: any) => ({
  ...state,
  items: {
    ...state.items,
    [payload.identifier]: {
      ...state.items[payload.identifier],
      opened: false,
    },
  },
});

const collapsible = handleActions<CollapsibleState, CollapsiblePayload>({
  '@@router/LOCATION_CHANGE': (state) => closeGroup(state, 'Navbar'),

  [COLL_ADD]: (state, { payload }) => setRecord(
    state,
    recordCollapsible(payload),
    payload.identifier,
  ),

  [COLL_CLOSE_ONE]: (state, { payload }) => closeOne(state, payload),

  [COLL_OPEN_GROUPED]: (state, { payload }) => openOne(closeGroup(state, payload.group), payload),

  [COLL_TOGGLE_GROUP]: (state, { payload }) => toggleAll(state, payload.group),

  [COLL_TOGGLE_ONE]: (state, { payload }) => toggleValue(state, payload, 'opened'),

}, initialState);

export default collapsible;
