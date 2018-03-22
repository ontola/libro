/* eslint react/no-danger: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import VoteMatchAddContainer from 'containers/VoteMatchAddContainer';
import path from 'helpers/paths';

import Card, { CardContent } from '../Card';
import Detail from '../Detail';
import DetailDate from '../DetailDate';
import DetailsBar from '../DetailsBar';
import Heading from '../Heading';

import './SearchResultItem.scss';

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
    <div className="SearchResultItem">
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
    </div>
  </Card>
);

SearchResultItem.propTypes = propTypes;

export default SearchResultItem;
