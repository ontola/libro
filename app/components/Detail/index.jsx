import './Detail.scss';
import { Property, PropertyBase } from 'link-redux';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';

import { NS } from '../../helpers/LinkedRenderStore';

const contextTypes = {
  subject: PropTypes.object,
};
const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  subject: PropTypes.object,
  /** HTML title attribute */
  title: PropTypes.string,
  /** Since Detail uses flexbox, you need to place right floating Details
  *   detail at the very end of a DetailsBar. */
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
};

class Detail extends PropertyBase {
  getImage() {
    if (typeof this.context.subject !== 'undefined') {
      return <Property label={NS.schema('image')} />;
    }
    return this.props.imageUrl &&
      <img src={this.props.imageUrl} className="Detail__image" role="presentation" />;
  }

  getText() {
    let text = this.props.text;
    if (typeof this.context.subject !== 'undefined' && this.props.label && this.getLinkedObjectProperty()) {
      text = this.getLinkedObjectProperty();
    }
    return <span className="Detail__text">{text}</span>;
  }

  getClickBinding() {
    const url = this.props.url;
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
      icon,
      url,
      imageUrl,
      hideIcon,
      className,
      title,
      floatRight,
    } = this.props;
    const Element = url ? 'a' : 'div';
    const classNames = [
      'Detail',
      url && 'Detail--link',
      floatRight && 'Detail--float-right',
      className,
    ].join(' ');

    return (
      <Element
        onClick={this.getClickBinding()}
        href={url}
        className={classNames}
        title={title}
      >
        {this.getImage()}

        {!imageUrl && icon && !hideIcon &&
        <span className="Detail__icon">
          <FontAwesome name={icon} />
        </span>
        }

        {this.getText()}
      </Element>
    );
  }
}

Detail.contextTypes = contextTypes;
Detail.propTypes = propTypes;

export default Detail;
