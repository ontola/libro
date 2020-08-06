import React, { useMemo } from 'react';
import { EditablePlugins, HeadingToolbar, EditablePluginsProps, ToolbarStyleProps, ToolbarStyles } from '@udecode/slate-plugins';
import { DefaultPlugins } from '../plugins/DefaultPlugins';
import { CommandPlugin } from '../plugins/types';
import { concatStyleSets } from '@uifabric/styling';
import { mergePlugins } from '../plugins/mergePlugins';
import { compareCommands } from '../commands/compareCommands';
import { IStyleFunctionOrObject } from '@uifabric/utilities';

export interface EditableWithPluginsProps extends EditablePluginsProps {
  plugins?: CommandPlugin[];
  toolbarStyles?: IStyleFunctionOrObject<ToolbarStyleProps, ToolbarStyles>;
};

export const EditableWithPlugins: React.FC<EditableWithPluginsProps> = ({ plugins, toolbarStyles, ...props }) => {

  const mergedPlugins: CommandPlugin[] = useMemo(() => 
    mergePlugins(DefaultPlugins, plugins || []), 
    [plugins]
  );

  const buttons: JSX.Element[] = useMemo(() => {
    let allCommands = mergedPlugins?.reduce((commands, plugin) => commands.concat(plugin.commands || []), []);
    return allCommands
      ?.filter(c => c.button)
      ?.sort(compareCommands)
      ?.map((c, index) => c.button({ key: index+1 })) 
      || [];
    },
    [mergedPlugins]
  );

  const combinedToolbarStyles = useMemo(
    () => concatStyleSets({
      root: [
        'slate-HeadingToolbar',
        {
          margin: '0px',
          padding: '0px',
          borderBottom: '2px solid #eee',
          backgroundColor: '#fff',
          selectors: {
            '.slate-ToolbarButton-active, .slate-ToolbarButton:hover': {
              color: '#06c',
            },
          },
        },
      ],
    }, toolbarStyles),
    [toolbarStyles]
  );

  return (
    <div> { 
        buttons.length ?
          <HeadingToolbar styles={combinedToolbarStyles}>
            {buttons}
          </HeadingToolbar> : undefined
      }
      <EditablePlugins 
        plugins={mergedPlugins} 
        placeholder="Enter some text..." 
        {...props}
      />
    </div>
  );
};
