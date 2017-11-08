import { Property, PropertyBase, subjectType } from 'link-redux';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

import { NS } from '../../helpers/LinkedRenderStore';

import './Detail.scss';

const contextTypes = {
  subject: subjectType,
};
const propTypes = {
  className: PropTypes.string,
  /** Since Detail uses flexbox, you need to place right floating Details
  *   detail at the very end of a DetailsBar. */
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  subject: subjectType,
  text: PropTypes.string,
  /** HTML title attribute */
  title: PropTypes.string,
  url: PropTypes.string,
};

class Detail extends PropertyBase {
  getImage() {
    if (typeof this.context.subject !== 'undefined') {
      return <Property label={NS.schema('image')} />;
    }
    return this.props.imageUrl &&
      <img className="Detail__image" role="presentation" src={this.props.imageUrl} />;
  }

  getText() {
    const { label, text } = this.props;
    let displayText = text;
    if (typeof this.context.subject !== 'undefined' && label && this.getLinkedObjectProperty()) {
      displayText = this.getLinkedObjectProperty();
    }
    return <span className="Detail__text">{displayText}</span>;
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
