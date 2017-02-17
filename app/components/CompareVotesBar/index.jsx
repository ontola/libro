// @flow
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  LabelValueBar,
  List,
  Tag,
} from 'components';
import CollapsibleContainer from 'containers/CollapsibleContainer';
import { percentageToRedOrGreen } from 'helpers/color';

import './CompareVotesBar.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })),
};

const suffix = percentage => (
  <span style={{ color: percentageToRedOrGreen(percentage) }}>{percentage}%</span>
);

const renderTag = tag => (
  <span key={tag.label} title="Klik om alle voorstellen over dit thema te bekijken.">
    <Link to={tag.link}>
      <Tag suffix={suffix(tag.percentage)}>{tag.label}</Tag>
    </Link>
  </span>
);

const CompareVotesBar = ({
  children,
  label,
  totalValue,
  tags,
}) => {
  let score = Math.round(totalValue * 100);
  let isPercentage = true;
  if (isNaN(score)) {
    score = 'Niet te bepalen';
    isPercentage = false;
  }

  const trigger = (
    <LabelValueBar
      label={label}
      isPercentage={isPercentage}
      value={score}
      coloredValue
      showBar
    />
  );

  return (
    <div className="CompareVotesBar">
      <CollapsibleContainer id={label} trigger={trigger}>
        {tags && <div className="CompareVotesBar__collapsible-children">
          <List renderItem={renderTag} items={tags} />
        </div>
        }
        {children}
      </CollapsibleContainer>
    </div>
  );
};

CompareVotesBar.propTypes = propTypes;

export default CompareVotesBar;
