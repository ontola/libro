import { makeStyles } from '@material-ui/styles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  array,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import sales from '../../../ontology/sales';
import { LibroTheme, Size } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';
import Container from '../../../topologies/Container';

const useStyles = makeStyles<LibroTheme>({
  headerImage: {
    '&:is(img)': {
      filter: 'drop-shadow(0px 9px 107px rgba(0, 0, 0, 0.12)) drop-shadow(0px 2.01027px 23.8999px rgba(0, 0, 0, 0.0715329)) drop-shadow(0px 0.598509px 7.11561px rgba(0, 0, 0, 0.0484671));',
    },
    maxWidth: '100%',
    position: 'relative',
    zIndex: 1,
  },
});

const TrialPage: FC = () => {
  const classes = useStyles();
  const sections = useIds(array(sales.sections));
  const [header] = useIds(sales.header);
  const [image] = useIds(schema.image);

  return (
    <React.Fragment>
      <Resource
        subComponent={(
          <Container>
            <Resource
              className={classes.headerImage}
              subject={image}
            />
          </Container>
        )}
        subject={header}
      />
      <Container size={Size.XSmall}>
        {sections.map((section) => (
          <Resource
            className={classes.section}
            key={section.value}
            subject={section}
          />
        ))}
      </Container>
    </React.Fragment>
  );
};

TrialPage.type = sales.TrialPage;
TrialPage.topology = allTopologies;

export default register(TrialPage);
