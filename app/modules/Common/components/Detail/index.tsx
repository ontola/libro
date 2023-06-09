import { Tooltip } from '@mui/material';
import { NamedNode } from '@ontologies/core';
import clsx from 'clsx';
import React, { MouseEventHandler, ReactNode } from 'react';
import { useNavigate } from 'react-router';

import fa4 from '../../../../ontology/fa4';
import { isDifferentWebsite, retrievePath } from '../../lib/iris';
import Image from '../Image';

import useStyles from './DetailStyles';
import DetailText from './DetailText';

export enum DetailVariant {
  Default = 'default',
  Error = 'error',
  Bold = 'bold',
  Success = 'success',
  Warning = 'warning',
}

export interface DetailProps {
  className?: string;
  /**
   * Since Detail uses flexbox, you need to place right floating Details
   * detail at the very end of a DetailsBar.
   */
  floatRight?: boolean;
  icon?: string;
  imageUrl?: NamedNode;
  onClick?: MouseEventHandler;
  smallMargin?: boolean;
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
  variant: DetailVariant.Default,
};

const Detail = ({
  className,
  floatRight,
  icon,
  imageUrl,
  onClick,
  smallMargin,
  spin,
  text,
  title,
  url,
  variant,
}: DetailProps): JSX.Element => {
  const styles = useStyles();
  const navigate = useNavigate();
  const handleExternalClick = React.useCallback<MouseEventHandler>((e) => {
    e.preventDefault();

    if (url) {
      navigate(retrievePath(url));
    }
  }, [url]);
  const handleClick = onClick || (url && !isDifferentWebsite(url) ? handleExternalClick : undefined);
  const Element = url ? 'a' : 'div';

  const detailClass = clsx({
    [styles.wrapper]: true,
    [styles.floatRight]: floatRight,
    [smallMargin ? styles.smallMargin : styles.defaultMargin]: true,
    [className || '']: className,
  });

  const image = icon ? fa4.ns(icon) : imageUrl;

  return (
    <Tooltip
      describeChild
      title={title ?? ''}
    >
      <Element
        className={detailClass}
        data-testid="Detail"
        href={url}
        target={url && isDifferentWebsite(url) ? '_blank' : undefined}
        onClick={handleClick}
      >
        {image && (
          <Image
            className={styles.image}
            linkedProp={image}
            spin={spin}
          />
        )}
        <DetailText
          data-test="Detail-DetailText"
          variant={variant}
        >
          {text}
        </DetailText>
      </Element>
    </Tooltip>
  );
};

Detail.defaultProps = defaultProps;

export default Detail;
