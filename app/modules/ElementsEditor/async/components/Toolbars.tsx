import BorderAll from '@mui/icons-material/BorderAll';
import BorderBottom from '@mui/icons-material/BorderBottom';
import BorderClear from '@mui/icons-material/BorderClear';
import BorderLeft from '@mui/icons-material/BorderLeft';
import BorderRight from '@mui/icons-material/BorderRight';
import BorderTop from '@mui/icons-material/BorderTop';
import Check from '@mui/icons-material/Check';
import CheckBox from '@mui/icons-material/CheckBox';
import Code from '@mui/icons-material/Code';
import FontDownload from '@mui/icons-material/FontDownload';
import FormatAlignCenter from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustify from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeft from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRight from '@mui/icons-material/FormatAlignRight';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatColorText from '@mui/icons-material/FormatColorText';
import FormatItalic from '@mui/icons-material/FormatItalic';
import FormatListBulleted from '@mui/icons-material/FormatListBulleted';
import FormatListNumbered from '@mui/icons-material/FormatListNumbered';
import FormatUnderlined from '@mui/icons-material/FormatUnderlined';
import FormatIndentDecrease from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncrease from '@mui/icons-material/FormatIndentIncrease';
import FormatQuote from '@mui/icons-material/FormatQuote';
import FormatStrikethrough from '@mui/icons-material/FormatStrikethrough';
import Highlight from '@mui/icons-material/Highlight';
import Image from '@mui/icons-material/Image';
import Lightbulb from '@mui/icons-material/Lightbulb';
import LinkIcon from '@mui/icons-material/Link';
import Looks3 from '@mui/icons-material/Looks3';
import Looks4 from '@mui/icons-material/Looks4';
import Looks5 from '@mui/icons-material/Looks5';
import Looks6 from '@mui/icons-material/Looks6';
import LooksOne from '@mui/icons-material/LooksOne';
import Keyboard from '@mui/icons-material/Keyboard';
import Note from '@mui/icons-material/Note';
import OndemandVideo from '@mui/icons-material/OndemandVideo';
import Subscript from '@mui/icons-material/Subscript';
import Superscript from '@mui/icons-material/Superscript';
import LooksTwo from '@mui/icons-material/LooksTwo';
import React from 'react';
import {
  AlignToolbarButton,
  BalloonToolbar,
  BlockToolbarButton,
  CodeBlockToolbarButton,
  ColorPickerToolbarDropdown,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  ImageToolbarButton,
  LinkToolbarButton,
  ListToolbarButton,
  MARK_BG_COLOR,
  MARK_BOLD,
  MARK_CODE,
  MARK_COLOR,
  MARK_HIGHLIGHT,
  MARK_ITALIC,
  MARK_KBD,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  MarkToolbarButton,
  MediaEmbedToolbarButton,
  TableToolbarButton,
  ToolbarButton,
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  deleteTable,
  getPluginType,
  getPreventDefaultHandler,
  indent,
  insertTable,
  outdent,
  usePlateEditorRef,
} from '@udecode/plate';

import { ELEMENT_NOTE } from './plugins/note';
import { ELEMENT_TIP } from './plugins/tip';

export const BasicElementToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <React.Fragment>
      <BlockToolbarButton
        icon={<LooksOne />}
        type={getPluginType(editor, ELEMENT_H1)}
      />
      <BlockToolbarButton
        icon={<LooksTwo />}
        type={getPluginType(editor, ELEMENT_H2)}
      />
      <BlockToolbarButton
        icon={<Looks3 />}
        type={getPluginType(editor, ELEMENT_H3)}
      />
      <BlockToolbarButton
        icon={<Looks4 />}
        type={getPluginType(editor, ELEMENT_H4)}
      />
      <BlockToolbarButton
        icon={<Looks5 />}
        type={getPluginType(editor, ELEMENT_H5)}
      />
      <BlockToolbarButton
        icon={<Looks6 />}
        type={getPluginType(editor, ELEMENT_H6)}
      />
      <BlockToolbarButton
        icon={<FormatQuote />}
        type={getPluginType(editor, ELEMENT_BLOCKQUOTE)}
      />
      <CodeBlockToolbarButton
        icon={<Code />}
        type={getPluginType(editor, ELEMENT_CODE_BLOCK)}
      />
      <BlockToolbarButton
        icon={<Lightbulb />}
        type={getPluginType(editor, ELEMENT_TIP)}
      />
      <BlockToolbarButton
        icon={<Note />}
        type={getPluginType(editor, ELEMENT_NOTE)}
      />
      <BlockToolbarButton
        icon={<CheckBox />}
        type={getPluginType(editor, ELEMENT_TODO_LI)}
      />
    </React.Fragment>
  );
};

export const IndentToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <React.Fragment>
      <ToolbarButton
        icon={<FormatIndentDecrease />}
        onMouseDown={editor && getPreventDefaultHandler(outdent, editor)}
      />
      <ToolbarButton
        icon={<FormatIndentIncrease />}
        onMouseDown={editor && getPreventDefaultHandler(indent, editor)}
      />
    </React.Fragment>
  );
};

export const ListToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <React.Fragment>
      <ListToolbarButton
        icon={<FormatListBulleted />}
        type={getPluginType(editor, ELEMENT_UL)}
      />
      <ListToolbarButton
        icon={<FormatListNumbered />}
        type={getPluginType(editor, ELEMENT_OL)}
      />
    </React.Fragment>
  );
};

export const AlignToolbarButtons = (): JSX.Element => (
  <React.Fragment>
    <AlignToolbarButton
      icon={<FormatAlignLeft />}
      value="left"
    />
    <AlignToolbarButton
      icon={<FormatAlignCenter />}
      value="center"
    />
    <AlignToolbarButton
      icon={<FormatAlignRight />}
      value="right"
    />
    <AlignToolbarButton
      icon={<FormatAlignJustify />}
      value="justify"
    />
  </React.Fragment>
);

export const BasicMarkToolbarButtons = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <React.Fragment>
      <MarkToolbarButton
        icon={<FormatBold />}
        type={getPluginType(editor, MARK_BOLD)}
      />
      <MarkToolbarButton
        icon={<FormatItalic />}
        type={getPluginType(editor, MARK_ITALIC)}
      />
      <MarkToolbarButton
        icon={<FormatUnderlined />}
        type={getPluginType(editor, MARK_UNDERLINE)}
      />
      <MarkToolbarButton
        icon={<FormatStrikethrough />}
        type={getPluginType(editor, MARK_STRIKETHROUGH)}
      />
      <MarkToolbarButton
        icon={<Code />}
        type={getPluginType(editor, MARK_CODE)}
      />
      <MarkToolbarButton
        clear={getPluginType(editor, MARK_SUBSCRIPT)}
        icon={<Superscript />}
        type={getPluginType(editor, MARK_SUPERSCRIPT)}
      />
      <MarkToolbarButton
        clear={getPluginType(editor, MARK_SUPERSCRIPT)}
        icon={<Subscript />}
        type={getPluginType(editor, MARK_SUBSCRIPT)}
      />
    </React.Fragment>
  );
};

export const KbdToolbarButton = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <MarkToolbarButton
      icon={<Keyboard />}
      type={getPluginType(editor, MARK_KBD)}
    />
  );
};

export const HighlightToolbarButton = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  return (
    <MarkToolbarButton
      icon={<Highlight />}
      type={getPluginType(editor, MARK_HIGHLIGHT)}
    />
  );
};

export const TableToolbarButtons = (): JSX.Element => (
  <React.Fragment>
    <TableToolbarButton
      icon={<BorderAll />}
      transform={insertTable}
    />
    <TableToolbarButton
      icon={<BorderClear />}
      transform={deleteTable}
    />
    <TableToolbarButton
      icon={<BorderBottom />}
      transform={addRow}
    />
    <TableToolbarButton
      icon={<BorderTop />}
      transform={deleteRow}
    />
    <TableToolbarButton
      icon={<BorderLeft />}
      transform={addColumn}
    />
    <TableToolbarButton
      icon={<BorderRight />}
      transform={deleteColumn}
    />
  </React.Fragment>
);

export const MarkBallonToolbar = (): JSX.Element => {
  const editor = usePlateEditorRef()!;

  const arrow = false;
  const theme = 'dark';

  return (
    <BalloonToolbar
      arrow={arrow}
      popperOptions={{
        placement: 'top',
      }}
      theme={theme}
    >
      <MarkToolbarButton
        icon={<FormatBold />}
        tooltip={{
          content: 'Bold (⌘B)',
        }}
        type={getPluginType(editor, MARK_BOLD)}
      />
      <MarkToolbarButton
        icon={<FormatItalic />}
        tooltip={{
          content: 'Italic (⌘I)',
        }}
        type={getPluginType(editor, MARK_ITALIC)}
      />
      <MarkToolbarButton
        icon={<FormatUnderlined />}
        tooltip={{
          content: 'Underline (⌘U)',
        }}
        type={getPluginType(editor, MARK_UNDERLINE)}
      />
    </BalloonToolbar>
  );
};

export const ToolbarButtons = (): JSX.Element => (
  <React.Fragment>
    <BasicElementToolbarButtons />
    <ListToolbarButtons />
    <IndentToolbarButtons />
    <BasicMarkToolbarButtons />
    <ColorPickerToolbarDropdown
      icon={<FormatColorText />}
      pluginKey={MARK_COLOR}
      selectedIcon={<Check />}
      tooltip={{ content: 'Text color' }}
    />
    <ColorPickerToolbarDropdown
      icon={<FontDownload />}
      pluginKey={MARK_BG_COLOR}
      selectedIcon={<Check />}
      tooltip={{ content: 'Highlight color' }}
    />
    <AlignToolbarButtons />
    <LinkToolbarButton icon={<LinkIcon />} />
    <ImageToolbarButton icon={<Image />} />
    <MediaEmbedToolbarButton icon={<OndemandVideo />} />
    <TableToolbarButtons />
  </React.Fragment>
);
