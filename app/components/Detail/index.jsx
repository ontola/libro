import './Detail.scss';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
};

const Detail = ({
  text,
  icon,
  url,
  imageUrl,
  className,
  title,
}) => {
  const Element = url ? 'a' : 'div';
  const classNames = [
    'Detail',
    url && 'Detail--link',
    className,
  ].join(' ');

  return (
    <Element
      onClick={(e) => {
        e.preventDefault();
        if (url) browserHistory.push(url);
      }}
      href={url}
      className={classNames}
      title={title}
    >
      {imageUrl &&
        <img src={imageUrl} className="Detail__image" role="presentation" />
      }

      {!imageUrl && icon &&
        <span className="Detail__icon">
          <FontAwesome name={icon} />
        </span>
      }

      {text &&
        <span className="Detail__text">{text}</span>
      }
    </Element>
  );
};

Detail.propTypes = propTypes;

export default Detail;
