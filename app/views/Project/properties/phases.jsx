import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/styles';
import as from '@ontologies/as';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  linkedPropType,
  register,
  subjectType,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { useHistory } from 'react-router';

import { containerToArr, entityIsLoaded } from '../../../helpers/data';
import { retrievePath } from '../../../helpers/iris';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import TabBar from '../../../topologies/TabBar';

const useStyles = makeStyles(() => ({
  PhaseTabBarCurrent: {
    fontWeight: 'bold',
  },
  smallTab: {
    minWidth: '22px',
  },
}));

const PhaseTabBar = ({
  current,
  subject,
}) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Tab
      className={current ? classes.PhaseTabBarCurrent : null}
      key={subject.value}
      label={(
        <Resource subject={subject}>
          <Property label={schema.name} />
        </Resource>
      )}
      value={subject.value}
      onClick={(e) => {
        e.preventDefault();
        history.push(retrievePath(subject.value));
      }}
    />
  );
};

PhaseTabBar.propTypes = {
  current: PropTypes.bool,
  subject: subjectType,
};

const Phases = ({
  currentPhase,
  linkedProp,
  selectedPhase,
  subject,
}) => {
  const lrs = useLRS();
  const [page] = useResourceProperty(linkedProp, ontola.pages);
  const [createAction] = useResourceProperty(linkedProp, ontola.createAction);
  const [editAction] = useResourceProperty(selectedPhase, ontola.actionsMenu);
  const [itemSequence] = useResourceProperty(page || subject, as.items);
  const items = itemSequence ? containerToArr(lrs, [], itemSequence) : [];
  const classes = useStyles();

  useDataInvalidation([page, linkedProp, ...items]);

  if (!entityIsLoaded(lrs, linkedProp)) {
    return <Resource subject={linkedProp} />;
  }

  if (page && !entityIsLoaded(lrs, page)) {
    return <Resource subject={page} />;
  }

  const newPhaseTab = createAction && (
    <Tab
      className={classes.smallTab}
      icon={<FontAwesome name="plus" />}
      key={createAction.value}
      value={createAction.value}
      onClick={(e) => {
        e.preventDefault();
        lrs.actions.ontola.showDialog(createAction);
      }}
    />
  );

  const menuPhaseTab = editAction && (
    <Tab
      className={classes.smallTab}
      icon={<FontAwesome name="ellipsis-v" />}
      key={editAction.value}
      value={editAction.value}
      onClick={(e) => {
        e.preventDefault();
        lrs.actions.ontola.showDialog(editAction);
      }}
    />
  );

  return (
    <React.Fragment>
      <h2>Fase: Fasenaam</h2>
      <AppBar color="inherit" elevation={0} position="static">
        <TabBar value={(selectedPhase || currentPhase)?.value}>
          {
            items.map((item) => (
              <PhaseTabBar
                current={currentPhase === item}
                key={item.value}
                subject={item}
                value={item.value}
              />
            ))
          }
          {newPhaseTab}
          {menuPhaseTab}
        </TabBar>
      </AppBar>
    </React.Fragment>
  );
};

Phases.type = argu.Project;

Phases.topology = allTopologies;

Phases.property = argu.phases;

Phases.mapDataToProps = {
  currentPhase: argu.currentPhase,
};

Phases.propTypes = {
  currentPhase: linkType,
  linkedProp: linkedPropType,
  selectedPhase: linkType,
  subject: subjectType,
};

export default register(Phases);
