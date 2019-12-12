import { subjectType, useLinkRenderContext } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Sets an RDFa resource tag using Link.
 */
const Resource = ({
  children,
  element: Element = 'div',
  wrapperProps,
}) => {
  const { subject } = useLinkRenderContext();

  return (
    <Element
      resource={subject.value}
      {...wrapperProps}
    >
      {children}
    </Element>
  );
};

Resource.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string,
  subject: subjectType,
  wrapperProps: PropTypes.shape(),
};

Resource.defaultProps = {
  wrapperProps: {},
};

export default Resource;
