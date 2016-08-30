import './ScoreSheet.scss';
import React, { PropTypes } from 'react';
import { Map } from 'immutable';

import {
  Box,
  Heading,
} from 'components';

const propTypes = {
  resultsPerMotion: PropTypes.object.isRequired,
  score: PropTypes.number,
};

const defaultProps = {
  resultsPerMotion: new Map(),
};

const ScoreSheet = ({
  resultsPerMotion,
  score,
}) => (
  <div className="ScoreSheet">
    <Heading>Resultaat</Heading>
    <Box>
      Percentage overeenkomst: {score}%
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
          {resultsPerMotion.valueSeq().map((motionId, i) => (
            <tr key={i}>
              <td>{motionId.get('motionId')}</td>
              <td>{motionId.get('userVote')}</td>
              <td>{motionId.get('compareResult')}</td>
              <td>
                {
                motionId.get('compareResult') === motionId.get('userVote')
                  ? 'gelijk'
                  : 'ongelijk'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  </div>
);

ScoreSheet.propTypes = propTypes;
ScoreSheet.defaultProps = defaultProps;

export default ScoreSheet;
