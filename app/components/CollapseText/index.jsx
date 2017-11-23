import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import Button from '../Button';
import Markdown from '../Markdown';
import CollapsibleContainer from '../../containers/CollapsibleContainer';
import { initializeCollapsible, toggleOne } from '../../state/collapsible/actions';
import { getCollapsibleOpened } from '../../state/collapsible/selectors';

import './CollapseText.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  minCharacters: PropTypes.number,
  minHeight: PropTypes.number,
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  text: PropTypes.string,
};

const defaultProps = {
  minCharacters: 700,
  minHeight: 100,
};

const CollapseText = ({
  id,
  onClickToggle,
  minCharacters,
  minHeight,
  open,
  text,
}) => {
  const classes = classNames({
    CollapseText: true,
    'CollapseText--open': open,
  });

  if (text.length > minCharacters) {
    return (
      <div className={classes}>
        <CollapsibleContainer
          id={id}
          minHeight={minHeight}
        >
          <Markdown tabbable={open} text={text} />
        </CollapsibleContainer>
        <Button
          plain
          alt="Menu uitvouwen of inklappen"
          className="CollapseText__toggle"
          onClick={() => onClickToggle()}
        >
          {open && 'Inklappen '}
          {!open && 'Lees meer '}
          <FontAwesome name="caret-down" />
        </Button>
      </div>
    );
  }
  return <Markdown text={text} />;
};

CollapseText.propTypes = propTypes;

export default connect(
  (state, ownProps) => {
    const minCharacters = ownProps.minCharacters || defaultProps.minCharacters;
    return ({
      minCharacters,
      minHeight: ownProps.minHeight || defaultProps.minHeight,
      open: ownProps.text.length > minCharacters && getCollapsibleOpened(state, ownProps.id),
    });
  },
  (dispatch, { id }) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: data => dispatch(initializeCollapsible(data)),
  })
)(CollapseText);
