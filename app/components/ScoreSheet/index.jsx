import './ScoreSheet.scss';
import React, { PropTypes } from 'react';

import {
  Box,
  Heading,
} from '../';

const propTypes = {
  results: PropTypes.object,
};

const ScoreSheet = ({ results }) => (
  <div className="ScoreSheet">
    <Heading>Resultaat</Heading>
    <Box>
      {results}
    </Box>
  </div>
);

ScoreSheet.propTypes = propTypes;

export default ScoreSheet;
