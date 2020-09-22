import { Command } from './types';

export const compareCommands = (command1: Command, command2: Command) => {
  const ix1 = command1.buttonIndex || Number.MAX_SAFE_INTEGER;
  const ix2 = command2.buttonIndex || Number.MAX_SAFE_INTEGER;

  if (ix1 < ix2) {
    return -1;
  } else if (ix1 > ix2) {
    return 1;
  }

  return 0;
};
