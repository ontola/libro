import './Detail.scss';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
const propTypes = {
  className: PropTypes.string,
  /** Since Detail uses flexbox, you need to place right floating Details
  *   detail at the very end of a DetailsBar. */
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  /** HTML title attribute */
  title: PropTypes.string,
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
DetailPure.propTypes = propTypes;

export default DetailPure;
