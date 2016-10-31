import './Detail.scss';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Property, PropertyBase } from 'link-redux';
import FontAwesome from 'react-fontawesome';

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  /** HTML title attribute */
  title: PropTypes.string,
  /** Since Detail uses flexbox, you need to place right floating Details
  *   detail at the very end of a DetailsBar. */
  floatRight: PropTypes.bool,
  hideIcon: PropTypes.bool,
};

class Detail extends PropertyBase {
  getText() {
    return this.getLinkedObjectProperty() ||
      <span className="Detail__text">{this.props.text}</span>;
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
        <Property label="schema:image" />

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

Detail.propTypes = propTypes;

export default Detail;
