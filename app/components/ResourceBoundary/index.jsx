import { subjectType, useLinkRenderContext } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Sets an RDFa resource tag using the subject from the context.
 */
const ResourceBoundary = ({
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

ResourceBoundary.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string,
  subject: subjectType,
  wrapperProps: PropTypes.shape(),
};

ResourceBoundary.defaultProps = {
  wrapperProps: {},
};

export default ResourceBoundary;
