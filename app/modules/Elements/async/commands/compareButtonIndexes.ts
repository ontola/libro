import { Command } from './types';

export const compareButtonIndexes = (command1: Command, command2: Command): number => {
  const ix1 = command1.buttonIndex ?? Number.MAX_SAFE_INTEGER;
  const ix2 = command2.buttonIndex ?? Number.MAX_SAFE_INTEGER;

  return ix1 - ix2;
};
