import { Command } from './types';

export const mergeCommands = (commands: Command[], extensions: Command[]): Command[] => {
  let mergedCommands = commands.map(command => {
    const extension = extensions.find(e => e.name === command.name) || {};
    return { ...command, ...extension};
  });
  
  const newCommands = extensions.filter(
    (extension) => !mergedCommands.find((command) => command.name === extension.name)
  ); 
  mergedCommands.push(...newCommands);

  return mergedCommands.filter(command => !command.disabled);
};
