import { Command, Commands } from './types';

export const toCommandsArray = (commands: Commands = {}): Command[] => Object.values(commands).filter(Boolean) as Command[];
