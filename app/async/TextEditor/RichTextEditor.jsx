import React from 'react';
import { createEditor, Editor, Transforms } from 'slate'
import { Editable, Slate, withReact, useSlate, Editor } from 'slate-react';
import isHotkey from 'is-hotkey';
import FontAwesome from 'react-fontawesome';
import { makeStyles } from '@material-ui/core';

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

const RTE = {
  ...Editor,

  isMarkActive = (editor, format) => {
    const currentMarks = Editor.marks(editor);
    return currentMarks ? currentMarks[format] === true : false;
  },
  
  toggleMark = (format) => (editor) => {
    if (isMarkActive(editor, format)) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
  },
  
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

const listTypes = ['ol','ul']; 

const toggleList = (editor, format) => {
  if (!format || !listTypes.includes(format)) return;

  if (isBlockActive(editor, format)) {
    Transforms.unwrapNodes(editor, { match: n => listTypes.includes(n.type), split: true });
    Transforms.setNodes(editor, { type: 'paragraph' });
  } else {
    Transforms.setNodes(editor, { type: 'li' });
    Transforms.wrapNodes(editor, { type: format, children: [] });
  }
};

const toggleBlock = (format) => (editor) => {
  if (!format) return;
  if (listTypes.includes(format)) {
    toggleList(editor, format);
  } else {
    Transforms.setNodes(editor, { type: isBlockActive(editor, format) ? 'paragraph' : format });  
  }
};

export const defaultElements = [
  {
    type: 'bold',
    action: RTE.toggleMark('bold'),
    buttonTitle: 'Bold',
    shortcut: 'mod+b',
    iconName: 'bold'
  },
  {
    type: 'italic',
    action: RTE.toggleMark('italic'),
    buttonTitle: 'Italic',
    shortcut: 'mod+i',
    iconName: 'italic'
  },
  {
    type: 'code',
    action: toggleBlock('code'),
    buttonTitle: 'Code',
    shortcut: 'ctrl+`',
    iconName: 'code'
  },
  {
    type: 'h1',
    action: toggleBlock('h1'),
    buttonTitle: 'h1'
  },
  {
    type: 'h2',
    action: toggleBlock('h2'),
    buttonTitle: 'h2'
  },
  {
    type: 'h3',
    action: toggleBlock('h3'),
    buttonTitle: 'h3'
  },
  {
    type: 'ol',
    action: toggleBlock('ol'),
    buttonTitle: 'ol',
    iconName: 'list-ol'
  },
  {
    type: 'ul',
    action: toggleBlock('ul'),
    buttonTitle: 'ul',
    iconName: 'list-ul'
  }
];

const RichTextEditor = (props) => {
  const editor = useSlate();
  const styles = useStyles();

  const DefaultElement = (props) => {
    const ElemType = props.elementType || 'p';
  
    return <ElemType {...props.attributes}>{props.children}</ElemType>;
  };
  
  const renderElement = (elements) => (props) => {
    const element = elements.find(e => e.type === props.element.type);
    if (element && element.component) {
      return React.createElement(element.component, props, props.children);
    }
    switch (props.element.type) {
      // case 'link':
      //   return <LinkElement {...props} elementType="a" />;
      // case 'resource':
      //   return <InlineResource {...props} />;
      case 'code':
        return <CodeElement {...props} />;
      case 'h1':
        return <DefaultElement {...props} elementType="h1" />;
      case 'h2':
        return <DefaultElement {...props} elementType="h2" />;
      case 'h3':
        return <DefaultElement {...props} elementType="h3" />;
      case 'h4':
        return <DefaultElement {...props} elementType="h4" />;
      case 'ol':
        return <DefaultElement {...props} elementType="ol" />;
      case 'ul':
        return <DefaultElement {...props} elementType="ul" />;
      case 'li':
        return <DefaultElement {...props} elementType="li" />;
      case 'inline':
        return <DefaultElement {...props} elementType="span" />
      case 'paragraph':
      default:
        return <DefaultElement {...props} elementType="p" />;
    }
  };
  
  const renderLeaf = React.useCallback(props => {
    return <Leaf {...props} />
  }, [])

  // const inputElements = props.elements || [];
  // let elements = props.default ? defaultElements.slice(0) : defaultElements.filter(defaultElement => inputElements.find(e => e.type === defaultElement.type));
  // elements = elements.map(element => {
  //   const inputElement = inputElements.find(e => e.type === element.type);
  //   return inputElement ? { ...element, ...inputElement} : element;
  // });

  // Merge default elements with input elements
  let elements = [];  
  const inputElements = props.elements || [];
  defaultElements.forEach((defaultElement) => {
    const inputElement = inputElements.find(e => e.type === defaultElement.type);
    const element = inputElement ? { ...defaultElement, ...inputElement} : props.default ? defaultElement : null;
    if (element) {
      elements.push(element);
    }
  });
  // Add input elements of a new type
  const newElements = inputElements.filter(inputElement => !elements.find(e => e.type === inputElement.type)) 
  elements.push(...newElements);
  // Filter disabled elements
  elements = elements.filter(e => !e.disabled);
  // Tmp
  console.log('RichEditor elements:', elements);

  if (props.action && editor.prevOntolaAction && props.action.id !== editor.prevOntolaAction.id) {
    let element = elements.find(e => e.type === props.action.action);
    if (element) {
      element.action(editor);
    }
    editor.prevOntolaAction = props.action;
  }

  return (  
    <div className={`Field__input Markdown ${styles.root} ${styles.borderCollapse}`}>
      <Toolbar editor={editor} elements={elements}/>
      <Editable 
        renderElement={React.useCallback(renderElement(elements), [])}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
            console.log(event.nativeEvent); 
            const element = elements.find((element) => element.shortcut && isHotkey(element.shortcut, event));
            if (element) {
              event.preventDefault();
              element.action(editor);
            }
        }}>
      </Editable>
    </div>
  )
};

const isEmpty = (s) => {
    return !s || s === null || s.match(/^\s*$/) !== null;
};

const Toolbar = (props) => {
  const { editor, elements } = props;

  return (
    <div>
      {elements.map((e) => (
          (!isEmpty(e.iconName) || !isEmpty(e.buttonTitle)) ?
          <button 
            onMouseDown={event => {
              event.preventDefault();
              e.action(editor);
            }}>
              {e.iconName ? <FontAwesome name={e.iconName}/> : e.buttonTitle}
          </button>
          : ''
      ))}
    </div>
  );
};

const CodeElement = props => {
  return (
      <pre {...props.attributes}>
          <code>{props.children}</code>
      </pre>
  )
}

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ 
          fontStyle: props.leaf.italic ? 'italic' : 'normal',
          fontWeight: props.leaf.bold ? 'bold' : 'normal', 
       }}
    >
      {props.children}
    </span>
  )
}

const Leaf1 = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
      children = <strong>{children}</strong>
  }

  if (leaf.code) {
      children = <code>{children}</code>
  }

  if (leaf.italic) {
      children = <em>{children}</em>
  }

  if (leaf.underline) {
      children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

export default RichTextEditor;