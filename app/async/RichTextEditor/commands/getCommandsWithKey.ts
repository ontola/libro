import { CommandPlugins } from '../plugins/types';

import { CommandWithKey } from './types';

export const getCommandsWithKey = (plugins: CommandPlugins = {}): CommandWithKey[] => (
  Object.entries(plugins)
    .filter(([_, plugin]) => plugin && plugin.commands)
    .reduce((result: CommandWithKey[], [pluginKey, plugin]) => (
      result.concat(
        Object.entries(plugin!.commands!)
          .filter(([_, command]) => command)
          .map(([commandKey, command]: any) => ({
            ...command,
            key: `${pluginKey}_${commandKey}`,
          })),
      )
    ), [])
);
