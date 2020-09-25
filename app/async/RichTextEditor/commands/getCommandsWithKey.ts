import { CommandPlugins } from '../plugins/types';

import { Command } from './types';

/**
 * Get commands and set undefined command keys.
 * @param {CommandPlugins} plugins The plugins object.
 * @returns {Command[]} Commands with keys.
 */
export const getCommandsWithKey = (plugins: CommandPlugins = {}): Command[] => (
  Object.entries(plugins)
    .filter(([_, plugin]) => plugin && plugin.commands)
    .reduce((result: Command[], [pluginKey, plugin]) => (
      result.concat(
        Object.entries(plugin!.commands!)
          .filter(([_, command]) => command && !command.key)
          .map(([commandKey, command]: any) => ({
            ...command,
            key: `${pluginKey}_${commandKey}`,
          })),
      )
    ), [])
);
