import { withLinkCtx, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const propTypes = {
  children: PropTypes.node,
  subject: subjectType,
};

/**
 * Sets an RDFa resource tag using Link.
 */
class Resource extends PureComponent {
  render() {
    const { subject } = this.props;

    return (
      <div resource={subject.value}>
        {this.props.children}
      </div>
    );
  }
}

Resource.propTypes = propTypes;

export default withLinkCtx(Resource);
