import './Opinions.scss';
import React, { PropTypes } from 'react';
import { Opinion } from 'components';

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
    <Opinion
      key={i}
      side={o.option}
      owner={o.group.name}
      msg={message(o.group.name, o.option, o.value)}
    />
  );

  const listConOpinions = con.map((o, i) =>
    <Opinion
      key={i}
      side={o.option}
      owner={o.group.name}
      msg={message(o.group.name, o.option, o.value)}
    />
  );

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
