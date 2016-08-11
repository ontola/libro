import './ScoreSheet.scss';
import React from 'react';

import {
  Box,
  Heading,
  List,
} from '../';

const renderItem = (id) => (
  <div key={id}>{id}</div>
);

const ScoreSheet = () => {
  const persons = ['45', '31', '35'];

  return (
    <div className="ScoreSheet">
      <Heading>Resultaat</Heading>
      <Box>
        <List items={persons} renderItem={renderItem} />
      </Box>
    </div>
  );
};

export default ScoreSheet;
