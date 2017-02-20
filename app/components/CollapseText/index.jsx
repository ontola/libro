import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import CollapsibleContainer from 'containers/CollapsibleContainer';
import { initializeCollapsible, toggleOne } from 'state/collapsible/actions';
import { getCollapsibleOpened } from 'state/collapsible/selectors';
import {
  Button,
  Markdown,
} from 'components';

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
          alt={'Menu uitvouwen of inklappen'}
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
CollapseText.defaultProps = defaultProps;

export default connect(
  (state, ownProps) => ({
    open: getCollapsibleOpened(state, ownProps.id),
  }),
  (dispatch, { id }) => ({
    onClickToggle: () => dispatch(toggleOne(id)),
    onInitializeCollapsible: data => dispatch(initializeCollapsible(data)),
  })
)(CollapseText);
