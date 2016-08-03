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
    ? <img src={imageUrl} className="detail__icon" role="presentation" />
    : <span className={`detail__icon fa fa-${icon}`} />;

  return (
    <Element
      onClick={(e) => {
        e.preventDefault();
        browserHistory.push(url);
      }}
      href={url}
      className={`detail ${className}`}
      title={title}
    >
      {pictogram}
      <span className="detail__text">{text}</span>
    </Element>
  );
}

Detail.propTypes = propTypes;

export default Detail;
