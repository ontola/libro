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
        <div className="ProfileCard__main">
          <div className="ProfileCard__content">
            <Heading>{name}</Heading>
            <div className="ProfileCard__party">Nederland · {party}</div>
            <p className="ProfileCard__bio">{biography}</p>
          </div>
          <div className="ProfileCard__image">
            <div style={{ backgroundImage: `url(${image})` }} />
          </div>
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
          <div>
            {full && <Button weight theme="subtle" icon="square-o">Volgen</Button>}
            {full && <Button weight theme="subtle" icon="envelope">Stuur bericht</Button>}
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
