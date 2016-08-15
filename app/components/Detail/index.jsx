// @flow
import './detail.scss';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
};

function Detail({ text, icon, url, imageUrl, className, title }) {
  let Element = url ? 'a' : 'div';
  const pictogram = imageUrl
    ? <img src={imageUrl} className="Detail__icon" role="presentation" />
    : <span className={`Detail__icon fa fa-${icon}`} />;

  return (
    <Element
      onClick={(e) => {
        e.preventDefault();
        browserHistory.push(url);
      }}
      href={url}
      className={`Detail ${className}`}
      title={title}
    >
      {pictogram}
      <span className="Detail__text">{text}</span>
    </Element>
  );
}

Detail.propTypes = propTypes;

export default Detail;
