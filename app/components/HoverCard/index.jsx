import './hovercard.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

const propTypes = {
  hovercard: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { hovercard: state.hovercard }
}

function HoverCard({ hovercard }) {
  const { left, top, content } = hovercard.content;
  const className = classNames({
    'HoverCard': true,
    'HoverCard--hide': hovercard.hide
  });
  const style = {
    left: (left || -999),
    top: (top || -999) + 20,
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
// HoverCard.defaultProps = defaultProps;

export default connect(mapStateToProps)(HoverCard);
