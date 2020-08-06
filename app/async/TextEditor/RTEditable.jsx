import React, { useMemo, useState } from 'react';
import { Editor, Transforms } from 'slate';
import { Editable, useSlate } from 'slate-react';
import isHotkey from 'is-hotkey';
import FontAwesome from 'react-fontawesome';

export const RTEditor = {
  ...Editor,

  isBlockActive: (editor, format) => {
    const [match] = Editor.nodes(editor, { match: n => n.type === format })
    return !!match
  },

  toggleList: (editor, format) => {
    if (!format || !listTypes.includes(format)) return
  
    if (RTEditor.isBlockActive(editor, format)) {
      Transforms.unwrapNodes(editor, { match: n => listTypes.includes(n.type), split: true })
      Transforms.setNodes(editor, { type: 'paragraph' });
    } else {
      Transforms.setNodes(editor, { type: 'listItem' });
      Transforms.wrapNodes(editor, { type: format, children: [] });
    }
  },
  
  toggleBlock: (format) => (editor) => {
    if (!format) return;
    if (listTypes.includes(format)) {
      RTEditor.toggleList(editor, format);
    } else {
      Transforms.setNodes(editor, { type: RTEditor.isBlockActive(editor, format) ? 'paragraph' : format });  
    }
  },
  
  isMarkActive: (editor, format) => {
    const currentMarks = Editor.marks(editor);
    return currentMarks ? currentMarks[format] === true : false;
  },
  
  toggleMark: (format) => (editor) => {
    if (RTEditor.isMarkActive(editor, format)) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
  }
}

const listTypes = ['orderedList','unorderedList']; 

const HtmlElement = (element) => (props) => {
  const ElementType = element || 'p';
  return <ElementType {...props.attributes}>{props.children}</ElementType>;
};

const CodeElement = props => {
  return (
      <pre {...props.attributes}>
          <code>{props.children}</code>
      </pre>
  )
}

export const ElementTypes = [
  {
    type: 'bold'
  },
  {
    type: 'code',
    component: CodeElement
  },
  {
    type: 'heading1',
    component: HtmlElement('h1')
  },
  {
    type: 'heading2',
    component: HtmlElement('h2')
  },
  {
    type: 'heading3',
    component: HtmlElement('h3')
  },
  {
    type: 'inline',
    component: HtmlElement('span')
  },
  {
    type: 'italic'
  },
  {
    type: 'listItem',
    component: HtmlElement('li')
  },
  {
    type: 'orderedList',
    component: HtmlElement('ol')
  },
  {
    type: 'paragraph',
    component: HtmlElement('p')
  },
  {
    type: 'unorderedList',
    component: HtmlElement('ul')
  },
];

const renderElement = (elementTypes) => (props) => {
  const elementType = elementTypes.find(e => e.type === props.element.type)
  if (elementType && elementType.component) {
    return React.createElement(elementType.component, props, props.children)
  }
  return <p {...props.attributes}>{props.children}</p>
}

export const Commands = [
  {
    name: 'toggleBold',
    apply: RTEditor.toggleMark('bold'),
    buttonTitle: 'Bold',
    shortcut: 'mod+b',
    iconName: 'bold',
    buttonIndex: 10,
  },
  {
    name: 'toggleItalic',
    apply: RTEditor.toggleMark('italic'),
    buttonTitle: 'Italic',
    shortcut: 'mod+i',
    iconName: 'italic',
    buttonIndex: 20,
  },
  {
    name: 'toggleHeading1',
    apply: RTEditor.toggleBlock('heading1'),
    buttonTitle: 'Heading1',
    buttonIndex: 100,
  },
  {
    name: 'toggleHeading2',
    apply: RTEditor.toggleBlock('heading2'),
    buttonTitle: 'Heading2',
    buttonIndex: 110,
  },
  {
    name: 'toggleHeading3',
    apply: RTEditor.toggleBlock('heading3'),
    buttonTitle: 'Heading3',
    buttonIndex: 120,
  },
  {
    name: 'toggleOrderedList',
    apply: RTEditor.toggleBlock('orderedList'),
    buttonTitle: 'Ordered list',
    iconName: 'list-ol',
    buttonIndex: 200,
  },
  {
    name: 'toggleUnorderedList',
    apply: RTEditor.toggleBlock('unorderedList'),
    buttonTitle: 'Uonordered list',
    iconName: 'list-ul',
    buttonIndex: 210,
  },
  {
    name: 'toggleCode',
    apply: RTEditor.toggleBlock('code'),
    buttonTitle: 'Code',
    shortcut: 'ctrl+`',
    iconName: 'code',
    buttonIndex: 300,
  },
];

const compareCommands = (cmd1, cmd2) => {
  const ix1 = cmd1.buttonIndex || Number.MAX_SAFE_INTEGER
  const ix2 = cmd2.buttonIndex || Number.MAX_SAFE_INTEGER
  return (ix1 < ix2) ? -1 : (ix1 > ix2) ? 1 : 0
}

const isEmpty = (s) => {
  return !s || s === null || s.match(/^\s*$/) !== null;
};

const mergeExtensions = (objects, extensions, key, skipFunction = null, sortFunction = null) => {
  // TODO: merge doubles in objects or extensions
  let result = objects.map(object => {
    const extension = extensions.find(extension => extension[key] === object[key]) || {};
    return { ...object, ...extension};
  });
  const newObjects = extensions.filter(extension => !result.find(element => element[key] === extension[key])) 
  result.push(...newObjects);
  if (skipFunction) {
    result = result.filter(object => !skipFunction(object));
  }
  if (sortFunction) {
    result.sort(sortFunction);
  }
  return result;
}

const RTEditable = ({ elementTypes, commands }) => {
  const editor = useSlate()
  const mergedElementTypes = useMemo(() => mergeExtensions(ElementTypes, elementTypes || [], 'type', object => !!object.disabled ), [elementTypes])
  const mergedCommands = useMemo(() => mergeExtensions(Commands, commands || [], 'name', object => !!object.disabled, compareCommands), [commands])
  const buttons = useMemo(() => mergedCommands.filter(cmd => !isEmpty(cmd.iconName) || !isEmpty(cmd.buttonTitle)), [mergedCommands])
  editor.mergedCommands = mergedCommands
  
  return (
    <div>
      <Toolbar buttons={buttons}/>
      <Editable 
        renderElement={React.useCallback(renderElement(mergedElementTypes), [])}
        renderLeaf={React.useCallback(props => <Leaf {...props} />, [])}
        onKeyDown={event => {
            const command = mergedCommands.find(c => c.shortcut && isHotkey(c.shortcut, event));
            if (command) {
              event.preventDefault();
              command.apply(editor);
            }
        }}>
      </Editable>
    </div>
  )
}

const Toolbar = ({ buttons }) => {
  const editor = useSlate();
  return (
    <span>
     {buttons.map((button) => (
        <button 
          key={button.name}
          onMouseDown={event => {
            event.preventDefault();
            button.apply(editor);
          }}>
            {button.iconName ? <FontAwesome name={button.iconName}/> : button.buttonTitle}
        </button>
      ))}
    </span>
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

const AlternativeLeaf = ({ attributes, children, leaf }) => {
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

export default RTEditable;