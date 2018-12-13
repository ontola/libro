import {
  linkType,
  LinkedResourceContainer,
  PropertyBase,
  subjectType, register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { omniformOpenInline, omniformSetAction } from '../../state/omniform';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import { allTopologies } from '../../topologies';

const mapDispatchToProps = (dispatch, ownProps) => ({
  openOmniform: () => {
    const isPartOf = ownProps.lrs.getResourceProperty(ownProps.subjectCtx, NS.schema('isPartOf'));
    const createOpinion = ownProps.lrs.getResourceProperty(isPartOf, NS.argu('create_opinion'));
    const updateOpinion = ownProps.lrs.getResourceProperty(isPartOf, NS.argu('update_opinion'));
    return Promise.all([
      dispatch(omniformOpenInline(isPartOf)),
      dispatch(omniformSetAction({
        action: createOpinion,
        parentIRI: btoa(isPartOf),
      })),
      dispatch(omniformSetAction({
        action: updateOpinion,
        parentIRI: btoa(isPartOf),
      })),
    ]);
  },
});

/**
 * Renders the vote actions
 *
 * Currently includes alternative behaviour to override the color and state for argument votes since
 * those aren't based on the vote but rather on the argument (see {propTypes}).
 */
class CreateVote extends PropertyBase {
  static type = [
    NS.argu('Create::Vote'),
    NS.argu('CreateVoteAction'),
    NS.argu('DestroyVoteAction'),
  ];

  static topology = allTopologies;

  static hocs = [
    connect(null, mapDispatchToProps),
  ];

  static mapDataToProps = {
    actionStatus: NS.schema('actionStatus'),
    isPartOf: NS.schema('isPartOf'),
    object: NS.schema('object'),
    target: NS.schema('target'),
    type: { label: NS.rdf('type'), limit: Infinity },
  };

  static propTypes = {
    actionStatus: linkType,
    count: linkType,
    /**
     * The vote cast by the user if present.
     *
     * This property is not available for arguments since they render hydra:operation, which doesn't
     * has this property in it's API.
     */
    currentVote: linkType,
    name: linkType,
    subject: subjectType,
    target: linkType,
    variant: PropTypes.string,
  };

  shouldComponentUpdate() {
    return true;
  }

  isCurrent() {
    if (this.props.current !== undefined) {
      return this.props.current;
    }

    const currentVote = this
      .props
      .lrs
      .getResourceProperty(this.props.object, NS.argu('currentVote'));

    if (currentVote) {
      this.props.lrs.getEntity(currentVote);
      return true;
    }

    return false;
  }

  variant() {
    if (this.props.current !== undefined) {
      return this.props.variant;
    }

    const parentType = this
      .props
      .lrs
      .getResourceProperty(this.props.object, NS.rdf('type'));

    return parentType === NS.argu('ProArgument') ? 'yes' : 'no';
  }

  render() {
    const {
      actionStatus,
      count,
      lrs,
      subject,
      target,
    } = this.props;

    const handleClick = () => lrs
      .exec(subject)
      .then(this.props.openOmniform)
      .catch((e) => {
        handle(e);
      });

    if (!target) {
      return null;
    }

    const disabled = actionStatus === NS.argu('DisabledActionStatus');
    const expired = actionStatus === NS.argu('ExpiredActionStatus');
    let title;
    if (expired) {
      title = (
        <FormattedMessage
          defaultMessage="Voting no longer possible"
          id="https://app.argu.co/i18n/votes/expireable/states/closed/message"
        />
      );
    } else if (disabled) {
      title = (
        <FormattedMessage
          defaultMessage="Voting not possible"
          id="https://app.argu.co/i18n/votes/expireable/states/disabled/message"
        />
      );
    }

    return (
      <LinkedResourceContainer
        active={this.isCurrent()}
        count={count}
        disabled={disabled || expired}
        grow={this.props.current !== undefined}
        subject={target}
        theme="transparant"
        title={title}
        variant={this.variant()}
        onClick={handleClick}
      />
    );
  }
}

export default register(CreateVote);
