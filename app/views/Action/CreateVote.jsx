import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkedPropType,
  LinkedResourceContainer,
  PropertyBase,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { allTopologies, NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  count: linkedPropType,
  /**
   * The vote cast by the user if present.
   *
   * This property is not available for arguments since they render hydra:operation, which doesn't
   * has this property in it's API.
   */
  currentVote: linkedPropType,
  subject: subjectType,
  target: linkedPropType,
  variant: PropTypes.string,
};

/**
 * Renders the vote actions
 *
 * Currently includes alternative behaviour to override the color and state for argument votes since
 * those aren't based on the vote but rather on the argument (see {propTypes}).
 */
class CreateVote extends PropertyBase {
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

    return (
      <LinkedResourceContainer
        active={this.isCurrent()}
        count={count}
        grow={this.props.current !== undefined}
        subject={target}
        theme="transparant"
        variant={this.variant()}
        onClick={handleClick}
      />
    );
  }
}
CreateVote.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link({
    object: NS.schema('object'),
    target: NS.schema('target'),
    type: { label: NS.rdf('type'), limit: Infinity },
  })(CreateVote),
  [NS.argu('CreateVote'), NS.argu('CreateVoteAction'), NS.argu('DestroyVoteAction')],
  RENDER_CLASS_NAME,
  allTopologies
);
