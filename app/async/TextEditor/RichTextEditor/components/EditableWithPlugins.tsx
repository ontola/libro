import React, { useMemo } from 'react';

import { EditablePlugins, EditablePluginsProps, HeadingToolbar, ToolbarStyleProps, ToolbarStyles } from '@udecode/slate-plugins';
import { concatStyleSets } from '@uifabric/styling';
import { IStyleFunctionOrObject } from '@uifabric/utilities';

import { compareCommands } from '../commands/compareCommands';
import { Command } from '../commands/types';
import { CommandPlugin } from '../plugins/types';

export interface EditableWithPluginsProps extends EditablePluginsProps {
  plugins?: CommandPlugin[];
  toolbarStyles?: IStyleFunctionOrObject<ToolbarStyleProps, ToolbarStyles>;
}

export const EditableWithPlugins: React.FC<EditableWithPluginsProps> = ({ plugins, toolbarStyles, ...props }) => {
  const buttons: JSX.Element[] = useMemo(() => (
    // From plugins...
    (plugins || [])
      .filter((plugin) => !plugin.disabled)
      // to commands...
      .reduce((commands: Command[], plugin) => commands.concat(plugin.commands || []), [])
      .filter((command) => !command.disabled && command.button)
      .sort(compareCommands)
      // to buttons...
      .map((command, index) => command.button!({ key: index + 1 }))
  ), [plugins]);

  const combinedToolbarStyles = useMemo(
    () => concatStyleSets({
      root: [
        'slate-HeadingToolbar',
        {
          backgroundColor: '#fff',
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
        plugins={plugins}
        placeholder="Enter some text..."
        {...props}
      />
    </div>
  );
};
