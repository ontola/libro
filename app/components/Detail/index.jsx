// @flow
import './detail.scss';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

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
  const image = imageUrl
    ? <img src={imageUrl} className="detail__icon" role="presentation" />
    : <span className={`detail__icon fa fa-${icon}`} />;

  return (
    <Element
      href={url}
      className={`detail ${className}`}
      title={title}
    >
      {image}
      <span className="detail__text">{text}</span>
    </Element>
  );
}

Detail.propTypes = propTypes;

export default Detail;
