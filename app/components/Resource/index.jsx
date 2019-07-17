import { subjectType, withLinkCtx } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/**
 * Sets an RDFa resource tag using Link.
 */
class Resource extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    element: PropTypes.string,
    subject: subjectType,
    wrapperProps: PropTypes.shape(),
  };

  static defaultProps = {
    wrapperProps: {},
  };

  render() {
    const {
      element: Element = 'div',
      subject,
      wrapperProps,
    } = this.props;

    return (
      <Element
        resource={subject.value}
        {...wrapperProps}
      >
        {this.props.children}
      </Element>
    );
  }
}

export default withLinkCtx(Resource);
