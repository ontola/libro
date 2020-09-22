import {
  EditablePlugins,
  EditablePluginsProps,
  HeadingToolbar,
  ToolbarStyleProps,
  ToolbarStyles,
} from '@udecode/slate-plugins';
import { concatStyleSets } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import React, { useMemo } from 'react';

import { compareCommands } from '../commands/compareCommands';
import { getCommandsWithKey } from '../commands/getCommandsWithKey';
import { toPluginsArray } from '../plugins/toPluginsArray';
import { CommandPlugins } from '../plugins/types';

export interface EditableWithPluginsProps extends Omit<EditablePluginsProps, 'plugins'> {
  plugins?: CommandPlugins;
  toolbarStyles?: IStyleFunctionOrObject<ToolbarStyleProps, ToolbarStyles>;
}

export const EditableWithPlugins: React.FC<EditableWithPluginsProps> = ({ plugins, toolbarStyles, ...props }) => {
  const pluginsArray = useMemo(() => (toPluginsArray(plugins)), [plugins]);

  const buttons: JSX.Element[] = useMemo(() => (
    getCommandsWithKey(plugins)
      .filter((command) => command.button)
      .sort(compareCommands)
      .map((command) => command.button!({ key: command.key }))
  ), [plugins]);

  const combinedToolbarStyles = useMemo(
    () => concatStyleSets({
      root: [
        'slate-HeadingToolbar',
        {
          borderBottom: '2px solid #eee',
          margin: '0px',
          padding: '0px',
          selectors: {
            '.slate-ToolbarButton-active, .slate-ToolbarButton:hover': {
              color: '#06c',
            },
          },
        },
      ],
    }, toolbarStyles),
    [toolbarStyles]);

  return (
    <div>
      {buttons.length > 0 && (
        <HeadingToolbar styles={combinedToolbarStyles}>
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
