// @flow
import './argumentshow.scss';
import React, { PropTypes } from 'react';
import {
  Box,
  Button,
  Detail,
  DetailsBar,
  Heading,
} from '../';

import PersonContainer from '../../containers/PersonContainer';

const propTypes = {
  content: PropTypes.string,
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
  side,
  title,
}) => (
  <Box>
    <Heading size="3" variant={side}>{title}</Heading>
    <DetailsBar>
      {creator && <PersonContainer user={creator} renderItem={renderItem} />}
      <Detail text="3 minuten geleden" icon="clock-o" />
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
