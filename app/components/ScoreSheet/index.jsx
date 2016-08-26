import './ScoreSheet.scss';
import React, { PropTypes } from 'react';

import {
  Box,
  Heading,
} from '../';

const propTypes = {
  motions: PropTypes.object,
  results: PropTypes.object,
  compareWith: PropTypes.object,
};

const ScoreSheet = ({
  motions,
  results,
  compareWith,
}) => {
  const matchResults = motions.map((motionId, i) => (
    <tr key={i}>
      <td>{motionId}</td>
      <td>{results && results.get(i).vote}</td>
      <td>{compareWith && compareWith.get(i)}</td>
      <td>{results && results.get(i).vote === compareWith.get(i) ? 'Gelijk' : 'Ongelijk'}</td>
    </tr>
  ));

  return (
    <div className="ScoreSheet">
      <Heading>Resultaat</Heading>
      <Box>
        <table width="100%">
          <thead>
            <tr>
              <td>Motie</td>
              <td>Jouw stem</td>
              <td>Stem politicus</td>
              <td>Overeenkomst</td>
            </tr>
          </thead>
          <tbody>
            {matchResults}
          </tbody>
        </table>
      </Box>
    </div>
  );
};

ScoreSheet.propTypes = propTypes;

export default ScoreSheet;
