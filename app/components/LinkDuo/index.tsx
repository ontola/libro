import React, { Component } from 'react';

import { isDifferentWebsite } from '../../helpers/iris';
import Link, { LinkPropTypes } from '../Link';

/**
 * Link that also works for external URL's. Don't pass a href attribute.
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class LinkDuo extends Component<LinkPropTypes> {
  public render() {
    if (isDifferentWebsite(this.props.to)) {
      const {
        children,
        ...rest
      } = this.props;

      return (
        <a
          href={this.props.to}
          {...rest}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }

    return <Link {...this.props} />;
  }
}
