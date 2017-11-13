import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

import './Detail.scss';

const propTypes = {
  className: PropTypes.string,
  /** Since Detail uses flexbox, you need to place right floating Details
  *   detail at the very end of a DetailsBar. */
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  /** HTML title attribute */
  title: PropTypes.string,
  url: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const DetailPure = ({
  className,
  floatRight,
  hideIcon,
  icon,
  imageUrl,
  text,
  title,
  url,
}) => {
  const Element = url ? 'a' : 'div';
  const classNames = [
    'Detail',
    url && 'Detail--link',
    floatRight && 'Detail--float-right',
    className,
  ].join(' ');
  return (
    <Element
      className={classNames}
      href={url}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        if (url) browserHistory.push(url);
      }}
    >
      {imageUrl &&
        <img alt={title} className="Detail__image" src={imageUrl} />
      }
      {!imageUrl && icon && !hideIcon &&
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

DetailPure.defaultProps = defaultProps;
DetailPure.propTypes = propTypes;

export default DetailPure;
