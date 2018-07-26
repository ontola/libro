import assert from 'assert';

import classNames from 'classnames';
import { PropertyBase, subjectType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { browserHistory } from 'react-router';

import Button from '../Button';
import Heading from '../Heading';
import { NS } from '../../helpers/LinkedRenderStore';

import './ProfileCard.scss';

export const propTypes = {
  bio: PropTypes.string,
  full: PropTypes.bool,
  id: PropTypes.string,
  image: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  party: PropTypes.string,
  similarity: PropTypes.number,
  subject: subjectType,
};

const defaultProps = {
  full: false,
  loading: false,
};

export class ProfileCard extends PropertyBase {
  getLegacyProperty(ldprop, prop) {
    assert(ldprop, 'ldprop is required');
    if (typeof this.props.subject === 'undefined') {
      return this.props[prop];
    }
    const lp = this.getLinkedObjectProperty(ldprop);
    return lp ? lp.value : this.props[prop];
  }

  render() {
    const {
      id,
      party,
      image,
      loading,
      full,
      similarity,
    } = this.props;
    const bio = this.getLegacyProperty([NS.schema('description'), NS.dbo('abstract')], 'bio');

    const profileClassname = classNames({
      ProfileCard,
      'ProfileCard--full': full,
      'ProfileCard--loading': loading,
      'ProfileCard--small': !full,
    });

    return (
      <section className={profileClassname} data-test="ProfileCard">
        <div className="ProfileCard__head" data-test="ProfileCard-head">
          <div className="ProfileCard__title">
            <Heading data-test="ProfileCard-head-name">
              {this.getLegacyProperty(NS.schema('name'), 'name')}
            </Heading>
            {party && (
              <div className="ProfileCard__party" data-test="ProfileCard-head-party">
                {party}
              </div>
            )}
          </div>
          {image && (
          <div
            className="ProfileCard__image"
            data-test="ProfileCard-head-image"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          )}
        </div>

        {bio && <p className="ProfileCard__bio" data-test="ProfileCard-bio">{bio}</p>}

        <div className="ProfileCard__foot" data-test="ProfileCard-footer">
          <div className="ProfileCard__stats">
            <div className="ProfileCard__stat">
              Ideeen
              <span className="ProfileCard__stat-value">124</span>
            </div>
            <div className="ProfileCard__stat">
              Opinies
              <span className="ProfileCard__stat-value">543</span>
            </div>
          </div>
          <div className="ProfileCard__buttons">
            {similarity ? (
              <div>VoteMatch: {similarity}%</div>
            ) : (
              <Button
                small
                icon="tachometer"
                onClick={(e) => {
                  e.preventDefault();
                  browserHistory.push(`/comparevotes/${id}`);
                }}
              >
                Vergelijk
              </Button>
            )}
          </div>
        </div>
        <div className="ProfileCard__buttons">
          {similarity ? (
            <div className="ProfileCard__similarity">VoteMatch: {similarity}%</div>
          ) : (
            <Button
              small
              icon="tachometer"
              onClick={(e) => {
                e.preventDefault();
                browserHistory.push(`/comparevotes/${id}`);
              }}
            >
              Vergelijk
            </Button>
          )}
        </div>
      </section>
    );
  }
}

ProfileCard.propTypes = propTypes;
ProfileCard.defaultProps = defaultProps;

export default ProfileCard;
