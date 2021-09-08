import {
  DEFAULTS_PARAGRAPH,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  WithTrailingBlock,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from '@udecode/plate';
import { ExitBreakPluginOptions, SoftBreakPluginOptions } from '@udecode/plate-break';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { ResetBlockTypePluginOptions } from '@udecode/plate-reset-node';

export const exitBreakPluginOptions: ExitBreakPluginOptions = {
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
        allow: [
          ELEMENT_H1,
          ELEMENT_H2,
          ELEMENT_H3,
        ],
        end: true,
        start: true,
      },
    },
  ],
};

const resetBlockTypesCommonRule = {
  defaultType: DEFAULTS_PARAGRAPH.p?.type,
  types: [
    ELEMENT_CODE_BLOCK,
  ],
};

export const resetBlockTypePluginOptions: ResetBlockTypePluginOptions = {
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
};

export const softBreakPluginOptions: SoftBreakPluginOptions = {
  rules: [
    { hotkey: 'shift+enter' },
    {
      hotkey: 'enter',
      query: {
        allow: [
          ELEMENT_CODE_BLOCK,
        ],
      },
    },
  ],
};

export const trailingBlockPluginOptions: WithTrailingBlock = {
  type: ELEMENT_PARAGRAPH,
};
