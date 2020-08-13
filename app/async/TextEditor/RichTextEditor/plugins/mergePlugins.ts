import { CommandPlugin } from './types';
import { mergeCommands } from '../commands/mergeCommands';

export const mergePlugins = (plugins: CommandPlugin[], extensions: CommandPlugin[]): CommandPlugin[] => {
  // TODO: merge doubles
  let mergedPlugins = plugins.map(plugin => {
    const extension = extensions.find(e => e.name === plugin.name);
    if (extension) {
      const mergedCommands = mergeCommands(plugin.commands || [], extension.commands || []);
      return { ...plugin, ...extension, commands: mergedCommands };
    } else {
      return plugin;
    }
  });
  
  const newPlugins = extensions.filter(
    extension => !mergedPlugins.find((plugin: CommandPlugin) => plugin.name === extension.name)
  );
  mergedPlugins.push(...newPlugins);

  return mergedPlugins;
}
