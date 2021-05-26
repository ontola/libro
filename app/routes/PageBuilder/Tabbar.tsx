import { Tab, Tabs } from '@material-ui/core';
import React from 'react';

import { builderContext, editorStateContext } from './builderContext';

export const Tabbar = (): JSX.Element => {
  const { files } = React.useContext(builderContext);
  const { file, setFile } = React.useContext(editorStateContext);

  return (
    <Tabs value={file} onChange={(_, value) => setFile(value)}>
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
