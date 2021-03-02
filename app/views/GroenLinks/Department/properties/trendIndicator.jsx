import {
  ReturnType,
  linkType,
  useProperty,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import teamGL from '../../../../ontology/teamGL';

const largeDelta = 0.1;
const smallDelta = 0.01;
const mapping = {
  [teamGL.activeVolunteersRatio]: teamGL.activeVolunteersRatioTrend,
  [teamGL.inactiveVolunteersRatio]: teamGL.inactiveVolunteersRatioTrend,
  [teamGL.totalFutureEventsCount]: teamGL.totalFutureEventsCountTrend,
  [teamGL.totalGroupsCount]: teamGL.totalGroupsCountTrend,
  [teamGL.totalNewVolunteersCount]: teamGL.totalNewVolunteersCountTrend,
  [teamGL.totalVolunteersCount]: teamGL.totalVolunteersCountTrend,
  [teamGL.veryActiveVolunteersRatio]: teamGL.veryActiveVolunteersRatioTrend,
};

const getIcon = (trend, value) => {
  if (!value || !trend) {
    return null;
  }

  if (value === 0) {
    if (trend > 0) {
      return 'angle-up';
    }

    return 'angle-down';
  }
  const delta = trend / value;

  if (delta < -largeDelta) {
    return 'angle-double-down';
  }
  if (delta < -smallDelta) {
    return 'angle-down';
  }
  if (delta > largeDelta) {
    return 'angle-double-up';
  }
  if (delta > smallDelta) {
    return 'angle-up';
  }

  return null;
};

const TrendIndicator = ({ property }) => {
  const value = useProperty(property, { returnType: ReturnType.Literal });
  const trend = useProperty(mapping[property], { returnType: ReturnType.Literal });
  const icon = getIcon(trend, value);
  if (!icon) {
    return null;
  }

  return (
    <FontAwesome
      ariaLabel={trend}
      name={icon}
    />
  );
};

TrendIndicator.propTypes = {
  property: linkType,
};

export default TrendIndicator;
