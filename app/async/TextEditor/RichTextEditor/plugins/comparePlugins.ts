import { CommandPlugin } from './types';

export const comparePlugins = (plugin1: CommandPlugin, plugin2: CommandPlugin) => {
  const ix1 = plugin1.extendEditorIndex || Number.MAX_SAFE_INTEGER;
  const ix2 = plugin2.extendEditorIndex || Number.MAX_SAFE_INTEGER;
  return (ix1 < ix2) ? -1 : (ix1 > ix2) ? 1 : 0;
};
