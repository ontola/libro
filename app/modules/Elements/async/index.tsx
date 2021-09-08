import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  ELEMENT_MEDIA_EMBED,
  LinkElement,
  Plate,
  StyledElement,
  createAlignPlugin,
  createBlockquotePlugin,
  createCodePlugin,
  createDndPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createPlateComponents,
  createReactPlugin,
  createSelectOnBackspacePlugin,
  createStrikethroughPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  withDraggables,
  withPlaceholders,
  withProps,
} from '@udecode/plate';
import {
  MARK_BOLD,
  MARK_ITALIC,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import { createCodeBlockPlugin } from '@udecode/plate-code-block';
import { ELEMENT_IMAGE, createImagePlugin } from '@udecode/plate-image';
import {
  ELEMENT_LINK,
  LinkNodeData,
  createLinkPlugin,
} from '@udecode/plate-link';
import {
  ELEMENT_OL,
  ELEMENT_UL,
  createListPlugin,
} from '@udecode/plate-list';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { StyledElementProps } from '@udecode/plate-styled-components';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Node } from 'slate';

import { ElementsEditorWrapperProps } from '../../../containers/ElementsEditor';
import useStoredState from '../../../hooks/useStoredState';

import { Toolbar } from './components/Toolbar';
import { useElementsEditor } from './editor';
import {
  exitBreakPluginOptions,
  resetBlockTypePluginOptions,
  softBreakPluginOptions,
  trailingBlockPluginOptions,
} from './plugins/defaultPlugins';
import { draggableConfiguration } from './plugins/draggableConfiguration';
import { placeholderConfiguration } from './plugins/placeholderConfiguration';
import { isElementTypeActive } from './utils/isElementTypeActive';

const useStyles = makeStyles((theme: any) => ({
  slateEditor: {
    minHeight: '100px',
    padding: '8px 11px',
    wordBreak: 'break-word',
  },
  slateItalic: {
    fontStyle: 'italic',
  },
  slateOrderedList: {
    listStyleType: 'decimal',
  },
  slateToolbar: {
    '& .MuiToggleButton-root': {
      '& svg': {
        height: '20px',
        width: '20px',
      },
      'border': 0,
      'marginRight': '1px',
      'padding': '.45em',
    },
    'borderBottom': `1px solid ${theme?.palette?.grey?.xLight}`,
    'display': 'grid',
    'grid-template-columns': 'repeat(auto-fit, 2.5em)',
    'margin': '0px',
    'padding': '2px',
  },
  slateUnorderedList: {
    '& ul': {
      '& ul': {
        listStyleType: 'square',
      },
      'listStyleType': 'circle',
    },
    'listStyleType': 'disc',
  },
  wrapper: {
    backgroundColor: theme?.palette?.grey?.xxLight,
    border: `1px solid ${theme?.palette?.grey?.xLight}`,
    borderRadius: '5px',
    flex: 1,
    overflow: 'scroll',
    position: 'relative',
  },
}));

const emptyDocument = (): Node[] => [
  {
    children: [{
      text: '',
    }],
    type: 'p',
  },
];

const pluginsBasic = () => [
  // editor
  createReactPlugin(),
  createHistoryPlugin(),

  // elements
  createParagraphPlugin(),
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),
  createImagePlugin(),
  createSelectOnBackspacePlugin({ allow: [] }),
  createLinkPlugin(),
  createTodoListPlugin(),
  createListPlugin(),
  createMediaEmbedPlugin(),
  createTablePlugin(),

  // marks
  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  createCodePlugin(),
  createAlignPlugin(),
  createHighlightPlugin(),
  createFontColorPlugin(),
  createFontBackgroundColorPlugin(),

  // Utility
  createKbdPlugin(),
  createNodeIdPlugin(),
  createDndPlugin(),
  createResetNodePlugin(resetBlockTypePluginOptions),
  createSoftBreakPlugin(softBreakPluginOptions),
  createExitBreakPlugin(exitBreakPluginOptions),
  createTrailingBlockPlugin(trailingBlockPluginOptions),
  createSelectOnBackspacePlugin({
    allow: [
      ELEMENT_IMAGE,
      ELEMENT_MEDIA_EMBED,
    ],
  }),
  // createInlineVoidPlugin(),
];

const EnhancedLink = React.forwardRef(({ ...props }: StyledElementProps<LinkNodeData>, ref): JSX.Element => {
  const editor = useElementsEditor();
  const isSelected = isElementTypeActive(ELEMENT_LINK)(editor);

  return (
    <Tooltip
      arrow
      open={isSelected}
      placement="top"
      ref={ref}
      title={props.element.url}
    >
      <span className="popover-anchor">
        {React.createElement(LinkElement, props)}
      </span>
    </Tooltip>
  );
});

const getComponents = () => {
  let components = createPlateComponents({
    [ELEMENT_LINK]: withProps(EnhancedLink, {}),
    [ELEMENT_OL]: withProps(StyledElement, {
      as: 'ol',
      styles: {
        root: {
          listStyleType: 'decimal',
          marginLeft: '2em',
        },
      },
    }),
    [ELEMENT_UL]: withProps(StyledElement, {
      as: 'ul',
      styles: {
        root: {
          listStyleType: 'disc',
          marginLeft: '2em',
        },
      },
    }),
    [MARK_BOLD]: withProps(StyledElement, {
      as: 'span',
      styles: {
        root: {
          fontWeight: 700,
        },
      },
    }),
    [MARK_ITALIC]: withProps(StyledElement, {
      as: 'span',
      styles: {
        root: {
          fontStyle: 'italic',
        },
      },
    }),
  });
  components = withPlaceholders(components, placeholderConfiguration);
  components = withDraggables(components, draggableConfiguration);

  return components;
};

const ElementsEditorWrapper = ({
  onChange,
}: ElementsEditorWrapperProps): JSX.Element => {
  const classes = useStyles();

  const [
    plugins,
    components,
  ] = React.useMemo(() => [
    pluginsBasic(),
    getComponents(),
  ], []);

  const [value, setValue] = useStoredState<Node[]>(
    'elements.document',
    emptyDocument(),
    localStorage,
    (it) => it ? JSON.parse(it) : emptyDocument(),
    JSON.stringify,
  );

  const changeHandler = React.useCallback((nodes: Node[]) => {
    setValue(nodes);

    if (onChange) {
      onChange('');
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <DndProvider backend={HTML5Backend}>
        <Plate
          components={components}
          initialValue={value}
          plugins={plugins}
          onChange={changeHandler}
        >
          <Toolbar />
        </Plate>
      </DndProvider>
    </div>
  );

  // const defaultPlugins = useMemo(() => {
  //   const options  = mergeAndCompare(
  //     concatStrings(' '),
  //     defaultPluginsOptions,
  //     {
  //       italic: {
  //         italic: rootPropsClassName(classes.slateItalic),
  //       },
  //       list: {
  //         ol: rootPropsClassName(classes.slateOrderedList),
  //         ul: rootPropsClassName(classes.slateUnorderedList),
  //       },
  //     },
  //   ) as DefaultCommandPluginsOptions;
  //
  //   options.bold.bold.buttonTitle = intl.formatMessage(elementsMessages.boldButton);
  //   options.codeBlock.code_block.buttonTitle = intl.formatMessage(elementsMessages.codeBlockButton);
  //   options.heading.h1.buttonTitle = intl.formatMessage(elementsMessages.heading1Button);
  //   options.heading.h2.buttonTitle = intl.formatMessage(elementsMessages.heading2Button);
  //   options.heading.h3.buttonTitle = intl.formatMessage(elementsMessages.heading3Button);
  //   options.image.img.buttonTitle = intl.formatMessage(elementsMessages.imageButton);
  //   options.image.img.dialogButtonCancel = intl.formatMessage(elementsMessages.inputDialogCancelButton);
  //   options.image.img.dialogButtonOK = intl.formatMessage(elementsMessages.inputDialogOKButton);
  //   options.image.img.dialogText = intl.formatMessage(elementsMessages.imageDialogText);
  //   options.image.img.dialogTitle = intl.formatMessage(elementsMessages.imageDialogTitle);
  //   options.italic.italic.buttonTitle = intl.formatMessage(elementsMessages.italicButton);
  //   options.link.link.buttonTitle = intl.formatMessage(elementsMessages.linkButton);
  //   options.link.link.dialogButtonCancel = intl.formatMessage(elementsMessages.inputDialogCancelButton);
  //   options.link.link.dialogButtonOK = intl.formatMessage(elementsMessages.inputDialogOKButton);
  //   options.link.link.dialogText = intl.formatMessage(elementsMessages.linkDialogText);
  //   options.link.link.dialogTitle = intl.formatMessage(elementsMessages.linkDialogTitle);
  //   options.list.ol.buttonTitle = intl.formatMessage(elementsMessages.orderedListButton);
  //   options.list.ul.buttonTitle = intl.formatMessage(elementsMessages.unorderedListButton);
  //   options.underline.underline.buttonTitle = intl.formatMessage(elementsMessages.underlineButton);
  //
  //   return getDefaultPlugins(options);
  // }, [classes]);
  //
  // return (
  //   <div className={classes.wrapper}>
  //     <ElementsEditor
  //       className={classes.slateEditor}
  //       placeholder={placeholder}
  //       plugins={defaultPlugins}
  //       toolbarClassName={classes.slateToolbar}
  //       value={value!}
  //       onBlur={changeHandler}
  //       onChange={changeHandler}
  //     />
  //   </div>
  // );
};

export default ElementsEditorWrapper;
