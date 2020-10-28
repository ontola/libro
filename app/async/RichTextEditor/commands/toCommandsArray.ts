import { Command, Commands } from './types';

export const toCommandsArray = (commands: Commands = {}): Command[] => {
  return Object.values(commands).filter(Boolean) as Command[];
};
