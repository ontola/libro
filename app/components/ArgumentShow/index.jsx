// @flow
import './argumentshow.scss';
import React, { PropTypes } from 'react';
import {
  Box,
  Button,
  Detail,
  DetailProfile,
  DetailsBar,
  Heading,
} from '../';

import PersonContainer from '../../containers/PersonContainer';

const propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    side: PropTypes.oneOf([
      'pro',
      'con',
    ]),
  }),
};

const defaultProps = {
  data: {
    title: 'Loading...',
    text: '...',
  },
};

const renderItem = (user, url) => (
  <DetailProfile
    name={user.name}
    imageUrl={user.image}
    url={url}
  />
);

const ArgumentShow = ({ data }) => (
  <Box>
    <Heading size="3" variant={data.side}>{data.title}</Heading>
    <DetailsBar>
      {data.creator && <PersonContainer user={data.creator} renderItem={renderItem} />}
      <Detail text="3 minuten geleden" icon="clock-o" />
    </DetailsBar>
    <div>{data.content}</div>

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
