/* eslint react/no-find-dom-node: 0 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import image, { imageShape } from '../image';

export const propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    confirm: PropTypes.string,
    'display-setting': PropTypes.string,
    'filter-value': PropTypes.string,
    method: PropTypes.string,
    remote: PropTypes.string,
    'sort-value': PropTypes.string,
    turbolinks: PropTypes.string,
  }),
  divider: PropTypes.func,
  done: PropTypes.func,
  fa: PropTypes.string,
  image: imageShape,
  target: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
};

class LinkItem extends Component {
  handleMouseDown() {
    // Fixes an issue where firefox bubbles events instead of capturing them
    // See: https://github.com/facebook/react/issues/2011
    const dataMethod = ReactDOM.findDOMNode(this).getAttribute('data-method');
    if (dataMethod !== 'post' && dataMethod !== 'put' &&
      dataMethod !== 'patch' && dataMethod !== 'delete') {
      ReactDOM.findDOMNode(this).getElementsByTagName('a')[0].click();
      this.props.done();
    }
  }

  render() {
    const {
      className,
      data,
      fa,
      target,
      title,
      type,
      url,
    } = this.props;

    let divider;
    if (this.props.divider && this.props.divider === 'top') {
      divider = <div className="Dropdown__divider" />;
    }

    return (
      <div className={type}>
        {divider}
        <a
          className={className}
          data-confirm={data && data.confirm}
          data-display-setting={data && data['display-setting']}
          data-filter-value={data && data['filter-value']}
          data-method={data && data.method}
          data-remote={data && data.remote}
          data-sort-value={data && data['sort-value']}
          data-turbolinks={data && data.turbolinks}
          href={url}
          target={target}
          onMouseDownCapture={this.handleMouseDown}
        >
          {image(this.props)}
          <span className={(this.props.image || fa) ? 'icon-left' : ''}>
            {title}
          </span>
        </a>
      </div>
    );
  }
}

LinkItem.propTypes = propTypes;

export default LinkItem;
