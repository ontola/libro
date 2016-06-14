import './opinions.scss';
import React, { PropTypes } from 'react';
import { Opinion } from '../';

const propTypes = {
  pro: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.bool,
  ]),
  con: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.bool,
  ]),
};

const defaultProps = {
  pro: [],
  con: [],
};

function Opinions({ pro, con }) {
  const listProOpinions = pro.map((o, i) => <Opinion key={i} side={o.option} owner={o.group.name}  />);
  const listConOpinions = con.map((o, i) => <Opinion key={i} side={o.option} owner={o.group.name} />);

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
