import {
  EditablePlugins,
  EditablePluginsProps,
  HeadingToolbar,
  ToolbarStyleProps,
  ToolbarStyles,
} from '@udecode/slate-plugins';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import React, { useMemo } from 'react';

import { compareButtonIndexes } from '../commands/compareButtonIndexes';
import { getCommandsWithKey } from '../commands/getCommandsWithKey';
import { toPluginsArray } from '../plugins/toPluginsArray';
import { CommandPlugins } from '../plugins/types';

export interface EditableWithPluginsProps extends Omit<EditablePluginsProps, 'plugins'> {
  plugins?: CommandPlugins;
  toolbarStyles?: IStyleFunctionOrObject<ToolbarStyleProps, ToolbarStyles>;
}

export const EditableWithPlugins: React.FC<EditableWithPluginsProps> = ({ plugins, toolbarClassName, ...props }) => {
  const pluginsArray = useMemo(() => toPluginsArray(plugins), [plugins]);

  const buttons = useMemo(() => (
    getCommandsWithKey(plugins)
      .filter((command) => command.button)
      .sort(compareButtonIndexes)
      .map((command) => React.createElement(command.button!, { key: command.key }))
  ), [plugins]);

  return (
    <div>
      {buttons.length > 0 && (
        <HeadingToolbar styles={{
          root: [
            toolbarClassName,
          ],
        }}>
          {buttons}
        </HeadingToolbar>
      )}
      <EditablePlugins
        plugins={pluginsArray}
        {...props}
      />
    </div>
  );
};
