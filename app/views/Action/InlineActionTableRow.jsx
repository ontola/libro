import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Resource,
  link,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { handle } from '../../helpers/logging';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const mapDataToProps = {
  actionStatus: schema.actionStatus,
  object: schema.object,
  target: schema.target,
};

class InlineActionTableRow extends React.PureComponent {
  static propTypes = {
    actionStatus: linkType,
    completed: PropTypes.string,
    lrs: lrsType,
    subject: subjectType,
    target: linkType,
  };

  render() {
    const {
      actionStatus,
      completed,
      lrs,
      subject,
      target,
    } = this.props;

    if (rdf.equals(actionStatus, ontola.DisabledActionStatus)) {
      return null;
    }
    if (rdf.equals(actionStatus, schema.CompletedActionStatus)) {
      return <span>{completed}</span>;
    }

    const handleClick = () => lrs
      .exec(subject)
      .catch((e) => {
        handle(e);
      });

    if (!target) {
      return null;
    }

    return (
      <Resource
        subject={target}
        onClick={handleClick}
      />
    );
  }
}

export default [
  LinkedRenderStore.registerRenderer(
    link(mapDataToProps)((props) => (
      <InlineActionTableRow
        completed={(
          <FormattedMessage
            defaultMessage="Primary e-mail address"
            id="https://app.argu.co/i18n/actions/MakePrimaryAction/defaultEmailLabel"
          />
        )}
        {...props}
      />
    )),
    argu.MakePrimaryAction,
    RENDER_CLASS_NAME,
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    link(mapDataToProps)((props) => (
      <InlineActionTableRow
        completed={(
          <FormattedMessage
            defaultMessage="Already confirmed"
            id="https://app.argu.co/i18n/actions/SendConfirmationAction/confirmedLabel"
          />
        )}
        {...props}
      />
    )),
    argu.SendConfirmationAction,
    RENDER_CLASS_NAME,
    allTopologies
  ),
  LinkedRenderStore.registerRenderer(
    link(mapDataToProps)((props) => <InlineActionTableRow {...props} />),
    [argu.ConfirmAction, argu.CopyAction, ontola.InlineAction],
    RENDER_CLASS_NAME,
    allTopologies
  ),
];
