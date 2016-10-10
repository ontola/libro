import './ProfileCard.scss';
import React, { PropTypes } from 'react';
import { Button, Heading } from 'components';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
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

const ProfileCard = ({
  id,
  name,
  party,
  image,
  bio,
  loading,
  full,
  similarity,
}) => {
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
          <Heading>{name}</Heading>
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
              children="Vergelijk"
            />
          )}
        </div>
      </div>
    </section>
  );
};

ProfileCard.propTypes = propTypes;
ProfileCard.defaultProps = defaultProps;

export default ProfileCard;
