import './hovercard.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeCard } from '../../actions/hovercard';
import classNames from 'classnames';
import { Box } from '../';

const propTypes = {
  hovercard: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { hovercard: state.hovercard }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRemove: () => {
      dispatch(removeCard());
    },
  }
}

function HoverCard({ hovercard, onRemove }) {
  const { left, top, content } = hovercard.content;
  const className = classNames({
    'HoverCard': true,
    'HoverCard--hide': hovercard.hide
  });
  const style = {
    left: left || 0,
    top: (top || 0) + 20,
  };

  return (
    <div
      style={style}
      className={className}
      onMouseLeave={e => {
        onRemove();
      }}
    >
      <Box>
        {content}
      </Box>
    </div>
  );
}

HoverCard.propTypes = propTypes;
// HoverCard.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(HoverCard);
