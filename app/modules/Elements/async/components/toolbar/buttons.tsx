import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatStrikethrough,
} from '@material-ui/icons';
import Code from '@material-ui/icons/Code';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import Image from '@material-ui/icons/Image';
import Link from '@material-ui/icons/Link';
import Looks3 from '@material-ui/icons/Looks3';
import LooksOne from '@material-ui/icons/LooksOne';
import LooksTwo from '@material-ui/icons/LooksTwo';
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  KEYS_ALIGN,
  deleteFragment,
  findNode,
  getPlatePluginOptions,
  insertImage,
  insertNodes,
  upsertAlign,
  upsertLinkAtSelection,
} from '@udecode/plate';
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import {
  getPreventDefaultHandler,
  toggleMark,
  toggleNodeType,
} from '@udecode/plate-common';
import { KEYS_HEADING } from '@udecode/plate-heading';
import { ELEMENT_IMAGE } from '@udecode/plate-image';
import { ELEMENT_LINK } from '@udecode/plate-link';
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactEditor } from 'slate-react';

import { elementsMessages } from '../../../../../translations/messages';
import { ComponentCommand, ParameterizedCommand } from '../../commands';
import { ElementsEditor } from '../../editor';
import { isElementTypeActive } from '../../utils/isElementTypeActive';
import { ToggleButtonWithInputDialog } from '../ToggleButtonWithInputDialog';

import { ListButton } from './ListButton';
import { MarkButton } from './MarkButton';

export interface PluginButtonMap {
  [k: string]: ComponentCommand | ParameterizedCommand;
}

export interface GroupConfig {
  changeHandler: (editor: ElementsEditor) => (e: React.MouseEvent<any>, key: string) => void;
  defaultValue: string | undefined;
  valueMatch: string[];
}

const createBoundHandler = <T extends (editor: ElementsEditor, opts: K) => any, K = any>(callback: T, opts: (type: string) => K) =>
  (editor: ElementsEditor) =>
    (e: React.MouseEvent<unknown>, key: string) => {
      const type = getPlatePluginOptions(editor, key).type;
      const args = [editor, opts(type)] as Parameters<typeof callback>;
      const handler = getPreventDefaultHandler(callback, ...args);

      handler(e);
      ReactEditor.focus(editor);
    };

export const groups: Record<string, GroupConfig> = {
  alignmentGroup: {
    changeHandler: createBoundHandler(upsertAlign, (type) => ({
      type,
      unwrapTypes: KEYS_ALIGN,
    })),
    defaultValue: ELEMENT_ALIGN_LEFT,
    valueMatch: KEYS_ALIGN,
  },
  elementGroup: {
    changeHandler: createBoundHandler(toggleNodeType, (type) => ({
      activeType: type,
    })),
    defaultValue: undefined,
    valueMatch: KEYS_HEADING,
  },
  markGroup: {
    changeHandler: createBoundHandler(toggleMark, (type) => type),
    defaultValue: undefined,
    valueMatch: KEYS_HEADING,
  },
};

export const pluginKeyButtonMap: PluginButtonMap = {
  [ELEMENT_ALIGN_CENTER]: {
    buttonGroup: 'alignmentGroup',
    buttonIndex: 171,
    child: FormatAlignCenter,
    key: ELEMENT_ALIGN_CENTER,
    title: 'Align center',
  },
  [ELEMENT_ALIGN_JUSTIFY]: {
    buttonGroup: 'alignmentGroup',
    buttonIndex: 173,
    child: FormatAlignJustify,
    key: ELEMENT_ALIGN_JUSTIFY,
    title: 'Justify',
  },
  [ELEMENT_ALIGN_LEFT]: {
    buttonGroup: 'alignmentGroup',
    buttonIndex: 170,
    child: FormatAlignLeft,
    key: ELEMENT_ALIGN_LEFT,
    title: 'Align left',
  },
  [ELEMENT_ALIGN_RIGHT]: {
    buttonGroup: 'alignmentGroup',
    buttonIndex: 172,
    child: FormatAlignRight,
    key: ELEMENT_ALIGN_RIGHT,
    title: 'Align right',
  },
  [ELEMENT_CODE_BLOCK]: {
    button: (options: any) => (
      <MarkButton
        buttonRef={options.buttonRef}
        key={ELEMENT_CODE_BLOCK}
        title={elementsMessages.codeBlockButton}
        type={options?.code_block?.type ?? ELEMENT_CODE_BLOCK}
      >
        <Code />
      </MarkButton>
    ),
    buttonIndex: 350,
  },
  [ELEMENT_H1]: {
    buttonGroup: 'elementGroup',
    buttonIndex: 210,
    child: LooksOne,
    key: ELEMENT_H1,
    title: elementsMessages.heading1Button,
  },
  [ELEMENT_H2]: {
    buttonGroup: 'elementGroup',
    buttonIndex: 220,
    child: LooksTwo,
    key: ELEMENT_H2,
    title: elementsMessages.heading2Button,
  },
  [ELEMENT_H3]: {
    buttonGroup: 'elementGroup',
    buttonIndex: 230,
    child: Looks3,
    key: ELEMENT_H3,
    title: elementsMessages.heading3Button,
  },
  [ELEMENT_IMAGE]: {
    button: (options: any): JSX.Element => (
      <ToggleButtonWithInputDialog
        buttonId={ELEMENT_IMAGE}
        buttonSelected={isElementTypeActive(ELEMENT_IMAGE)}
        buttonTitle={options?.img?.buttonTitle ?? 'Image'}
        dialogButtonCancel={options?.img?.dialogButtonCancel}
        dialogButtonOK={options?.img?.dialogButtonOK}
        dialogInputType="url"
        dialogText={options?.img?.dialogText ?? 'Enter the URL of the image:'}
        dialogTitle={options?.img?.dialogTitle ?? 'Insert image'}
        key={ELEMENT_IMAGE}
        type={ELEMENT_IMAGE}
        onDialogOK={(editor: ElementsEditor) => (url: string) => {
          if (url) {
            const selectPath = editor.selection;

            if (!selectPath) {
              return insertImage(editor, url);
            }

            const node = findNode(editor, {
              at: selectPath,
              match: {
                type: ELEMENT_IMAGE,
              },
            })!;

            if (node) {
              const [image, path] = node;

              deleteFragment(editor, {
                at: path,
              });
              insertNodes(
                editor, {
                  ...image,
                  url,
                },
                { at: path },
              );
            } else {
              insertImage(editor, url);
            }
          }
        }}
      >
        <Image />
      </ToggleButtonWithInputDialog>
    ),
    buttonIndex: 500,
  },
  [ELEMENT_LINK]: {
    button: (options: any): JSX.Element => {
      const intl = useIntl();

      return (
        <ToggleButtonWithInputDialog
          buttonId={ELEMENT_LINK}
          buttonSelected={isElementTypeActive(ELEMENT_LINK)}
          buttonTitle={intl.formatMessage(elementsMessages.linkButton)}
          dialogButtonCancel={options?.link?.dialogButtonCancel}
          dialogButtonOK={options?.link?.dialogButtonOK}
          dialogInputType="url"
          dialogText={intl.formatMessage(elementsMessages.linkDialogText)}
          dialogTitle={intl.formatMessage(elementsMessages.linkDialogTitle)}
          key={ELEMENT_LINK}
          type={ELEMENT_LINK}
          onDialogOK={(editor: ElementsEditor) => (url: string) => {
            if (url) {
              upsertLinkAtSelection(editor, {
                url,
                wrap: true,
              });
            }
          }}
        >
          { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link />
        </ToggleButtonWithInputDialog>
      );
    },
    buttonIndex: 400,
  },
  [ELEMENT_OL]: {
    button: (): JSX.Element => (
      <ListButton
        key={ELEMENT_OL}
        title={elementsMessages.orderedListButton}
        type={ELEMENT_OL}
      >
        <FormatListNumbered />
      </ListButton>
    ),
    buttonIndex: 300,
  },
  [ELEMENT_UL]: {
    button: (): JSX.Element => (
      <ListButton
        key={ELEMENT_UL}
        title={elementsMessages.unorderedListButton}
        type={ELEMENT_UL}
      >
        <FormatListBulleted />
      </ListButton>
    ),
    buttonIndex: 310,
  },
  [MARK_BOLD]: {
    button: (): JSX.Element => (
      <MarkButton
        key={MARK_BOLD}
        title={elementsMessages.boldButton}
        type={MARK_BOLD}
      >
        <FormatBold />
      </MarkButton>
    ),
    buttonIndex: 100,
  },
  [MARK_ITALIC]: {
    button: (): JSX.Element => (
      <MarkButton
        key={MARK_ITALIC}
        title={elementsMessages.italicButton}
        type={MARK_ITALIC}
      >
        <FormatItalic />
      </MarkButton>
    ),
    buttonIndex: 110,
  },
  [MARK_STRIKETHROUGH]: {
    button: (): JSX.Element => (
      <MarkButton
        key={MARK_STRIKETHROUGH}
        title={elementsMessages.strikethroughButton}
        type={MARK_STRIKETHROUGH}
      >
        <FormatStrikethrough />
      </MarkButton>
    ),
    buttonIndex: 0,
  },
  [MARK_UNDERLINE]: {
    button: (): JSX.Element => (
      <MarkButton
        key={MARK_UNDERLINE}
        title={elementsMessages.underlineButton}
        type={MARK_UNDERLINE}
      >
        <FormatUnderlined />
      </MarkButton>
    ),
    buttonIndex: 120,
  },
};
