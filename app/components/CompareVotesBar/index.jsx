import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import CollapsibleContainer from '../../containers/CollapsibleContainer';
import { percentageToRedOrGreen } from '../../helpers/color';
import LabelValueBar from '../LabelValueBar';
import List from '../List';
import Tag from '../Tag';

import './CompareVotesBar.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })),
  totalValue: PropTypes.number.isRequired,
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
  if (Number.isNaN(score)) {
    score = 'Niet te bepalen';
    isPercentage = false;
  }

  const trigger = (
    <LabelValueBar
      coloredValue
      showBar
      isPercentage={isPercentage}
      label={label}
      value={score}
    />
  );

  return (
    <div className="CompareVotesBar">
      <CollapsibleContainer id={label} trigger={trigger}>
        {tags &&
        <div className="CompareVotesBar__collapsible-children">
          <List items={tags} renderItem={renderTag} />
        </div>
        }
        {children}
      </CollapsibleContainer>
    </div>
  );
};

CompareVotesBar.propTypes = propTypes;

export default CompareVotesBar;
