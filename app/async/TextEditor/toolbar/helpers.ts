import { makeStyles } from '@material-ui/core';
import { isNode, NamedNode, Node } from '@ontologies/core';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import { EventHandler } from 'react';
import { useSlate } from 'slate-react';

export const useMenuItemStyles = makeStyles(({
  button: {
    border: 'none',
    height: 48,
  },
  root: {
    backgroundColor: 'transparent',
  },
}));

export function normalizeAction(
  lrs: LinkReduxLRSType,
  action: Node | EventHandler<any>,
  opts: any,
): EventHandler<any> {
  if (isNode(action)) {
    return (e: Event) => {
      e.preventDefault();

      return lrs.exec(action as NamedNode, opts);
    };
  }

  return action;
}

export const useNormalizeAction = (action: EventHandler<any>, item: any) => {
  const lrs = useLRS();
  const textEditor = useSlate();
  const actionOpts = { item, textEditor };

  return normalizeAction(lrs, action, actionOpts);
};
