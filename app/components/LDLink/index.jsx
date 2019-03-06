import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import { subjectType, withLinkCtx } from 'link-redux';

import Link from '../Link';
import { retrievePath } from '../../helpers/iris';
import { handle } from '../../helpers/logging';

class LDLink extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    location: PropTypes.string,
    onClick: PropTypes.func,
    subject: subjectType,
    title: PropTypes.string,
    /** Overrides the url */
    to: PropTypes.objectOf(NamedNode),
  };

  render() {
    const {
      children,
      subject,
      to,
    } = this.props;

    if (!subject) {
      handle(new Error('LDLINK NO SUBJECT'));
      return '';
    }
    const href = retrievePath(to ? to.value : subject.value);

    return (
      <Link
        {...this.props}
        to={href}
      >
        {children}
      </Link>
    );
  }
}

export { default as LDLinkLabel } from '../Link/LinkLabel';

export default withLinkCtx(LDLink);
