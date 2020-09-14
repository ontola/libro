import { Looks3, LooksOne, LooksTwo } from '@material-ui/icons';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, HeadingPlugin as HeadingPluginBase, HeadingPluginOptions } from '@udecode/slate-plugins';
import React from 'react';
import { Command, Commands } from '../../commands/types';
import { getButtonElement } from '../../utils/getButtonElement';
import { getToggleType } from '../../utils/getToggleType';
import { CommandPlugin } from '../types';

interface HeadingCommands extends Commands {
  formatHeading1?: Command;
  formatHeading2?: Command;
  formatHeading3?: Command;
}

export interface HeadingCommandPlugin extends CommandPlugin {
  commands?: HeadingCommands;
}

export const HeadingPlugin = (options?: HeadingPluginOptions): HeadingCommandPlugin => {
  const typeH1 = options?.h1?.type || ELEMENT_H1;
  const typeH2 = options?.h2?.type || ELEMENT_H2;
  const typeH3 = options?.h3?.type || ELEMENT_H3;

  return {
    ...HeadingPluginBase(options),
    commands: {
      formatHeading1: {
        apply: getToggleType(typeH1),
        button: getButtonElement(typeH1, <LooksOne />),
      },
      formatHeading2: {
        apply: getToggleType(typeH2),
        button: getButtonElement(typeH2, <LooksTwo />),
      },
      formatHeading3: {
        apply: getToggleType(typeH3),
        button: getButtonElement(typeH3, <Looks3 />),
      },
    },
  };
};
