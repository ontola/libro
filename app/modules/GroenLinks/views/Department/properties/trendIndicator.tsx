import { NamedNode } from '@ontologies/core';
import { useNumbers } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import teamGL from '../../../ontology/teamGL';
import { isNumber } from '../../../../Common/lib/typeCheckers';

const largeDelta = 0.1;
const smallDelta = 0.01;
const mapping = {
  [teamGL.activeVolunteersRatio.value]: teamGL.activeVolunteersRatioTrend,
  [teamGL.inactiveVolunteersRatio.value]: teamGL.inactiveVolunteersRatioTrend,
  [teamGL.totalFutureEventsCount.value]: teamGL.totalFutureEventsCountTrend,
  [teamGL.totalGroupsCount.value]: teamGL.totalGroupsCountTrend,
  [teamGL.totalNewVolunteersCount.value]: teamGL.totalNewVolunteersCountTrend,
  [teamGL.totalVolunteersCount.value]: teamGL.totalVolunteersCountTrend,
  [teamGL.veryActiveVolunteersRatio.value]: teamGL.veryActiveVolunteersRatioTrend,
};

interface TrendIndicatorProps {
  property: NamedNode;
}

const getIcon = (trend: number, value: number) => {
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

const TrendIndicator = ({ property }: TrendIndicatorProps): JSX.Element | null => {
  const [value] = useNumbers(property);
  const [trend] = useNumbers(mapping[property.value]);

  if (!isNumber(trend) || !isNumber(value)) {
    return null;
  }

  const icon = getIcon(trend, value);

  if (!icon) {
    return null;
  }

  return (
    <FontAwesome
      ariaLabel={trend.toString()}
      name={icon}
    />
  );
};

export default TrendIndicator;
