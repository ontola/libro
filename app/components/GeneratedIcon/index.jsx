import toMaterialStyle from 'material-color-hash';
import './GeneratedIcon.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string.isRequired,
};

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
      style={{
        backgroundColor: backgroundColor(),
      }}
      className="GeneratedIcon"
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
