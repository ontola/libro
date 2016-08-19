// @flow
import './Box.scss';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { BoxActions, Detail, DetailsBar, Heading } from 'components';
import PersonContainer from 'containers/PersonContainer';
import ArgumentsContainer from 'containers/ArgumentsContainer';

const propTypes = {
  author: PropTypes.string,
  boxActions: PropTypes.array,
  children: PropTypes.node,
  date: PropTypes.string,
  id: PropTypes.string,
  headingSize: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  headingVariant: PropTypes.oneOf([
    'default',
    'pro',
    'con',
    'light',
    'center',
    'outsideBox',
  ]),
  link: PropTypes.string,
  showArguments: PropTypes.bool,
  showButtons: PropTypes.bool,
  showMeta: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
};

const defaultProps = {
  boxActions: [],
  headingSize: '2',
  headingVariant: 'default',
};

const Box = ({
  author,
  boxActions,
  children,
  date,
  headingSize,
  headingVariant,
  id,
  link,
  showArguments,
  showMeta,
  title,
  type,
}) => (
  <div className="Box">
    <div className="Box__content">
      {title &&
        <Heading size={headingSize} variant={headingVariant}>
          {link ? <Link to={link}>{title}</Link> : title}
        </Heading>
      }

      {showMeta &&
        <DetailsBar>
          {type && <Detail text={type} icon="file-o" />}
          {author && <PersonContainer user={author} />}
          {date && <Detail text={date} icon="clock-o" />}
        </DetailsBar>
      }

      {children}

      {showArguments &&
        <ArgumentsContainer motionId={id} />
      }
    </div>

    {boxActions.length > 0 &&
      <BoxActions buttons={boxActions} id={id} />
    }
  </div>
);


Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
