import {
  EditablePlugins,
  EditablePluginsProps,
  ToolbarStyleProps,
  ToolbarStyles,
} from '@udecode/slate-plugins';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import React, { useCallback, useMemo } from 'react';

import { Command, compareButtonIndexes, toCommandsArray } from '../commands';
import { CommandPlugins, toPluginsArray } from '../plugins';

export interface EditableWithPluginsProps extends Omit<EditablePluginsProps, 'plugins'> {
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  plugins?: CommandPlugins;
  toolbarStyles?: IStyleFunctionOrObject<ToolbarStyleProps, ToolbarStyles>;
}

export const EditableWithPlugins: React.FC<EditableWithPluginsProps> = ({
  onBlur,
  plugins,
  toolbarClassName,
  ...props
}) => {
  const pluginsArray = useMemo(() => toPluginsArray(plugins), [plugins]);

  const buttons = useMemo(() => (
    pluginsArray
      .reduce((commands: Command[], plugin) => commands.concat(toCommandsArray(plugin.commands)), [])
      .filter((command) => command.button)
      .sort(compareButtonIndexes)
      .map((command) => command.button)
  ), [plugins]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!onBlur) {
      return;
    }
    /*
     * Check the newly focused element in the next tick of the event loop.
     * Solution from https://gist.github.com/pstoica/4323d3e6e37e8a23dd59
     */
    const currentTarget = event.currentTarget;
    setTimeout(() => {
      const [dialogRoot] = document.getElementsByClassName('MuiDialog-root');
      if (!currentTarget.contains(document.activeElement) && !dialogRoot?.contains(document.activeElement)) {
        onBlur(event);
      }
    }, 0);
  }, [onBlur]);

  return (
    <div onBlur={handleBlur}>
      {buttons.length > 0 && (
        <div className={`Toolbar ${toolbarClassName}`}>
          {buttons}
        </div>
      )}
      <EditablePlugins plugins={pluginsArray} {...props}/>
    </div>
  );
};
