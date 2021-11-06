import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import LinkLoader from '../../../../components/Loading/LinkLoader';
import {
  ProjectContextReaderProps,
  RenderedPage,
  subResource,
} from '../context/ProjectContext';
import { renderCurrentResource } from '../lib/saveProject';

const useStyles = makeStyles({
  iframe: {
    height: '100%',
    width: '100%',
  },
});

export const PrerenderPreview = ({ project }: ProjectContextReaderProps): JSX.Element => {
  const classes = useStyles();

  const resource = subResource(project);
  const [loading, setLoading] = React.useState(resource.prerender === undefined);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [rendered, setRendered] = React.useState<RenderedPage | undefined>(undefined);

  React.useEffect(() => {
    if (resource.prerender === undefined) {
      renderCurrentResource(project)
        .then((page) => setRendered(page))
        .catch((e) => setError(e))
        .finally(() => setLoading(false));
    }
  }, [resource]);

  if (loading) {
    return <LinkLoader />;
  }

  if (error) {
    return (
      <div className={classes.iframe}>
        <Typography variant="h3">
          Error rendering page
        </Typography>
        <Typography variant="body1">
          {error.message}
        </Typography>
        <pre>
          <code>
            {error.stack}
          </code>
        </pre>
      </div>
    );
  }

  const src = `
    <html>
    <head>
        <style>${rendered?.sheet}</style>
    </head>
    <body>${rendered?.content}</body>
    </html>
  `;

  return (
    <iframe
      className={classes.iframe}
      srcDoc={src}
    />
  );
};
