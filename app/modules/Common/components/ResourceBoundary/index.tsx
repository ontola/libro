import { SomeNode } from 'link-lib';
import { useLinkRenderContext } from 'link-redux';
import React, { ChildrenProp, ComponentType } from 'react';

interface PropTypes {
  element?: string | ComponentType;
  subject?: SomeNode;
  wrapperProps?: any;
}

/**
 * Sets an RDFa resource tag using the subject from the context.
 */
const ResourceBoundary: React.FC<PropTypes & ChildrenProp> = ({
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

ResourceBoundary.defaultProps = {
  wrapperProps: {},
};

export default ResourceBoundary;
