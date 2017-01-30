import classNames from 'classnames';
import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import './SideBarLink.scss';

import {
  CountBubble,
} from 'components';
import {
  closeSideBar,
} from 'state/sideBars/actions';

const propTypes = {
  bold: PropTypes.bool,
  count: PropTypes.number,
  label: PropTypes.string,
  imageUrl: PropTypes.string,
  icon: PropTypes.string,
  // True for links that are leveled higher than others
  isIndex: PropTypes.bool,
  closeBarOnClick: PropTypes.func,
  to: PropTypes.any,
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
        to={to}
        activeClassName="SideBarLink--active"
        onlyActiveOnIndex={isIndex}
        onClick={() => closeBarOnClick()}
      >
        {icon && <div className="SideBarLink__icon">
          <FontAwesome name={icon} />
        </div>}
        {imageUrl && <div className="SideBarLink__image-wrapper">
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
