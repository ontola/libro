import './hovercard.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

const propTypes = {
  hovercard: PropTypes.object,
};

const mapStateToProps = (state) => ({
  hovercard: state.hovercard,
});

function HoverCard({ hovercard }) {
  const OFFSCREEN = -999;
  const PADDINGTOP = 20;
  const { left, top, content } = hovercard.content;
  const className = classNames({
    HoverCard: true,
    'HoverCard--hide': hovercard.hide,
  });
  const style = {
    left: (left || OFFSCREEN),
    top: (top || OFFSCREEN) + PADDINGTOP,
  };

  return (
    <div style={style} className={className}>
      <div className="HoverCard__content">
        {content}
      </div>
    </div>
  );
}

HoverCard.propTypes = propTypes;
export default connect(mapStateToProps)(HoverCard);
