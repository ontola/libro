import './ScoreSheet.scss';
import React, { PropTypes } from 'react';

import { Box, Heading } from 'components';

const propTypes = {
  comparedProfilePositions: PropTypes.array.isRequired,
  motionIds: PropTypes.array.isRequired,
  userVotes: PropTypes.array.isRequired,
  score: PropTypes.number,
};

const ScoreSheet = ({
  comparedProfilePositions,
  motionIds,
  userVotes,
  score,
}) => (
  <div className="ScoreSheet">
    <Heading>Resultaat {score}%</Heading>
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
          {motionIds.map((motion, i) => (
            <tr key={motion}>
              <td>{motion}</td>
              <td>{userVotes[i]}</td>
              <td>{comparedProfilePositions[i]}</td>
              <td>{userVotes[i] === comparedProfilePositions[i] ? 'Gelijk' : 'Anders'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  </div>
);

ScoreSheet.propTypes = propTypes;

export default ScoreSheet;
