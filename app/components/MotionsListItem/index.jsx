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
  createdAt: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  votes: PropTypes.string,
};

const renderItem = (user, url) => (
  <Detail
    text={user.name}
    imageUrl={user.image}
    url={url}
  />
);

const MotionsListItem = ({
  createdAt,
  creator,
  id,
  title,
  votes,
}) => (
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
    <VoteButtons
      id={id}
      onVote={() => {
        console.log(`Gestemd op ${title}`);
      }}
    />
  </Box>
);

MotionsListItem.propTypes = propTypes;

export default MotionsListItem;
