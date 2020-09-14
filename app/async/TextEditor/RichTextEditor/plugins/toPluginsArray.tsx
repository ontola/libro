import { CommandPlugin, CommandPlugins } from './types';

export const toPluginsArray = (plugins: CommandPlugins | undefined): CommandPlugin[] => {
  return Object.values(plugins || {}).filter(Boolean) as CommandPlugin[];
};
