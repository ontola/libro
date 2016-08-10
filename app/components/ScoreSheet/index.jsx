import './ScoreSheet.scss';
import React, { PropTypes } from 'react';

import PersonContainer from '../../containers/PersonContainer';

import {
  Box,
  Heading,
  List,
} from '../';

const propTypes = {
};

const defaultProps = {
};

const renderPerson = (data) => {
  console.log(data);
  return (
    <div>{data.name}</div>
  );
};

const renderItem = (id) => {
  return (
    <PersonContainer
      key={id}
      user={id}
      renderItem={renderPerson}
    />
  );
};

const ScoreSheet = () => {
  const persons = ['45', '31', '35'];

  return (
    <div className="ScoreSheet">
      <Heading>Resultaat</Heading>
      <Box>
        <List items={persons} renderItem={renderItem} />
      </Box>
    </div>
  );
};

ScoreSheet.propTypes = propTypes;
ScoreSheet.defaultProps = defaultProps;

export default ScoreSheet;
