import './VoteData.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import path from 'helpers/paths';

import {
  DonutChart,
  CardContent,
  CardRow,
  LabelValueBar,
  Widget,
 } from 'components';

import CollapsibleContainer from 'containers/CollapsibleContainer';

const propTypes = {
  votes: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
};

const defaultProps = {
  votes: {},
};

const VoteData = ({
  result,
  votes,
}) => {
  const voteData = Object.keys(votes).map(option => ({
    name: option,
    value: votes[option].count,
  }));

  const renderTrigger = (option) => (
    <LabelValueBar
      label={option}
      value={votes[option].percentage}
      showBar
      isPercentage
    />
  );

  return (
    <div className="VoteData">
      <Widget title="Stemresultaten">
        <CardContent>
          <div>Resultaat stemronde: {result}</div>
          {votes.yes.count > 0 && <DonutChart data={voteData} />}
        </CardContent>

        {votes.yes.count > 0 && Object.keys(votes).map(option => (
          <CollapsibleContainer key={option} id={option} trigger={renderTrigger(option)}>
            {votes[option].votes.map(vote => (
              <Link key={vote} to={path.profile(vote)}>
                <CardRow>
                  <LabelValueBar label={vote} />
                </CardRow>
              </Link>
            ))}
          </CollapsibleContainer>
        ))}
      </Widget>
    </div>
  );
};

VoteData.propTypes = propTypes;
VoteData.defaultProps = defaultProps;

export default VoteData;
