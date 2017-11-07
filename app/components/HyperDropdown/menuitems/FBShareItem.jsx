/* globals FB */
import React, { Component, PropTypes } from 'react';

import image from '../image';

const propTypes = {
  count: PropTypes.number,
  done: PropTypes.func,
  shareUrl: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
};

class FBShareItem extends Component {
  handleClick(e) {
    if (typeof FB !== 'undefined') {
      e.preventDefault();
      FB.ui({
        method: 'share',
        href: this.props.shareUrl,
        caption: this.props.title,
      }, () => {
        this.props.done();
      });
    }
  }

  countInParentheses() {
    return this.props.count > 0 ? `(${this.props.count})` : '';
  }

  render() {
    return (
      <div className={`link ${this.props.type}`}>
        <a
          data-turbolinks="false"
          href={this.props.url}
          onClick={this.handleClick}
          rel="noopener noreferrer"
          target="_blank"
        >
          {image({ fa: 'fa-facebook' })}
          <span className="icon-left">Facebook {this.countInParentheses()}</span>
        </a>
      </div>
    );
  }
}

FBShareItem.propTypes = propTypes;

export default FBShareItem;
