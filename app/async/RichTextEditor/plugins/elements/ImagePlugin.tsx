import Image from '@material-ui/icons/Image';
import {
  DEFAULTS_IMAGE,
  ELEMENT_IMAGE,
  ImagePluginOptions,
  ImagePlugin as imagePluginBase,
  insertImage,
  isNodeTypeIn,
} from '@udecode/slate-plugins';
import React from 'react';
import { Editor } from 'slate';

import { Command, Commands } from '../../commands';
import { ToggleButtonWithInputDialog } from '../../components';
import {
  ButtonOptions,
  CommandPlugin,
  InputDialogOptions,
} from '../types';

export const IMAGE_COMMAND_KEY = 'insertImage';

export interface ImageCommands extends Commands {
  [IMAGE_COMMAND_KEY]: Command;
}

export type ImageCommandPlugin = CommandPlugin<ImageCommands>;

export type ImageCommandPluginOptions = ImagePluginOptions & {
  img: ButtonOptions & InputDialogOptions;
};

export const imagePlugin = (options?: ImageCommandPluginOptions): ImageCommandPlugin => ({
  ...imagePluginBase(options),
  commands: {
    [IMAGE_COMMAND_KEY]: {
      button:
  <ToggleButtonWithInputDialog
    buttonId={IMAGE_COMMAND_KEY}
    buttonSelected={(editor: Editor) => isNodeTypeIn(editor, options?.img?.type || ELEMENT_IMAGE)}
    buttonTitle={options?.img.buttonTitle || 'Image'}
    dialogButtonCancel={options?.img.dialogButtonCancel}
    dialogButtonOK={options?.img.dialogButtonOK}
    dialogInputType="url"
    dialogText={options?.img.dialogText || 'Enter the URL of the image:'}
    dialogTitle={options?.img.dialogTitle || 'Insert image'}
    key={IMAGE_COMMAND_KEY}
    onDialogOK={(editor: Editor) => (url: string) => {
      if (url) {
        insertImage(editor, url, DEFAULTS_IMAGE);
      }
    }}
  >
    <Image />
  </ToggleButtonWithInputDialog>,
    },
  },
});
