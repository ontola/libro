import {
  lrsType,
  register,
  subjectType,
  withLRS,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';

/**
 * Renders documents which don't have another type.
 *
 * These generally are resources without body or in error state.
 */
class DocumentPage extends React.PureComponent {
  static type = NS.link('Document');

  static topology = pageTopology;

  static hocs = [withLRS];

  static propTypes = {
    lrs: lrsType,
    subject: subjectType,
  };

  render() {
    const { lrs, subject } = this.props;
    const { lastResponseHeaders } = lrs.getStatus(subject);
    const action = lastResponseHeaders && lrs.getResourceProperty(lastResponseHeaders, NS.httph('exec-action'));

    if (action) {
      lrs.exec(action);
    }

    return null;
  }
}

export default [
  register(DocumentPage),
];
