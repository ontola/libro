import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { Property } from 'link-redux';
import React, { EventHandler, ReactNode } from 'react';
import FontAwesome from 'react-fontawesome';
import { useHistory } from 'react-router';

import { isDifferentWebsite } from '../../helpers/iris';

import './Detail.scss';
import DetailText from './text';

export enum DetailVariant {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

interface PropTypes {
  className?: string;
  /**
   * Since Detail uses flexbox, you need to place right floating Details
   * detail at the very end of a DetailsBar.
   */
  floatRight?: boolean;
  hideIcon?: boolean;
  icon?: string;
  imageUrl?: string;
  linkedImage?: boolean;
  onClick?: EventHandler<any>;
  spin?: boolean;
  text?: ReactNode;
  /** HTML title attribute */
  title?: string;
  url?: string;
  variant?: DetailVariant;
}

const defaultProps = {
  spin: false,
  title: '',
};

const Detail: React.FC<PropTypes> = ({
  className,
  floatRight,
  hideIcon,
  icon,
  linkedImage,
  imageUrl,
  onClick,
  spin,
  text,
  title,
  url,
  variant,
}) => {
  const history = useHistory();
  const handleExternalClick = React.useCallback((e) => {
    e.preventDefault();
    if (url) {
      history.push(url);
    }
  }, [url]);
  const handleClick = onClick || (url && !isDifferentWebsite(url) ? handleExternalClick : undefined);
  const Element = url ? 'a' : 'div';

  const detailClass = clsx({
    'Detail': true,
    'Detail--float-right': floatRight,
    'Detail--link': url,
    [`Detail--variant-${variant}`]: variant,
    [className || '']: className,
  });

  return (
    <Element
      className={detailClass}
      data-test="Detail"
      href={url}
      target={url && isDifferentWebsite(url) ? '_blank' : undefined}
      title={title}
      onClick={handleClick}
    >
      {linkedImage ? (
        <Property data-test="Detail-linked-image" label={schema.image} />
      ) : (
        imageUrl ? (
          <img
            alt={title}
            className="Detail__image"
            data-test="Detail-image"
            src={imageUrl}
          />
        ) : null
      )}
      {!imageUrl && icon && !hideIcon && (
        <span className="Detail__icon" data-test="Detail-icon">
          <FontAwesome name={icon} spin={spin} />
        </span>
      )}
      <DetailText data-test="Detail-DetailText">
        {text}
      </DetailText>
    </Element>
  );
};

Detail.defaultProps = defaultProps;

export default Detail;
