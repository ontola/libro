import { makeStyles } from '@material-ui/styles';
import React from 'react';

import useJSON from '../../../../../../hooks/useJSON';
import {
  DialogType,
  ProjectAction,
  ProjectContextProps,
} from '../../../context/ProjectContext';
import { useDistributions } from '../../../hooks/useDistributions';
import { Publication } from '../../../lib/distributionAgent';

import { DistributionsTable } from './DistributionsTable';
import { PublicationTable } from './PublicationTable';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    height: '100%',
    overflowY: 'auto',
  },
});

export const DistributionsEditor = ({ dispatch, project }: ProjectContextProps): JSX.Element => {
  const classes = useStyles();

  const [distributions, reloadDistributions] = useDistributions(project.iri!);
  const [publications, reloadPublications] = useJSON<Publication[]>(`${project.iri}/publications`);

  React.useEffect(() => {
    if (project.dialog === undefined) {
      reloadDistributions();
      reloadPublications();
    }
  }, [project.dialog]);

  const openDialog = React.useCallback(() => {
    dispatch({
      dialogType: DialogType.CreateDistribution,
      type: ProjectAction.ShowDialog,
    });
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <PublicationTable
        project={project}
        publications={publications}
        onPublicationsChange={reloadPublications}
      />
      <DistributionsTable
        dispatch={dispatch}
        distributions={distributions}
        onNewDistributionClick={openDialog}
      />
    </div>
  );
};
