/* eslint react/no-danger: 0 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import {
  Card,
  CardContent,
  Detail,
  DetailDate,
  DetailsBar,
  Heading,
} from 'components';
import VoteMatchAddContainer from 'containers/VoteMatchAddContainer';
import path from 'helpers/paths';

const propTypes = {
  children: PropTypes.node.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.node.isRequired,
  submitters: PropTypes.string.isRequired,
};

const SearchResultItem = ({
  children,
  createdAt,
  id,
  name,
  submitters,
}) => (
  <Card>
    <CardContent>
      <Heading size="3">
        <Link to={path.od(id)}>
          <div dangerouslySetInnerHTML={{ __html: name }} />
        </Link>
      </Heading>
      <DetailsBar>
        <Detail text={submitters} />
        <DetailDate createdAt={createdAt} />
        <VoteMatchAddContainer id={id} />
      </DetailsBar>
      <div dangerouslySetInnerHTML={{ __html: children }} />
    </CardContent>
  </Card>
);

SearchResultItem.propTypes = propTypes;

export default SearchResultItem;
