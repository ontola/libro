import { Image } from '@material-ui/icons';
import { DEFAULTS_IMAGE, ImagePlugin as ImagePluginBase, ImagePluginOptions, ToolbarImage, withImageUpload } from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';
import { Command, Commands } from '../../commands/types';
import { CommandPlugin } from '../types';

interface ImageCommands extends Commands {
  insertImage?: Command;
}

export interface ImageCommandPlugin extends CommandPlugin {
  commands?: ImageCommands;
}

export const ImagePlugin = (options?: ImagePluginOptions): ImageCommandPlugin => {
  return {
    ...ImagePluginBase(options),
    commands: {
      insertImage: {
        button: (props) => <ToolbarImage {...DEFAULTS_IMAGE} icon={<Image />} {...props} />,
      },
    },
    extendEditor: withImageUpload() as <T extends Editor>(editor: T) => T,
  };
};
