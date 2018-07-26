import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

import { NS } from '../../helpers/LinkedRenderStore';

import './Detail.scss';
import DetailText from './text';

const propTypes = {
  className: PropTypes.string,
  /** Since Detail uses flexbox, you need to place right floating Details
  *   detail at the very end of a DetailsBar. */
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  linkedImage: PropTypes.bool,
  text: PropTypes.string,
  /** HTML title attribute */
  title: PropTypes.string,
  url: PropTypes.string,
};

const defaultProps = {
  title: '',
};

class Detail extends PureComponent {
  getImage() {
    if (this.props.linkedImage === true) {
      return <Property data-test="Detail-linked-image" label={NS.schema('image')} />;
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
    const { url } = this.props;
    if (url) {
      return (e) => {
        e.preventDefault();
        if (url) browserHistory.push(url);
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
      text,
      title,
      url,
    } = this.props;
    const Element = url ? 'a' : 'div';

    return (
      <Element
        className={`Detail ${url ? 'Detail--link ' : ''}${floatRight ? 'Detail--float-right ' : ''} ${className || ''}`}
        data-test="Detail"
        href={url}
        title={title}
        onClick={this.getClickBinding()}
      >
        {this.getImage()}

        {!imageUrl && icon && !hideIcon && (
        <span className="Detail__icon" data-test="Detail-icon">
          <FontAwesome name={icon} />
        </span>
        )}
        <DetailText data-test="Detail-DetailText">
          {text}
        </DetailText>
      </Element>
    );
  }
}

Detail.defaultProps = defaultProps;
Detail.propTypes = propTypes;

export default Detail;
