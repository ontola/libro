import Link from '@material-ui/icons/Link';
import {
  DEFAULTS_LINK,
  ELEMENT_LINK,
  LinkPluginOptions,
  isNodeTypeIn,
  LinkPlugin as linkPluginBase,
  upsertLinkAtSelection,
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

export const LINK_COMMAND_KEY = 'insertLink';

export interface LinkCommands extends Commands {
  [LINK_COMMAND_KEY]: Command;
}

export type LinkCommandPlugin = CommandPlugin<LinkCommands>;

export type LinkCommandPluginOptions = LinkPluginOptions & {
  link: ButtonOptions & InputDialogOptions;
};

export const linkPlugin = (options?: LinkCommandPluginOptions): LinkCommandPlugin => ({
  ...linkPluginBase(options),
  commands: {
    [LINK_COMMAND_KEY]: {
      button:
  <ToggleButtonWithInputDialog
    buttonId={LINK_COMMAND_KEY}
    buttonSelected={(editor: Editor) => isNodeTypeIn(editor, options?.link?.type || ELEMENT_LINK)}
    buttonTitle={options?.link.buttonTitle || 'Link'}
    dialogButtonCancel={options?.link.dialogButtonCancel}
    dialogButtonOK={options?.link.dialogButtonOK}
    dialogInputType="url"
    dialogText={options?.link.dialogText || 'Enter the URL of the link:'}
    dialogTitle={options?.link.dialogTitle || 'Insert link'}
    key={LINK_COMMAND_KEY}
    onDialogOK={(editor: Editor) => (url: string) => {
      if (url) {
        upsertLinkAtSelection(editor, url, DEFAULTS_LINK);
      }
    }}
  >
    { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
    <Link />
  </ToggleButtonWithInputDialog>,
    },
  },
});
