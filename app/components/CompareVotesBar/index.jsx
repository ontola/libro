// @flow
import './CompareVotesBar.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  LabelValueBar,
  List,
  Tag,
} from 'components';

import CollapsibleContainer from 'containers/CollapsibleContainer';
import { percentageToRedOrGreen } from 'helpers/color';

const propTypes = {
  label: PropTypes.string.isRequired,
  compareAllLink: PropTypes.string,
  mainPercentage: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const suffix = (percentage) => (
  <span style={{ color: percentageToRedOrGreen(percentage) }}>{percentage}%</span>
);

const renderTag = (tag) => (
  <span key={tag.label} title="Klik om alle voorstellen over dit thema te bekijken.">
    <Link to={tag.link}>
      <Tag suffix={suffix(tag.percentage)}>{tag.label}</Tag>
    </Link>
  </span>
);

const CompareVotesBar = ({
  label,
  mainPercentage,
  tags,
}) => {
  const collapsibleChildren = () => (
    <div className="CompareVotesBar__collapsible-children">
      <List renderItem={renderTag} items={tags} />
    </div>
  );

  return (
    <div className="CompareVotesBar">
      <CollapsibleContainer
        id={label}
        trigger={
          <LabelValueBar
            label={label}
            value={mainPercentage}
            coloredValue
          />
        }
        children={collapsibleChildren()}
      />
    </div>
  );
};

CompareVotesBar.propTypes = propTypes;

export default CompareVotesBar;
