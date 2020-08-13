import React from 'react';
import { Editor } from 'slate';
import isHotkey from 'is-hotkey';
import {
  BoldPlugin,
  CodeBlockPlugin,
  DEFAULTS_ALIGN,
  DEFAULTS_BLOCKQUOTE,
  DEFAULTS_BOLD,
  DEFAULTS_CODE,
  DEFAULTS_CODE_BLOCK,
  DEFAULTS_HEADING,
  DEFAULTS_HIGHLIGHT,
  DEFAULTS_IMAGE,
  DEFAULTS_ITALIC,
  DEFAULTS_LINK,
  DEFAULTS_LIST,
  DEFAULTS_MEDIA_EMBED,
  DEFAULTS_MENTION,
  DEFAULTS_PARAGRAPH,
  DEFAULTS_SEARCH_HIGHLIGHT,
  DEFAULTS_STRIKETHROUGH,
  DEFAULTS_SUBSUPSCRIPT,
  DEFAULTS_TABLE,
  DEFAULTS_TODO_LIST,
  DEFAULTS_UNDERLINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_OL,
  ELEMENT_UL,
  ExitBreakPlugin,
  HeadingPlugin,
  ImagePlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  ItalicPlugin,
  LinkPlugin,
  ListPlugin,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  ParagraphPlugin,
  ResetBlockTypePlugin,
  ResetBlockTypePluginOptions,
  SoftBreakPlugin,
  ToolbarImage,
  ToolbarLink,
  UnderlinePlugin,
  ListOnKeyDownOptions,
  withImageUpload,
  withLink,
  withToggleType,
  withInlineVoid,
  withTransforms,
  withTrailingNode,
} from '@udecode/slate-plugins';
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
  Image,
  Link,
  Looks3,
  LooksOne,
  LooksTwo
} from '@material-ui/icons';

import { withListItems } from '../transforms/withListItems';
import { PluginEditor } from '../transforms';
import { getButtonElement } from '../utils/getButtonElement';
import { getButtonList } from '../utils/getButtonList';
import { getButtonMark } from '../utils/getButtonMark';
import { getToggleList } from '../utils/getToggleList';
import { getToggleMark } from '../utils/getToggleMark';
import { getToggleType } from '../utils/getToggleType';

import { CommandPlugin } from './types';

export const options = {
  ...DEFAULTS_PARAGRAPH,
  ...DEFAULTS_MENTION,
  ...DEFAULTS_BLOCKQUOTE,
  ...DEFAULTS_CODE_BLOCK,
  ...DEFAULTS_LINK,
  ...DEFAULTS_IMAGE,
  ...DEFAULTS_MEDIA_EMBED,
  ...DEFAULTS_TODO_LIST,
  ...DEFAULTS_TABLE,
  ...DEFAULTS_LIST,
  ...DEFAULTS_HEADING,
  ...DEFAULTS_ALIGN,
  // marks
  ...DEFAULTS_BOLD,
  ...DEFAULTS_ITALIC,
  ...DEFAULTS_UNDERLINE,
  ...DEFAULTS_STRIKETHROUGH,
  ...DEFAULTS_CODE,
  ...DEFAULTS_SUBSUPSCRIPT,
  ...DEFAULTS_HIGHLIGHT,
  ...DEFAULTS_SEARCH_HIGHLIGHT,
};

const resetBlockTypesCommonRule = {
  types: [
    // options.blockquote.type,
    options.code_block.type,
    // options.todo_li.type,
  ],
  defaultType: options.p.type,
};

export const optionsResetBlockTypes: ResetBlockTypePluginOptions = {
  rules: [
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Enter',
      predicate: isBlockAboveEmpty,
    },
    {
      ...resetBlockTypesCommonRule,
      hotkey: 'Backspace',
      predicate: isSelectionAtBlockStart,
    },
    // {
    //   types: [ options.h1.type ],
    //   defaultType: options.p.type,
    //   hotkey: 'Enter',
    //   predicate: () => true,
    // },
  ],
};

// TODO
export const onKeyDownList = (options1?: ListOnKeyDownOptions) => (e: KeyboardEvent, editor: Editor) => {
  if (isHotkey('mod+1', e)) {
    getToggleList('ol', options)(editor);
  }  
  ListPlugin(options1).onKeyDown(e, editor);
};

export const DefaultPlugins: CommandPlugin[] = [
  {
    name: 'Bold',
    ...BoldPlugin(options),
    commands: [
      {
        name: 'FormatBold',
        apply: getToggleMark(MARK_BOLD),
        button: getButtonMark(MARK_BOLD, <FormatBold />),
        buttonIndex: 100,    
      },
    ]
  },
  {
    name: 'CodeBlock',
    ...CodeBlockPlugin(options),
    commands: [
      {
        name: 'FormatCodeBlock',
        button: getButtonElement(options.code_block.type, <Code />),
        buttonIndex: 350,
      }
    ]
  },
  {
    name: 'ExitBreak',
    ...ExitBreakPlugin({
      rules: [
        {
          hotkey: 'mod+enter',
        },
        {
          hotkey: 'mod+shift+enter',
          before: true,
        },
        {
          hotkey: 'enter',
          query: {
            start: true,
            end: true,
            allow: [
              ELEMENT_H1,
              ELEMENT_H2,
              ELEMENT_H3,
            ],
          },
        },
      ],
    })
  },
  {
    name: 'Heading',
    ...HeadingPlugin(options),
    commands: [
      {
        name: 'FormatHeading1',
        apply: getToggleType(ELEMENT_H1),
        button: getButtonElement(options.h1.type, <LooksOne />),
        buttonIndex: 200,
      },
      {
        name: 'FormatHeading2',
        apply: getToggleType(ELEMENT_H2),
        button: getButtonElement(options.h2.type, <LooksTwo />),
        buttonIndex: 210,
      },
      {
        name: 'FormatHeading3',
        apply: getToggleType(ELEMENT_H3),
        button: getButtonElement(options.h3.type, <Looks3 />),
        buttonIndex: 220,
      },    
    ]
  },
  {
    name: 'Image',
    ...ImagePlugin(options),
    extendEditor: withImageUpload() as <T extends Editor>(editor: T) => T,
    extendEditorIndex: 200,
    commands: [
      {
        name: 'InsertImage',
        button: (props) => <ToolbarImage {...DEFAULTS_IMAGE} icon={<Image />} {...props} />,
        buttonIndex: 500,
      },
    ],
  },
  {
    name: 'InlineVoid',
    extendEditor: <T extends Editor>(editor: T) => {
      const e = editor as T & PluginEditor;
      return withInlineVoid({ plugins: e.plugins })(e);
    },
    extendEditorIndex: 600,
  },
  {
    name: 'Italic',
    ...ItalicPlugin(options),
    commands: [
      {
        name: 'FormatItalic',
        apply: getToggleMark(MARK_ITALIC),
        button: getButtonMark(MARK_ITALIC, <FormatItalic />),
        buttonIndex: 110,
      }
    ],
    disabled: false,
  },
  {
    name: 'Link',
    ...LinkPlugin(options),
    extendEditor: withLink() as <T extends Editor>(editor: T) => T,
    extendEditorIndex: 100,
    commands: [
      {
        name: 'InsertLink',
        button: (props) => <ToolbarLink {...DEFAULTS_LINK} icon={<Link />} {...props} />,
        buttonIndex: 400,
      },
    ],
  },
  {
    name: 'List', 
    ...ListPlugin(DEFAULTS_LIST),
    onKeyDown: onKeyDownList(options),
    extendEditor: withListItems as <T extends Editor>(editor: T) => T,
    extendEditorIndex: 700,
    commands: [
      {
        name: 'FormatListOrdered',
        apply: getToggleList(ELEMENT_OL, DEFAULTS_LIST),
        button: getButtonList(DEFAULTS_LIST.ol.type, DEFAULTS_LIST, <FormatListNumbered />),
        buttonIndex: 300,
      },
      {
        name: 'FormatListUnordered',
        apply: getToggleList(ELEMENT_UL, DEFAULTS_LIST),
        button: getButtonList(DEFAULTS_LIST.ul.type, DEFAULTS_LIST, <FormatListBulleted />),
        buttonIndex: 310,
      },
    ],
  },
  {
    name: 'Paragraph',
    ...ParagraphPlugin(options),
    commands: [
      {
        name: 'FormatParagraph',
      },
    ],
  },
  {
    name: 'ResetBlockType',
    ...ResetBlockTypePlugin(optionsResetBlockTypes),
  },
  {
    name: 'SoftBreak',
    ...SoftBreakPlugin({
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [
              options.code_block.type,
              // options.blockquote.type,
              // options.td.type,
            ],
          },
        },
      ],
    })
  },
  {
    name: 'ToggleType',
    extendEditor: withToggleType({ defaultType: options.p.type }),
    extendEditorIndex: 300,
  },
  {
    name: 'TrailingNode',
    extendEditor: withTrailingNode({ type: options.p.type }) as <T extends Editor>(editor: T) => T,
    extendEditorIndex: 500, // after withTransforms
  },
  {
    name: 'Transforms',
    extendEditor: withTransforms(),
    extendEditorIndex: 400, // before withTrailingNode
  },
  {
    name: 'Underline',
    ...UnderlinePlugin(options),
    commands: [
      {
        name: 'FormatUnderline',
        apply: getToggleMark(MARK_UNDERLINE),
        button: getButtonMark(MARK_UNDERLINE, <FormatUnderlined />),
        buttonIndex: 120,
      },
    ],
  },
];
