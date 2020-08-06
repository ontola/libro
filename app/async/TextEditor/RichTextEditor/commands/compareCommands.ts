import { Command } from './types';

export const compareCommands = (command1: Command, command2: Command) => {
  const ix1 = command1.buttonIndex || Number.MAX_SAFE_INTEGER;
  const ix2 = command2.buttonIndex || Number.MAX_SAFE_INTEGER;
  return (ix1 < ix2) ? -1 : (ix1 > ix2) ? 1 : 0;
};
