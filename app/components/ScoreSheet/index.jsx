import React, { PropTypes } from 'react';

import Vote from 'models/Vote';

import Card from '../Card';
import Heading from '../Heading';

import './ScoreSheet.scss';

const propTypes = {
  comparedProfilePositions: PropTypes.arrayOf(Vote).isRequired,
  motionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  userVotes: PropTypes.arrayOf(Vote).isRequired,
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
    <Card>
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
    </Card>
  </div>
);

ScoreSheet.propTypes = propTypes;

export default ScoreSheet;
