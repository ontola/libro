import { makeStyles } from '@material-ui/core';
import { seqToArray } from '@rdfdev/collections';
import isHotkey from 'is-hotkey';
import {
  Resource,
  useLRS,
  useResourceLinks,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  Slate,
  withReact,
} from 'slate-react';

import ontola from '../../ontology/ontola';
import editor from '../../ontology/ontola/editor';
import { DefaultElement } from './elements/DefaultElement';
import { LinkElement } from './elements/LinkElement';

import Toolbar from './Toolbar';
import { log } from '../../helpers/logging';
import RTEditable from './RTEditable';

const propTypes = {
  // editorState: PropTypes.shape({
  //   getCurrentContent: PropTypes.func,
  // }).isRequired,
  // id: PropTypes.string.isRequired,
  // onBlur: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // onFocus: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  // onSaveEditorState: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

const InlineResource = ({ attributes, children }) => {
  if (!attributes.label) {
    return <p>No resource selected</p>;
  }

  return <Resource label={attributes.label}>{children}</Resource>;
};

const renderElement = (props) => {
  switch (props.element.type) {
    case editor.elements.link:
      return <LinkElement {...props} elementType="a" />;
    case editor.elements.resource:
      return <InlineResource {...props} />;
    case editor.elements.h1:
      return <DefaultElement {...props} elementType="h1" />;
    case editor.elements.h2:
      return <DefaultElement {...props} elementType="h2" />;
    case editor.elements.h3:
      return <DefaultElement {...props} elementType="h3" />;
    case editor.elements.h4:
      return <DefaultElement {...props} elementType="h4" />;
    case editor.elements.orderedList:
      return <DefaultElement {...props} elementType="ol" />;
    case editor.elements.unorderedList:
      return <DefaultElement {...props} elementType="ul" />;
    case editor.elements.listItem:
      return <DefaultElement {...props} elementType="li" />;
    case editor.elements.inline:
      return <DefaultElement {...props} elementType="span" />
    case editor.elements.paragraph:
    default:
      return <DefaultElement {...props} elementType="p" />;
  }
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
  noBorder: {
    border: 'none',
  },
  root: {
    padding: 0,
  },
  spacer: {
    borderLeft: '1px solid #dadce0',
    margin: theme.spacing(3, 1),
    userSelect: 'none',
  },
  toolbar: {
    color: 'rgba(0,0,0,.7)',
    display: 'inherit',
    padding: theme.spacing(0),
  },
}));

const propMap = {
  action: ontola.action,
  defaultCombination: editor.defaultCombination,
};
const useShortcuts = () => {
  const lrs = useLRS();
  const [shortcutList] = useResourceProperty(editor.localSettings, editor.shortcuts);
  if (!shortcutList) {
      return {};
  }
  const shortcuts = seqToArray(lrs.store, shortcutList);
  const shortcutData = useResourceLinks(shortcuts, propMap);

  return shortcutData.reduce(
    (acc, e) => ({
      ...acc,
      [e.defaultCombination.value]: e.action,
    }),
    {}
  );
};

const editorElements = [
  {
    type: 'paragraph'
  },
  {
    type: 'bold',
    buttonImage: '',
    buttonTooltip: 'Bold',
    shortcut: 'mod+b'
  },
  {
    type: 'h1',
    buttonImage: '',
    buttonTooltip: ''
  },
  {
    type: 'h3',
    enabled: false
  },
  {
    type: 'orderedList',
    buttonImage: '',
    buttonTooltip: 'Ordered list'
  }
];

const commandExtensions = [
  {
    name: 'toggleBold',
    ontolaAction: editor.actions.toggleMark.value,
    ontolaMark: editor.formatting.Bold.value,
  },
  {
    name: 'toggleItalic',
    ontolaAction: editor.actions.toggleMark.value,
    ontolaMark: editor.formatting.Italic.value,
  }
]

const RichEditor = ({
  plainValue,
}) => {
  const lrs = useLRS();
  const styles = useStyles();
  const editable = React.useRef();
  const textEditor = React.useMemo(() => withHistory(withReact(createEditor())), []);
  if (!textEditor.prevOntolaAction) {
    textEditor.prevOntolaAction = { action: "", id: -1 };
  } 
  if (!textEditor.ontolaAction) {
    textEditor.ontolaAction = { action: "", id: -1 };
  } 

  const shortcutMap = useShortcuts();

  const [editorValue, setEditorValue] = React.useState([
    {
      type: editor.elements.h1,
      children: [{ text: 'Rich Text Editor' }]
    },
    {
      type: editor.elements.h2,
      children: [{ text: 'Paragraph' }]
    },
    {
      type: editor.elements.paragraph,
      children: [{ text: 'Hello, world!' }]
    },
    {
      type: editor.elements.h2,
      children: [{ text: 'Lists' }]
    },
    {
      type: editor.elements.h3,
      children: [{ text: 'Ordered list' }]
    },
    {
      type: editor.elements.orderedList,
      children: [
        {
          type: editor.elements.listItem,
              children: [{text: 'item 1' }]
        },
        {
          type: editor.elements.listItem,
              children: [{ text: 'item 2' }]
        }
      ]
    },
    {
      type: editor.elements.h3,
      children: [{ text: 'Unordered list' }]
    },
    {
      type: editor.elements.unorderedList,
      children: [
        {
          type: editor.elements.listItem,
              children: [{text: 'item 1' }]
        },
        {
          type: editor.elements.listItem,
              children: [{ text: 'item 2' }]
        }
      ]
    },
    {
      type: editor.elements.h3,
      children: [{ text: 'Nested list' }]
    },
    {
      type: editor.elements.unorderedList,
      children: [
        {
          type: editor.elements.listItem,
              children: [
                {
                  type: editor.elements.inline,
                  children: [{ text: 'item 1'}]
                },
                {
                  type: editor.elements.unorderedList,
                  children: [
                    {
                      type: editor.elements.listItem,
                          children: [{text: 'item 1a' }]
                    },
                    {
                      type: editor.elements.listItem,
                          children: [{ text: 'item 1b' }]
                    }
                  ]
                } 
              ]
        },
        {
          type: editor.elements.listItem,
              children: [{ text: 'item 2' }]
        }
      ]
    }
  ]);

  const slateOnChange = (value) => {
    setEditorValue(value);
  };

  const renderLeaf = React.useCallback(
    (props) => {
      const { attributes, children, leaf } = props;

      return (
        <span
          {...attributes}
          style={{
            fontStyle: leaf[editor.formatting.Italic] ? 'italic' : 'normal',
            fontWeight: leaf[editor.formatting.Bold] ? 'bold' : 'normal',
            textDecoration: leaf[editor.formatting.Underline] ? 'underline' : 'initial',
          }}
        >
          {children}
        </span>
      );
    },
    []
  );

  return (
    <div className={`Field__input Markdown ${styles.root} ${styles.borderCollapse}`}>
      {/* <Slate
        editor={textEditor}
        value={editorValue}
        onChange={(v) => setEditorValue(v)}
      >
        <Toolbar />
        <Editable
          className={styles.content}
          ref={editable}
          renderElement={React.useCallback(renderElement, [])}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
              log('RichEditor: modifier key', event.nativeEvent, 'shortcutMap:', shortcutMap);
            }
            if (event.shiftKey && event.key === "Enter") {
                event.preventDefault();
                textEditor.insertFragment(<br/>);
            }
            const hotkey = Object.keys(shortcutMap).find((key) => isHotkey(key, event));
            if (hotkey) {
                log(`RichEditor: hotkey ${hotkey} found`);
                log(editorValue);
                event.preventDefault();
                lrs.exec(shortcutMap[hotkey], { textEditor });
            }
          }}
        />
      </Slate> */}
      <Slate
        editor={textEditor}
        value={editorValue}
        onChange={slateOnChange}
      >
        <Toolbar />
        <RTEditable commands={commandExtensions}/>
        {/* <RichTextEditor default={true} action={textEditor.ontolaAction}/> */}
      </Slate>
    </div>
  );
};

RichEditor.propTypes = propTypes;

export default RichEditor;
