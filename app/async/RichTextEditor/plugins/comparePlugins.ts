import { CommandPlugin } from './types';

export const comparePlugins = (plugin1: CommandPlugin, plugin2: CommandPlugin) => {
  const ix1 = plugin1.extendEditorIndex || Number.MAX_SAFE_INTEGER;
  const ix2 = plugin2.extendEditorIndex || Number.MAX_SAFE_INTEGER;

  if (ix1 < ix2) {
    return -1;
  } else if (ix1 > ix2) {
    return 1;
  }

  return 0;
};
