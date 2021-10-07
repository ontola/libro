import { Tab, Tabs } from '@material-ui/core';
import React from 'react';

import { studioContext } from '../lib/context/StudioContext';
import { editorStateContext } from '../lib/context/EditorStateContext';

export const Tabbar = (): JSX.Element => {
  const { files } = React.useContext(studioContext);
  const { file, setFile } = React.useContext(editorStateContext);

  return (
    <Tabs
      value={file}
      onChange={(_, value) => setFile(value)}
    >
      {files.map((f) => (
        <Tab
          key={f.name}
          label={f.name}
          value={f.name}
        />
      ))}
    </Tabs>
  );
};
