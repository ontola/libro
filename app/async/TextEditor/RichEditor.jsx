import { makeStyles } from '@material-ui/core';
import { Resource } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  Slate,
  withReact,
} from 'slate-react';

import editor from '../../ontology/ontola/editor';

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

// const useEditorPlugins = () => {
//   const lrs = useLRS();
//   const [pluginResource] = useResourceProperty(editor.localSettings, editor.enabledPlugins);
//   const enabledPlugins = seqToArray(lrs.store, pluginResource);
//   const enabledMap = Object.keys(mapping)
//     .filter((key) => enabledPlugins.includes(rdf.termFromNQ(key)))
//     .reduce(
//       (res, key) => {
//         res[key] = mapping[key];
//
//         return res;
//       },
//       {}
//     );
//   const plugins = Object.keys(enabledMap).map((key) => enabledMap[key][0]);
//
//   return [
//     enabledMap,
//     plugins,
//   ];
// };

const DefaultElement = (props) => {
  const ElemType = props.elementType || 'p';

  return <ElemType {...props.attributes}>{props.children}</ElemType>;
};

const InlineResource = ({ attributes, children }) => {
  if (!attributes.label) {
    return <p>No resource selected</p>;
  }

  return <Resource label={attributes.label}>{children}</Resource>;
};

const renderElement = (props) => {
  switch (props.element.type) {
    case editor.elements.Link:
      return <DefaultElement {...props} elementType="a" />;
    case editor.elements.Resource:
      return <InlineResource {...props} />;
    case editor.elements.Paragraph:
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

const RichEditor = ({
  plainValue,
}) => {
  const styles = useStyles();
  const editable = React.useRef();
  // const [enabledMap, plugins] = useEditorPlugins();
  const textEditor = React.useMemo(() => withHistory(withReact(createEditor())), []);
  console.log(textEditor);
  const [editorValue, setEditorValue] = React.useState([
    {
      children: [{ text: plainValue || 'Test' }],
      type: editor.elements.Paragraph,
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
        />
      </Slate>
    </div>
  );
};

RichEditor.propTypes = propTypes;

export default RichEditor;
