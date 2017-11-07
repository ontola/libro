import React, { PropTypes } from 'react';

import Opinion from '../Opinion';

import './Opinions.scss';

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

const Opinions = ({ pro, con }) => {
  const message = (party, side, msg) => `De partij ${party} is ${side} met ${msg} stemmen`;

  const listProOpinions = pro.map((o, i) =>
    (<Opinion
      key={i}
      msg={message(o.group.name, o.option, o.value)}
      owner={o.group.name}
      side={o.option}
    />));

  const listConOpinions = con.map((o, i) =>
    (<Opinion
      key={i}
      msg={message(o.group.name, o.option, o.value)}
      owner={o.group.name}
      side={o.option}
    />));

  return (
    <div className="Opinions">
      <div className="Opinions__list">{listProOpinions}</div>
      <div className="Opinions__list">{listConOpinions}</div>
    </div>
  );
};

Opinions.propTypes = propTypes;
Opinions.defaultProps = defaultProps;

export default Opinions;
