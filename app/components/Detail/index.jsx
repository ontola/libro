// @flow
import './detail.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  date: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

function Detail({ text, icon }) {
  return (
    <span className="detail">
      <span className={"detail__icon fa fa-" + icon} />
      <span className="detail__text">{text}</span>
    </span>
  );
}

Detail.propTypes = propTypes;

export default Detail;
