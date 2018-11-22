import {
  linkType,
  LinkedResourceContainer,
  PropertyBase,
  subjectType, register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

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

  static mapDataToProps = {
    actionStatus: NS.schema('actionStatus'),
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
      subject,
      target,
    } = this.props;

    const handleClick = () => this
      .props
      .lrs
      .execActionByIRI(subject)
      .catch((e) => {
        throw e;
      });

    if (!target) {
      return null;
    }

    const disabled = actionStatus === NS.argu('DisabledActionStatus');
    const expired = actionStatus === NS.argu('ExpiredActionStatus');
    const title = (disabled || expired) && `Stemmen is niet ${expired ? 'langer ' : ''}mogelijk`;

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
