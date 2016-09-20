// @flow
import './CompareVotesBar.scss';
import React, { PropTypes } from 'react';
import {
  Button,
  LabelValueBar,
  List,
  Tag,
} from 'components';
import CollapsibleContainer from 'containers/CollapsibleContainer';
import { Link } from 'react-router';
import { percentageToRedOrGreen } from 'helpers/color';

const propTypes = {
  label: PropTypes.string.isRequired,
  compareAllLink: PropTypes.string,
  mainPercentage: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      percentage: PropTypes.string.isRequired,
    })
  ),
};

const renderTag = (tag) =>
  <span
    title="Klik om alle voorstellen over dit thema te bekijken."
  >
    <Link to={tag.link}>
      <Tag
        right={
          <span
            style={{
              color: percentageToRedOrGreen(tag.percentage),
            }}
          >
            {tag.percentage}%
          </span>
          }
      >
        {tag.label}
      </Tag>
    </Link>
  </span>;

const CompareVotesBar = ({
  label,
  mainPercentage,
  tags,
}) => {
  const collapsibleChildren = () =>
    <div className="CompareVotesBar__collapsible-children">
      <List
        renderItem={renderTag}
        items={tags}
      />
    </div>;

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
