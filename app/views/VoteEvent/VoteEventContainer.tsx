import { makeStyles } from '@material-ui/styles';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ActionsBar from '../../topologies/ActionsBar';
import { cardTopology } from '../../topologies/Card';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { containerTopology } from '../../topologies/Container';

const useStyles = makeStyles({
  actionBar: {
    padding: '.75rem 1.3rem',
  },
});

const VoteEventContainer: FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment key="VoteEventContainer">
      <div className={classes.actionBar}>
        <ActionsBar>
          <Property label={argu.voteOptions} />
        </ActionsBar>
        <Property
          forceRender
          label={argu.signInFlow}
        />
      </div>
    </React.Fragment>
  );
};

VoteEventContainer.type = [argu.VoteEvent];

VoteEventContainer.topology = [
  cardAppendixTopology,
  cardTopology,
  containerTopology,
];

export default register(VoteEventContainer);
