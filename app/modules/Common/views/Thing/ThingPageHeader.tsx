import makeStyles from '@mui/styles/makeStyles';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useStrings,
} from 'link-redux';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../../../themes/themes';
import argu from '../../../Argu/lib/argu';
import CardContent from '../../components/Card/CardContent';
import CollapseText from '../../components/CollapseText';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import { defaultMenus } from '../../lib/viewHelpers';
import { CardMain } from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';
import {
  PageHeaderImageAndTextWrapper,
  PageHeaderText,
  pageHeaderTopology,
} from '../../topologies/PageHeader';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  thingPageHeader: {
    marginTop: '-5rem',
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    maxWidth: theme.breakpoints.values.xl * 2 / 3,
    [theme.breakpoints.up(BreakPoints.Large)]: {
      paddingRight: '1.125rem',
    },
  },
}));

const ThingPageHeader: FC = ({ subject }) => {
  const classes = useStyles();
  const [text] = useStrings([schema.text, schema.description]);

  return (
    <div
      about={subject?.value}
      className={classes.thingPageHeader}
    >
      <CardMain>
        <CardContent>
          <PageHeaderImageAndTextWrapper>
            <PageHeaderText>
              <HeaderWithMenu menu={defaultMenus}>
                <Property label={schema.name} />
              </HeaderWithMenu>
              <ContentDetails>
                <Property label={argu.grantedGroups} />
              </ContentDetails>
              <CollapseText
                id={subject.value}
                minCharacters={700}
                text={text ?? ''}
              />
            </PageHeaderText>
          </PageHeaderImageAndTextWrapper>
        </CardContent>
      </CardMain>
    </div>
  );
};

ThingPageHeader.type = schema.Thing;

ThingPageHeader.topology = pageHeaderTopology;

export default register(ThingPageHeader);
