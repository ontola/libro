// @flow
import './detail.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
};

function Detail({ text, icon, url, imageUrl, className, date }) {
  let Element = url ? 'a' : 'div';
  const image = imageUrl
    ? <img src={imageUrl} className='detail__icon' role="presentation" />
    : <span className={`detail__icon fa fa-${icon}`} />;

  return (
    <Element href={url} className={`detail ${className}`}>
      {image}
      <span className="detail__text">{text}</span>
    </Element>
  );
}

Detail.propTypes = propTypes;

export default Detail;
