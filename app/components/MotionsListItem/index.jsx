// @flow
import './MotionsListItem.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Box,
  Detail,
  DetailsBar,
  Heading,
  VoteButtons,
  VoteData,
} from 'components';

import PersonContainer from 'containers/PersonContainer';

const propTypes = {
  motion: PropTypes.object.isRequired,
};

const renderItem = (user, url) => (
  <Detail
    text={user.name}
    imageUrl={user.image}
    url={url}
  />
);

const MotionsListItem = ({ motion }) => {
  const { id, title, votes, creator, createdAt } = motion;
  return (
    <Box>
      <div className="MotionsListItem">
        <Heading size="3">
          <Link
            to={`/motions/${id}`}
            children={title}
          />
        </Heading>
        <DetailsBar>
          {creator && <PersonContainer user={creator} renderItem={renderItem} />}
          <Detail text={createdAt} icon="clock-o" />
        </DetailsBar>
        <VoteData data={votes} />
      </div>
      <VoteButtons id={id} />
    </Box>
  );
};

MotionsListItem.propTypes = propTypes;

export default MotionsListItem;
