import { Link } from '@material-ui/icons';
import { DEFAULTS_LINK, LinkPlugin as LinkPluginBase, LinkPluginOptions, ToolbarLink, withLink } from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';
import { Command, Commands } from '../../commands/types';
import { CommandPlugin } from '../types';

export interface LinkCommands extends Commands {
  insertLink?: Command;
}

export interface LinkCommandPlugin extends CommandPlugin {
  commands?: LinkCommands;
}

export const LinkPlugin = (options?: LinkPluginOptions): LinkCommandPlugin => {
  return {
    ...LinkPluginBase(options),
    commands: {
      insertLink: {
        button: (props) => <ToolbarLink {...DEFAULTS_LINK} icon={<Link />} {...props} />,
      },
    },
    extendEditor: withLink() as <T extends Editor>(editor: T) => T,
  };
};
