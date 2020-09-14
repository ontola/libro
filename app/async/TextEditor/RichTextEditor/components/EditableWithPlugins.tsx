import React, { useMemo } from 'react';

import { EditablePlugins, EditablePluginsProps, HeadingToolbar, ToolbarStyleProps, ToolbarStyles } from '@udecode/slate-plugins';
import { concatStyleSets } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';

import { compareCommands } from '../commands/compareCommands';
import { toCommandsArray } from '../commands/toCommandsArray';
import { Command } from '../commands/types';
import { CommandPlugins, CommandPlugin } from '../plugins/types';
import { toPluginsArray } from '../plugins/toPluginsArray';

export interface EditableWithPluginsProps extends Omit<EditablePluginsProps, 'plugins'> {
  plugins: CommandPlugins;
  toolbarStyles?: IStyleFunctionOrObject<ToolbarStyleProps, ToolbarStyles>;
}

export const EditableWithPlugins: React.FC<EditableWithPluginsProps> = ({ plugins, toolbarStyles, ...props }) => {
  const pluginsArray = useMemo(() => (
    Object.values(plugins || {}).filter((plugin) => plugin) as CommandPlugin[]
  ), [plugins]);

  const buttons: JSX.Element[] = useMemo(() => (
    // From plugins...
    toPluginsArray(plugins)
      // to commands...
      .reduce((commands: Command[], plugin) => commands.concat(toCommandsArray(plugin!.commands)), [])
      .filter((command) => command.button)
      .sort(compareCommands)
      // to buttons...
      .map((command, index) => command.button!({ key: index + 1 }))
  ), [pluginsArray]);

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
    <div> {
        buttons.length ?
          <HeadingToolbar styles={combinedToolbarStyles}>
            {buttons}
          </HeadingToolbar> : undefined
      }
      <EditablePlugins
        plugins={pluginsArray}
        placeholder="Enter some text..."
        {...props}
      />
    </div>
  );
};
