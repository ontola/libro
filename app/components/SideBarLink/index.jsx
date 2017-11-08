import classNames from 'classnames';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  closeSideBar,
} from 'state/sideBars/actions';

import CountBubble from '../CountBubble';

import './SideBarLink.scss';

const propTypes = {
  bold: PropTypes.bool,
  closeBarOnClick: PropTypes.func,
  count: PropTypes.number,
  icon: PropTypes.string,
  imageUrl: PropTypes.string,
  // True for links that are leveled higher than others
  isIndex: PropTypes.bool,
  label: PropTypes.string,
  to: PropTypes.string,
};

const SideBarLink = ({
  bold,
  count,
  label,
  icon,
  imageUrl,
  isIndex,
  closeBarOnClick,
  to,
}) => {
  const classes = classNames({
    SideBarLink: true,
    'SideBarLink--bold': bold,
  });

  return (
    <div className={classes}>
      <Link
        activeClassName="SideBarLink--active"
        onlyActiveOnIndex={isIndex}
        to={to}
        onClick={() => closeBarOnClick()}
      >
        {icon &&
        <div className="SideBarLink__icon">
          <FontAwesome name={icon} />
        </div>}
        {imageUrl &&
        <div className="SideBarLink__image-wrapper">
          <div
            className="SideBarLink__image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>}
        <div className="SideBarLink__label">
          {label}
        </div>
        {(count !== undefined && count > 0) &&
        <div className="SideBarLink__count-wrapper">
          <CountBubble count={count} />
        </div>}
      </Link>
    </div>
  );
};

SideBarLink.propTypes = propTypes;

// export default SideBarLink;

// The 'null' and 'pure:false': https://github.com/ReactTraining/react-router/issues/3536
export default connect(
  null,
  dispatch => ({
    closeBarOnClick: () => dispatch(closeSideBar('Navbar')),
  }),
  null,
  { pure: false }
)(SideBarLink);
