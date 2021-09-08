import { Tooltip } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { findNode } from '@udecode/plate';
import { usePlateStore } from '@udecode/plate-core';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import {
  Command,
  ComponentCommand,
  ParameterizedCommand,
  compareButtonIndexes,
} from '../commands';
import { useElementsEditor } from '../editor';

import {
  GroupConfig,
  groups,
  pluginKeyButtonMap,
} from './toolbar/buttons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const indices = (groupItems: Command[]): number[] => groupItems
  .filter((it) => it !== undefined)
  .map((it) => it.buttonIndex)
  .filter((it): it is number => typeof it === 'number');

const isComponentCommand = (it: any): it is ComponentCommand => typeof it.button !== 'undefined';

const toComponent = (command: ComponentCommand | ParameterizedCommand, intl: IntlShape) => {
  if (isComponentCommand(command)) {
    return React.createElement(command.button, { key: command.buttonIndex });
  }

  const title = typeof command.title === 'string'
    ? command.title
    : intl.formatMessage(command.title);

  return (
    <ToggleButton
      value={command.key ?? (() => {throw new Error('has no key');})()}
    >
      <Tooltip title={title}>
        {React.createElement(command.child, { key: command.key })}
      </Tooltip>
    </ToggleButton>
  );
};

type GroupedComponent = GroupConfig & {
  buttons: JSX.Element[];
};

const partition = (pluginKeys: string[], intl: IntlShape): Array<JSX.Element | GroupedComponent> => {
  const result: Array<JSX.Element | GroupedComponent> = [];

  const displayedPlugins = pluginKeys
    .map((pluginKey) => pluginKeyButtonMap[pluginKey])
    .filter((it) => it !== undefined);
  let max = Math.max(...indices(displayedPlugins));

  for(const pluginConf of displayedPlugins) {
    if (pluginConf.buttonGroup) {
      const groupItems = displayedPlugins
        .filter((it) => it.buttonGroup === pluginConf.buttonGroup);
      const groupIndices = indices(groupItems);

      const buttons = groupItems
        .sort(compareButtonIndexes)
        .map((it) => toComponent(it, intl));

      result[Math.min(...groupIndices)] = {
        ...groups[pluginConf.buttonGroup],
        buttons,
      };
    } else {
      // eslint-disable-next-line no-plusplus
      result[pluginConf.buttonIndex ?? ++max] = toComponent(pluginConf, intl);
    }
  }

  return Object.values(result);
};

const isGroupedComponent = (t: any): t is GroupedComponent => Array.isArray(t?.buttons);

export const Toolbar = React.forwardRef<HTMLDivElement>((
  _,
  ref,
): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const editor = useElementsEditor();
  const { main: { pluginKeys } } = usePlateStore();

  const buttons = partition(pluginKeys, intl);

  return (
    <div
      className={classes.root}
      ref={ref}
    >
      {buttons.map((buttonOrGroup) => {
        if (isGroupedComponent(buttonOrGroup)) {
          const test = findNode(
            editor,
            { match: { type: buttonOrGroup.valueMatch } },
          );
          const highlight = test?.[0]?.type;

          return (
            <ToggleButtonGroup
              exclusive
              value={highlight ?? buttonOrGroup.defaultValue}
              onChange={buttonOrGroup.changeHandler(editor)}
            >
              {buttonOrGroup.buttons.map((SubButton) => (
                SubButton
              ))}
            </ToggleButtonGroup>
          );
        }

        return buttonOrGroup;
      })}
    </div>
  );
});
