import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import DraggableList from 'react-draggable-list';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormField,
  Heading,
} from 'components';
import VoteMatchItemContainer from 'containers/VoteMatchItemContainer';
import paths from 'helpers/paths';
import { getVoteMatchMotionIds } from 'state/voteMatch/selectors';
import { voteMatchUpdateMotions } from 'state/voteMatch/actions';

import VoteMatch from '../../models/VoteMatch';

const propTypes = {
  // Since this uses redux-form, you need to pass onSubmit instead of handleSubmit.
  handleSubmit: PropTypes.func.isRequired,
  // From redux-form. Is true unless form input is valid.
  invalid: PropTypes.bool,
  // Function that is called when dragging is stopped.
  onUpdateVoteables: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  // Immutable List of voteable items, such as motions
  voteables: PropTypes.instanceOf(List),
};

const CreateVoteMatch = ({
  handleSubmit,
  invalid,
  voteables,
  onUpdateVoteables,
  submitting,
}) => {
  const title = 'Stemwijzer maken';

  const MINIMUM_VOTEABLES = 5;

  const hasEnoughVoteables = () => voteables.length < MINIMUM_VOTEABLES;

  return (
    <Container>
      <Helmet title={title} />
      <Heading>
        {title}
      </Heading>
      <Card>
        <form
          className="Argumentform"
          onSubmit={handleSubmit}
        >
          <Field
            className="Field--heading"
            component={FormField}
            element="input"
            id="voteMatchName"
            name="name"
            placeholder="Titel van stemwijzer"
            type="text"
            variant="preview"
          />
          <Field
            component={FormField}
            element="textArea"
            id="voteMatchText"
            name="text"
            placeholder="Toelichting (optioneel)..."
            rows={3}
            variant="preview"
          />
          {voteables && voteables.length > 0 &&
            <DraggableList
              itemKey={id => `voteMatch_${id}`}
              list={voteables}
              template={VoteMatchItemContainer}
              onMoveEnd={newList => onUpdateVoteables(newList)}
            />
          }
          {hasEnoughVoteables() &&
            <CardContent>
              Je stemwijzer heeft minimaal {MINIMUM_VOTEABLES} moties nodig.
              <Link to={paths.search()}> Zoek naar moties</Link>.
            </CardContent>
          }
          <CardActions noSpacing>
            <Button
              icon="search"
              theme="box"
            >
              Moties zoeken
            </Button>
            <Button
              disabled={(invalid || hasEnoughVoteables())}
              icon="send"
              loading={submitting}
              theme="box"
              type="submit"
            >
              Opslaan
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

CreateVoteMatch.propTypes = propTypes;

const validate = (values) => {
  const errors = {};
  const MAX_TITLE_LENGTH = 75;
  const MIN_TITLE_LENGTH = 5;
  const MAX_BODY_LENGTH = 5000;

  const name = values.get('name');
  const text = values.get('text');

  if (!name) {
    errors.name = 'Vereist';
  } else if (name.length > MAX_TITLE_LENGTH) {
    errors.name = 'Te lang';
  } else if (name.length < MIN_TITLE_LENGTH) {
    errors.name = 'Te kort';
  }
  if (text) {
    if (text.length > MAX_BODY_LENGTH) {
      errors.text = 'Te lang';
    }
  }
  return errors;
};

const mapStateToProps = (state) => {
  const formName = 'VoteMatch';
  return ({
    form: formName,
    initialValues: {
      voteables: getVoteMatchMotionIds(state, { id: 'LocalVoteMatch' }).toJS(),
    },
    validate,
    voteables: getVoteMatchMotionIds(state, { id: 'LocalVoteMatch' }).toJS(),
  });
};

const mapDispatchToProps = dispatch => ({
  onSubmit: values => dispatch(VoteMatch.create(values, { href: '/vote_matches' })),
  onUpdateVoteables: newList => dispatch(voteMatchUpdateMotions({
    id: 'LocalVoteMatch',
    voteables: new List(newList),
  })),
});

const CreateVoteMatchContainer = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  validate,
})(CreateVoteMatch));

export default CreateVoteMatchContainer;
