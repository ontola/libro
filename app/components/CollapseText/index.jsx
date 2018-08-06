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
  onClickToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  text: PropTypes.string,
};

const defaultProps = {
  minCharacters: 700,
};

const CollapseText = ({
  id,
  onClickToggle,
  minCharacters,
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
          alwaysMountChildren
          preview
          id={id}
        >
          <Markdown tabbable={open} text={text} />
        </CollapsibleContainer>
        <Button
          plain
          className="CollapseText__toggle"
          title="Menu uitvouwen of inklappen"
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
      open: ownProps.text.length > minCharacters && getCollapsibleOpened(state, ownProps.id),
    });
  },
  (dispatch, { id }) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: data => dispatch(initializeCollapsible(data)),
  })
)(CollapseText);
