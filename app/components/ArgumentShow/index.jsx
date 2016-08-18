// @flow
import './ArgumentShow.scss';
import React, { PropTypes } from 'react';
import {
  Box,
  Button,
  Detail,
  DetailsBar,
  Heading,
} from 'components';

import PersonContainer from 'containers/PersonContainer';
import { formatDate } from 'helpers/date';

const propTypes = {
  content: PropTypes.string,
  createdAt: PropTypes.number,
  creator: PropTypes.string,
  side: PropTypes.oneOf([
    'pro',
    'con',
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  title: 'Loading...',
  text: '...',
};

const renderItem = (user, url) => (
  <Detail
    text={user.name}
    imageUrl={user.image}
    url={url}
  />
);

const ArgumentShow = ({
  content,
  creator,
  createdAt,
  side,
  title,
}) => (
  <Box>
    <Heading size="3" variant={side}>{title}</Heading>
    <DetailsBar>
      {creator && <PersonContainer user={creator} renderItem={renderItem} />}
      {createdAt && <Detail text={formatDate(createdAt)} icon="clock-o" />}
    </DetailsBar>
    <div>{content}</div>

    <div className="Box__actions">
      <Button
        icon="comment"
        children="Reageer"
        theme="box"
      />
      <Button
        icon="arrow-up"
        children="Upvote"
        theme="box"
      />
    </div>
  </Box>
);

ArgumentShow.propTypes = propTypes;
ArgumentShow.defaultProps = defaultProps;

export default ArgumentShow;
