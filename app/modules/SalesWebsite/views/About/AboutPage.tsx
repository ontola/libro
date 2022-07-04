import { makeStyles } from '@mui/styles';
import {
  FC,
  Property,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Common/theme/types';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import sales from '../../ontology/sales';

const SECTION_BOTTOM_MARGIN = 30;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  section: {
    '& h2': {
      fontSize: '2rem',
    },
    '&:last-of-type': {
      marginBottom: '0px',
    },
    marginBottom: theme.spacing(SECTION_BOTTOM_MARGIN),
  },
}));

const AboutPage: FC = () => {
  const classes = useStyles();
  const sectionMembers = useIds(array(sales.sections));

  return (
    <main role="main">
      <Property label={sales.header} />
      <div>
        {sectionMembers.map((section) => (
          <div
            className={classes.section}
            key={section.value}
          >
            <Resource subject={section} />
          </div>
        ))}
      </div>
      <Property
        label={sales.callToActionBlock}
        trackingId="about-page-cta"
      />
    </main>
  );
};

AboutPage.type = sales.AboutPage;
AboutPage.topology = fullResourceTopology;

export default register(AboutPage);
