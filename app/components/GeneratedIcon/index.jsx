import toMaterialStyle from 'material-color-hash';
import PropTypes from 'prop-types';
import React from 'react';

import './GeneratedIcon.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
};

/**
 * Creates a unique icon by using only a name. Currently, this needs to be wrapped in something
 * like an OpinionBubble or ProfilePicture to look decent.
 * @returns {component} Component
 */
const GeneratedIcon = ({
  name,
}) => {
  const shortName = () => {
    const numberOfLetters = 2;
    return name.substring(0, numberOfLetters);
  };

  const backgroundColor = () => toMaterialStyle(name).backgroundColor;

  return (
    <div
      className="GeneratedIcon"
      style={{
        backgroundColor: backgroundColor(),
      }}
    >
      <div
        className="GeneratedIcon__text"
      >
        {shortName()}
      </div>
    </div>
  );
};

GeneratedIcon.propTypes = propTypes;

export default GeneratedIcon;
