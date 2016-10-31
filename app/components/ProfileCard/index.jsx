import './ProfileCard.scss';
import React, { PropTypes } from 'react';
import assert from 'assert';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import { PropertyBase } from 'link-redux';

import {
  Button,
  Heading,
} from 'components';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  party: PropTypes.string,
  image: PropTypes.string,
  bio: PropTypes.string,
  loading: PropTypes.bool,
  full: PropTypes.bool,
  similarity: PropTypes.number,
};

const defaultProps = {
  loading: false,
  full: false,
};

class ProfileCard extends PropertyBase {
  getLegacyProperty(ldprop, prop) {
    assert(ldprop, 'ldprop is required');
    return this.getLinkedObjectProperty(ldprop) || this.props[prop];
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
    const bio = this.getLegacyProperty('http://schema.org/description', 'bio');

    const profileClassname = classNames({
      ProfileCard,
      'ProfileCard--loading': loading,
      'ProfileCard--full': full,
      'ProfileCard--small': !full,
    });

    return (
      <section className={profileClassname}>
        <div className="ProfileCard__head">
          <div className="ProfileCard__title">
            <Heading>{this.getLegacyProperty('http://schema.org/name', 'name')}</Heading>
            {party && <div className="ProfileCard__party">{party}</div>}
          </div>
          {image &&
          <div
            className="ProfileCard__image"
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
          }
        </div>

        {bio && <p className="ProfileCard__bio">{bio}</p>}

        <div className="ProfileCard__foot">
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
                onClick={(e) => {
                  e.preventDefault();
                  browserHistory.push(`/comparevotes/${id}`);
                }}
                small
                icon="tachometer"
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
              onClick={(e) => {
                e.preventDefault();
                browserHistory.push(`/comparevotes/${id}`);
              }}
              small
              icon="tachometer"
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
