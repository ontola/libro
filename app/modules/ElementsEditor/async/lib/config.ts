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
  TEditableProps,
  TrailingBlockPlugin,
  createPlateUI,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@udecode/plate';

import { ELEMENT_TIP } from '../components/plugins/tip';

const resetBlockTypesCommonRule = {
  defaultType: ELEMENT_PARAGRAPH,
  types: [
    ELEMENT_BLOCKQUOTE,
    ELEMENT_TODO_LI,
    ELEMENT_TIP,
  ],
};

export const enum LineHeights {
  VeryDense = 1,
  Dense = 1.2,
  Normal = 1.5,
  Wide = 2,
  VeryWide = 3,
}

export interface ElementsConfig {
  components: Record<string, any>
  editableProps: TEditableProps

  align: Partial<PlatePlugin>
  exitBreak: Partial<PlatePlugin<ExitBreakPlugin>>
  forceLayout: Partial<PlatePlugin<NormalizeTypesPlugin>>
  indent: Partial<PlatePlugin<IndentPlugin>>
  lineHeight: Partial<PlatePlugin>
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

  components: createPlateUI(),
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
        defaultNodeValue: LineHeights.Normal,
        validNodeValues: [
          LineHeights.VeryDense,
          LineHeights.Dense,
          LineHeights.Normal,
          LineHeights.Wide,
          LineHeights.VeryWide,

        ],
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
            allow: [
              ELEMENT_CODE_BLOCK,
              ELEMENT_BLOCKQUOTE,
              ELEMENT_TD,
              ELEMENT_TIP,
            ],
          },
        },
      ],
    },
  },

  trailingBlock: { type: ELEMENT_PARAGRAPH },
};
