import './ChronoFeed.scss';
import React, { PropTypes } from 'react';
import fuzzyFilterFactory from 'react-fuzzy-filter';
const { InputFilter, FilterResults } = fuzzyFilterFactory();
import SpeechContainer from 'containers/SpeechContainer';
import {
  List,
} from 'components';

const propTypes = {
  items: PropTypes.array,
};

function renderItem(id) {
  return (
    <SpeechContainer key={id} id={id} />
  );
}

const ChronoFeed = ({
  items,
}) => {
  const fuseConfig = {
    keys: ['children', 'speaker'],
  };

  return (
    <div className="ChronoFeed">
      <List
        renderItem={renderItem}
        items={items}
      />
    </div>
  );
};

ChronoFeed.propTypes = propTypes;

export default ChronoFeed;
