/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Card,
  CardContent,
  CardHeader,
  Detail,
  DetailDate,
  DetailType,
  DetailsBar,
  Heading,
} from 'components';
import VoteMatchAddContainer from 'containers/VoteMatchAddContainer';

const propTypes = {
  children: PropTypes.node.isRequired,
  classification: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  score: PropTypes.number.isRequired,
};

const SearchResultItem = ({
  children,
  classification,
  createdAt,
  link,
  title,
  score,
}) => {
  const threshold = 0.5;
  const TO_PERCENTAGE = 100;
  const scorePercentage = Math.ceil(score * TO_PERCENTAGE);
  const scoreIcon = score <= threshold ? 'star-half-o' : 'star';
  return (
    <Card>
      <CardHeader noSpacing>
        <Heading size="3">
          <Link to={link}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </Heading>
        <DetailsBar>
          <DetailType type={classification} />
          <DetailDate date={createdAt} />
          <Detail text={`${scorePercentage}% match`} icon={scoreIcon} />
          <VoteMatchAddContainer id={link} />
        </DetailsBar>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: children }} />
      </CardContent>
    </Card>
  );
};

SearchResultItem.propTypes = propTypes;

export default SearchResultItem;
