import './opinions.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  pro: PropTypes.arrayOf(PropTypes.object),
  con: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  pro: [],
  con: [],
};

function Opinion({ side, owner, msg}) {
  return (
    <div className={`opinion opinion--${side}`}>{owner}</div>
  );
}

function Opinions({ pro, con }) {
  const listProOpinions = pro.map((o, i) => <Opinion key={i} side={o.option} owner={o.group.name} msg={o.value} />);
  const listConOpinions = con.map((o, i) => <Opinion key={i} side={o.option} owner={o.group.name} msg={o.value} />);

  return (
    <div className="opinions">
      <div className="opinions__list">{listProOpinions}</div>
      <div className="opinions__list">{listConOpinions}</div>
    </div>
  );
}

Opinions.propTypes = propTypes;
Opinions.defaultProps = defaultProps;

export default Opinions;
