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
import { createEditor } from 'slate';
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
  const shortcuts = seqToArray(lrs.store, shortcutList);
  const shortcutData = useResourceLinks(shortcuts, propMap);

  return shortcutData.reduce(
    (acc, e) => ({
      ...acc,
      [e.defaultCombination]: e.action,
    }),
    {}
  );
};

const RichEditor = ({
  plainValue,
}) => {
  const lrs = useLRS();
  const styles = useStyles();
  const editable = React.useRef();
  const textEditor = React.useMemo(() => withHistory(withReact(createEditor())), []);
  const shortcutMap = useShortcuts();
  const [editorValue, setEditorValue] = React.useState([
    {
      children: [{ text: plainValue || 'Test 0' }],
      type: editor.elements.h1,
    },
    {
      children: [{ text: plainValue || 'Test 1' }],
      type: editor.elements.paragraph,
    },
    {
      children: [{ text: plainValue || 'Test 2' }],
      type: editor.elements.paragraph,
    },
    {
      children: [{ text: plainValue || 'Test 3' }],
      type: editor.elements.paragraph,
    },
    {
      children: [{ text: plainValue || 'Test 4' }],
      type: editor.elements.paragraph,
    },
  ]);

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
      <Slate
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
          onKeyUp={(event) => {
            for (const hotkey in shortcutMap) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                lrs.exec(shortcutMap[hotkey], { textEditor });
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

RichEditor.propTypes = propTypes;

export default RichEditor;
