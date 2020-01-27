import {
  lrsType,
  register,
  subjectType,
  withLRS,
} from 'link-redux';
import React from 'react';

import httph from '../../ontology/httph';
import link from '../../ontology/link';
import { fullResourceTopology } from '../../topologies/FullResource';

/**
 * Renders documents which don't have another type.
 *
 * These generally are resources without body or in error state.
 */
class DocumentFull extends React.PureComponent {
  static type = link.Document;

  static topology = fullResourceTopology;

  static hocs = [withLRS];

  static propTypes = {
    lrs: lrsType,
    subject: subjectType,
  };

  render() {
    const { lrs, subject } = this.props;
    const { lastResponseHeaders } = lrs.getStatus(subject);
    const action = lastResponseHeaders && lrs.getResourceProperty(lastResponseHeaders, httph['exec-action']);

    if (action) {
      lrs.exec(action);
    }

    return null;
  }
}

export default [
  register(DocumentFull),
];
