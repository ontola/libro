import { makeStyles } from '@material-ui/styles';
import {
  FC,
  Property,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { SalesTheme } from '../../../themes/salesWebsite/SalesThemeProvider';
import { fullResourceTopology } from '../../../topologies/FullResource';

const SECTION_BOTTOM_MARGIN = 30;

const useStyles = makeStyles<SalesTheme>((theme) => ({
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
