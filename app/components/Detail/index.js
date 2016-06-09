// @flow
import './detail.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  date: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

function Detail({ icon, text }) {
  return (
    <span className="detail">
      <span className={"detail--icon fa fa-" + icon }/>
      <span className="detail--text">{text}</span>
    </span>
  );
}

Detail.propTypes = propTypes

export default Detail;
