import { subjectType, useLinkRenderContext } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Sets an RDFa resource tag using the subject from the context.
 */
const ResourceBoundary = ({
  children,
  element: Element = 'div',
  subject,
  wrapperProps,
}) => {
  const { subject: subjectCtx } = useLinkRenderContext();

  return (
    <Element
      resource={(subject || subjectCtx).value}
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
