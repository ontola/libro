import './opinion.scss';
import React, { PropTypes } from 'react';
import { HoverContainer } from '../../containers';

const propTypes = {
  side: PropTypes.oneOf(['yes', 'no']).isRequired,
  owner: PropTypes.string,
  msg: PropTypes.string,
};

const defaultProps = {
  side: '',
  owner: '',
  msg: '',
};

const Opinion = ({ side, owner, msg }) => (
  <div className={`opinion opinion--${side}`}>
    <HoverContainer message={msg} id={owner}>
      <img src={`/static/icon-${owner}.png`} alt={owner} />
    </HoverContainer>
  </div>
);

Opinion.propTypes = propTypes;
Opinion.defaultProps = defaultProps;

export default Opinion;
