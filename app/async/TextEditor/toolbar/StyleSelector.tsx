import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

import { Select } from './Select';

export const StyleSelector = ({ item }) => {
  const textEditor = useSlate();
  // console.log('========================', item);
  const { selection } = textEditor;
  const currentNode = selection ? Editor.node(textEditor, selection, { depth: 1 })[0]?.type : undefined;

  return (
    <Select shIn={item.in} value={currentNode || item.current} />
  );
};
