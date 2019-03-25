import { defaultNS } from 'link-lib';
import {
  link,
  LinkedResourceContainer,
  linkType,
  lrsType,
  Property,
  PropertyBase,
  subjectType,
  Type,
  withLRS,
} from 'link-redux';
import React from 'react';
import { injectIntl } from 'react-intl';

import { NS } from '../../helpers/LinkedRenderStore';
import { frontendIRI } from '../../middleware/app';
import LDLink from '../LDLink';

const propTypes = {
  contains: linkType,
  lastOrganization: linkType,
  lrs: lrsType,
  primaryContainerNode: subjectType,
  subject: subjectType,
};

class Contains extends PropertyBase {
  shouldComponentUpdate(nextProps) {
    return this.props.subject !== nextProps.subject
      || this.props.contains !== nextProps.contains
      || this.props.linkVersion !== nextProps.linkVersion
      || this.props.lastOrganization !== nextProps.lastOrganization;
  }

  render() {
    const {
      contains,
      lastOrganization,
      primaryContainerNode,
      reloadLinkedObject,
    } = this.props;

    if (contains && contains !== lastOrganization) {
      this.props.onOrganizationChange(contains);
    }

    return (
      <LinkedResourceContainer
        forceRender
        subject={frontendIRI}
      >
        <LDLink to={primaryContainerNode}>
          <Property label={NS.schema('name')} />
        </LDLink>
        <Type reloadLinkedObject={reloadLinkedObject} />
        <Property forceRender label={NS.argu('baseColor')} />
      </LinkedResourceContainer>
    );
  }
}

Contains.propTypes = propTypes;

export default link(
  [defaultNS.argu('contains'), defaultNS.argu('primaryContainerNode')],
  { forceRender: true }
)(injectIntl(withLRS(Contains)));
