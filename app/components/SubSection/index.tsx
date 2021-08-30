import { makeStyles } from '@material-ui/styles';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  useGlobalIds,
  useStrings,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import Container from '../../topologies/Container';
import { landmarkMessages } from '../../translations/messages';
import TabbarProvider from '../TabbarProvider';
import { TabVariant } from '../Tabs';

const useStyles = makeStyles(() => ({
  withTabs: {
    background: 'linear-gradient(to bottom, #FBFBFB, white)',
    marginTop: '2rem',
    paddingBottom: '4rem',
  },
  withoutTabs: {
    background: 'linear-gradient(to bottom, #FBFBFB, white)',
    borderTop: '1px solid #E0E0E0',
    marginTop: '2rem',
    paddingTop: '1rem',
  },
}));

interface SubSection {
  children?: React.ReactElement;
  label?: string;
  menu?: NamedNode;
}

const SubSection = ({
  children,
  label,
  menu: menuFromProp,
}: SubSection): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const [tabsMenu] = useGlobalIds(ontola.tabsMenu);
  const menu = menuFromProp ?? tabsMenu;
  const [name] = useStrings(tabsMenu, schema.name);

  if (children || !menu) {
    return (
      <section
        aria-label={label ?? intl.formatMessage(landmarkMessages.subsectionLabel)}
        className={classes.withoutTabs}
        role="region"
      >
        {children ?? (
          <Container>
            <Property label={schema.comment} />
          </Container>
        )}
      </section>
    );
  }

  return (
    <section
      aria-label={label ?? name}
      className={classes.withTabs}
      role="region"
    >
      <TabbarProvider
        redirect
        menu={menu}
      >
        <Property
          forceRender
          label={app.menuTabs}
          variant={TabVariant.SubSection}
        />
        <Property
          forceRender
          label={app.currentTab}
        />
      </TabbarProvider>
    </section>
  );
};

export default SubSection;
