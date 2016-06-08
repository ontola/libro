import './opinions.scss';
import React, { PropTypes } from 'react';

const opinion = (side, owner, msg) => {
  return (
    <div className={`opinion opinion--${side}`}>{owner}</div>
  );
}

function Opinions({ pro, con }) {
  const listProOpinions = pro.map(o => opinion(o.option, o.group.name, o.value));
  const listConOpinions = con.map(o => opinion(o.option, o.group.name, o.value));

  return (
    <div className="opinions">
      <div className="opinions__list">{listProOpinions}</div>
      <div className="opinions__list">{listConOpinions}</div>
    </div>
  );
}

Opinions.propTypes = {
  pro: PropTypes.arrayOf(PropTypes.object),
  con: PropTypes.arrayOf(PropTypes.object),
};

Opinions.defaultProps = {
  pro: [],
  con: [],
};

export default Opinions;
