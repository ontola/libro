import { connect } from 'react-redux';
import { setCard, removeCard } from '../actions/hovercard';
import { Hoverable } from '../components';

const mapStateToProps = (state, ownProps) => ({
  content: ownProps.message,
  id: ownProps.id,
});

const mapDispatchToProps = (dispatch) => ({
  onShow: (content) => {
    dispatch(setCard(content));
  },
  onRemove: () => {
    dispatch(removeCard());
  },
});

const HoverContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hoverable);

export default HoverContainer;
