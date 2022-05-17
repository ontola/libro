import {
  ArrowDownward,
  ArrowUpward,
  BorderAll,
  BorderBottom,
  BorderClear,
  BorderLeft,
  BorderRight,
  BorderTop,
  Check,
  FontDownload,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatColorText,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatQuote,
  FormatStrikethrough,
  Highlight,
  Keyboard,
  Looks4,
  Looks5,
  Looks6,
  OndemandVideo,
} from '@material-ui/icons';
import Code from '@material-ui/icons/Code';
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import Image from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import Looks3 from '@material-ui/icons/Looks3';
import LooksOne from '@material-ui/icons/LooksOne';
import LooksTwo from '@material-ui/icons/LooksTwo';
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
        icon={<ArrowDownward />}
        type={getPluginType(editor, MARK_SUPERSCRIPT)}
      />
      <MarkToolbarButton
        clear={getPluginType(editor, MARK_SUPERSCRIPT)}
        icon={<ArrowUpward />}
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
