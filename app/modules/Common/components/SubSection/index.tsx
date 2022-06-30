import { makeStyles } from '@mui/styles';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { Property, useGlobalIds } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import app from '../../../Core/ontology/app';
import ontola from '../../../Core/ontology/ontola';
import Container from '../../topologies/Container';
import { landmarkMessages } from '../../../../translations/messages';
import TabbarProvider from '../TabbarProvider';
import { TabVariant } from '../Tabs';

const useStyles = makeStyles({
  subSection: {
    paddingBottom: '2rem',
  },
  withoutTabs: {
    borderTop: '1px solid #E0E0E0',
    paddingTop: '1rem',
  },
});

interface SubSection {
  children?: React.ReactElement;
  label?: string;
  menu?: NamedNode;
  redirect?: boolean;
}

const SubSection = ({
  children,
  menu: menuFromProp,
  redirect,
}: SubSection): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const [tabsMenu] = useGlobalIds(ontola.tabsMenu);
  const menu = menuFromProp ?? tabsMenu;

  if (children || !menu) {
    return (
      <section
        aria-label={intl.formatMessage(landmarkMessages.subsectionLabel)}
        className={clsx(classes.withoutTabs, classes.subSection)}
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
      aria-label={intl.formatMessage(landmarkMessages.subsectionLabel)}
      className={classes.subSection}
      role="region"
    >
      <TabbarProvider
        menu={menu}
        redirect={redirect}
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

SubSection.defaultProps = {
  redirect: true,
};

export default SubSection;
