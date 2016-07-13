// @flow
import './profilecard.scss';
import React, { PropTypes } from 'react';
import { Button, Heading } from '../';
import classNames from 'classnames';

const propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  full: PropTypes.bool,
};

const defaultProps = {
  data: {
    attributes: {
      name: '',
      party: '',
      image: '',
      biography: '',
    },
  },
  loading: false,
  full: false,
};

const ProfileCard = ({ data, loading, full }) => {
  const {
    name,
    party,
    image,
    biography,
  } = data.attributes;

  const profileClassname = classNames({
    ProfileCard,
    'ProfileCard--loading': loading,
    'ProfileCard--full': full,
    'ProfileCard--small': !full,
  });

  return (
    <section className={profileClassname}>
      <div className="ProfileCard__container">

        <div className="ProfileCard__head">
          <div className="ProfileCard__title">
            <Heading>{name}</Heading>
            <div className="ProfileCard__party">Nederland · {party}</div>
          </div>
          <div className="ProfileCard__image" style={{ backgroundImage: `url(${image})` }} />
        </div>

        <div className="ProfileCard__main">
          <p className="ProfileCard__bio">{biography}</p>
        </div>

        <div className="ProfileCard__foot">

          <div className="ProfileCard__stats">
            <div className="ProfileCard__stat">
              Ideeen
              <span className="ProfileCard__statValue">124</span>
            </div>
            <div className="ProfileCard__stat">
              Opinies
              <span className="ProfileCard__statValue">543</span>
            </div>
          </div>

          <div className="ProfileCard__buttons">
            <Button weight icon="tachometer">Vergelijk</Button>
          </div>

        </div>
      </div>
    </section>
  );
};

ProfileCard.propTypes = propTypes;
ProfileCard.defaultProps = defaultProps;

export default ProfileCard;
