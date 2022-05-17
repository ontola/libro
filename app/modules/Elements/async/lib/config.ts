import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
  ExitBreakPlugin,
  IndentPlugin,
  KEYS_HEADING,
  NormalizeTypesPlugin,
  PlatePlugin,
  ResetNodePlugin,
  SelectOnBackspacePlugin,
  SoftBreakPlugin,
  TrailingBlockPlugin,
  createPlateUI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@udecode/plate';
import { EditableProps } from 'slate-react/dist/components/editable';

// import { autoformatRules } from './autoformat/autoformatRules';
// import { MENTIONABLES } from './mentionables';

const resetBlockTypesCommonRule = {
  defaultType: ELEMENT_PARAGRAPH,
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
};

export interface ElementsConfig {
  components: Record<string, any>
  editableProps: EditableProps

  align: Partial<PlatePlugin>
  // autoformat: Partial<PlatePlugin<AutoformatPlugin>>
  exitBreak: Partial<PlatePlugin<ExitBreakPlugin>>
  forceLayout: Partial<PlatePlugin<NormalizeTypesPlugin>>
  indent: Partial<PlatePlugin<IndentPlugin>>
  lineHeight: Partial<PlatePlugin>
  // mentionItems: any
  resetBlockType: Partial<PlatePlugin<ResetNodePlugin>>
  selectOnBackspace: Partial<PlatePlugin<SelectOnBackspacePlugin>>
  softBreak: Partial<PlatePlugin<SoftBreakPlugin>>
  trailingBlock: Partial<PlatePlugin<TrailingBlockPlugin>>
}

export const config: ElementsConfig = {
  align: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
        ],
      },
    },
  },
  // autoformat: {
  //   options: {
  //     rules: autoformatRules,
  //   },
  // },

  components: createPlateUI({
    // [ELEMENT_CODE_BLOCK]: withProps(CodeBlockElement, {
    //   styles: {
    //     root: [
    //       css`
    //         background-color: #111827;
    //         code {
    //           color: white;
    //         }
    //       `,
    //     ],
    //   },
    // }),
  }),
  editableProps: {
    autoFocus: false,
    placeholder: 'Type…',
    spellCheck: false,
    style: {
      padding: '15px',
    },
  },
  exitBreak: {
    options: {
      rules: [
        {
          hotkey: 'mod+enter',
        },
        {
          before: true,
          hotkey: 'mod+shift+enter',
        },
        {
          hotkey: 'enter',
          query: {
            allow: KEYS_HEADING,
            end: true,
            start: true,
          },
        },
      ],
    },
  },
  forceLayout: {
    options: {
      rules: [],
    },
  },
  indent: {
    inject: {
      props: {
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
          ELEMENT_BLOCKQUOTE,
          ELEMENT_CODE_BLOCK,
        ],
      },
    },
  },
  lineHeight: {
    inject: {
      props: {
        defaultNodeValue: 1.5,
        validNodeValues: [1, 1.2, 1.5, 2, 3],
        validTypes: [
          ELEMENT_PARAGRAPH,
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
          ELEMENT_H4,
          ELEMENT_H5,
          ELEMENT_H6,
        ],
      },
    },
  },
  // mentionItems: MENTIONABLES,
  resetBlockType: {
    options: {
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
      ],
    },
  },
  selectOnBackspace: {
    options: {
      query: {
        allow: [ELEMENT_IMAGE, ELEMENT_HR],
      },
    },
  },
  softBreak: {
    options: {
      rules: [
        { hotkey: 'shift+enter' },
        {
          hotkey: 'enter',
          query: {
            allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
          },
        },
      ],
    },
  },
  trailingBlock: { type: ELEMENT_PARAGRAPH },
};
