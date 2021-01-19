import schema from '@ontologies/schema';
import clsx from 'clsx';
import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import FontAwesome from 'react-fontawesome';
import { withRouter } from 'react-router';

import { isDifferentWebsite } from '../../helpers/iris';

import './Detail.scss';
import DetailText from './text';

const propTypes = {
  className: PropTypes.string,
  /** Since Detail uses flexbox, you need to place right floating Details
  *   detail at the very end of a DetailsBar. */
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  linkedImage: PropTypes.bool,
  onClick: PropTypes.func,
  spin: PropTypes.bool,
  text: PropTypes.node,
  /** HTML title attribute */
  title: PropTypes.string,
  url: PropTypes.string,
  variant: PropTypes.oneOf([
    'success',
    'warning',
    'error',
  ]),
};

const defaultProps = {
  spin: false,
  title: '',
};

export class DetailComp extends PureComponent {
  getImage() {
    if (this.props.linkedImage === true) {
      return <Property data-test="Detail-linked-image" label={schema.image} />;
    }

    return this.props.imageUrl && (
      <img
        alt={this.props.title}
        className="Detail__image"
        data-test="Detail-image"
        src={this.props.imageUrl}
      />
    );
  }

  getClickBinding() {
    const { onClick, url } = this.props;
    if (onClick) {
      return onClick;
    }

    if (url && !isDifferentWebsite(url)) {
      return (e) => {
        e.preventDefault();
        if (url) this.props.history.push(url);
      };
    }

    return undefined;
  }

  render() {
    const {
      className,
      floatRight,
      hideIcon,
      icon,
      imageUrl,
      spin,
      text,
      title,
      url,
      variant,
    } = this.props;
    const Element = url ? 'a' : 'div';

    const detailClass = clsx({
      Detail: true,
      'Detail--float-right': floatRight,
      'Detail--link': url,
      [`Detail--variant-${variant}`]: variant,
      [className]: className,
    });

    return (
      <Element
        className={detailClass}
        data-test="Detail"
        href={url}
        target={url && isDifferentWebsite(url) ? '_blank' : null}
        title={title}
        onClick={this.getClickBinding()}
      >
        {this.getImage()}

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
  }
}

DetailComp.displayName = 'Detail';
DetailComp.defaultProps = defaultProps;
DetailComp.propTypes = propTypes;

export default withRouter(DetailComp);
