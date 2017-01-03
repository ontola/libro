import React, { PropTypes } from 'react';
import {
  CompareVotesBar,
} from 'components';

const propTypes = {
  comparedProfileName: PropTypes.string.isRequired,
  comparedProfilePositions: PropTypes.array.isRequired,
  motionIds: PropTypes.array.isRequired,
  userVotes: PropTypes.array.isRequired,
  score: PropTypes.number,
};

const ScoreSheet = ({
  comparedProfileName,
  comparedProfilePositions,
  motionIds,
  userVotes,
  score,
}) => (
  <CompareVotesBar
    label={comparedProfileName}
    mainPercentage={score}
  >
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
  </CompareVotesBar>
);

ScoreSheet.propTypes = propTypes;

export default ScoreSheet;
