import AppBar from '@mui/material/AppBar';
import rdf, { Literal, isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Property,
  Resource,
  array,
  register,
  useDataFetching,
  useFields,
  useIds,
} from 'link-redux';
import React, { useState } from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import CardDivider from '../../../Common/components/Card/CardDivider';
import { iriFromTemplate } from '../../../Common/lib/uriTemplate';
import { fullResourceTopology } from '../../../Common/topologies';
import { CardMain } from '../../../Common/topologies/Card';
import Container from '../../../Common/topologies/Container';
import TabBar from '../../../Common/topologies/TabBar';
import TabPane from '../../../Common/topologies/TabPane';
import app from '../../../Common/ontology/app';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';

import DashboardTabBar from './DashboardTabBar';
import DateRangeFilter, { DATE_SIZE } from './DateRangeFilter';
import PostalRangeFilter from './PostalRangeFilter';

const VALID_POSTAL_RANGE_LENGTH = 9;
const ONE_WEEK = 7;

const dateRangeToS = (dateRange: [Date, Date]) => (
  dateRange.map((date: Date) => {
    const dd = date.getDate().toString().padStart(DATE_SIZE, '0');
    const mm = (date.getMonth() + 1).toString().padStart(DATE_SIZE, '0');
    const yyyy = date.getFullYear();

    return yyyy + mm + dd;
  }).join('-')
);

const DashboardPageFull = () => {
  const [dashboard] = useIds(teamGL.dashboard);

  useDataFetching([dashboard]);
  const items = useIds(dashboard, array(ontola.menuItems));
  const firstItem = items[0];
  const [currentTab, setCurrentTab] = useState<SomeNode | undefined>(undefined);
  const [iriTemplate] = useFields(isNode(currentTab) ? currentTab : undefined, ontola.href);
  const currentActorPostalRanges = useFields(app.c_a, teamGL.postalRanges);
  const [page, setPage] = useState(1);
  const [postalRanges, setPostalRange] = useState<Literal[]>([]);
  const [dateRange, setDateRange] = useState<[Date, Date]>(() => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - ONE_WEEK);

    return [oneWeekAgo, today];
  });

  React.useEffect(() => {
    if (!currentTab && isNode(firstItem)) {
      setCurrentTab(firstItem);
    }
  }, [firstItem]);

  React.useEffect(() => {
    if (postalRanges.length === 0 && currentActorPostalRanges) {
      setPostalRange(
        currentActorPostalRanges.map((range) => (
          rdf.literal(range.value.replace('0-', '0000-'))
        )),
      );
    }
  }, [currentActorPostalRanges]);

  if (!iriTemplate) {
    return null;
  }

  const tabBar = (
    <AppBar
      color="inherit"
      elevation={0}
      position="static"
    >
      <TabBar value={currentTab?.value}>
        {items.map((item) => (
          isNode(item) && (
            <DashboardTabBar
              key={item.value}
              subject={item}
              value={item.value}
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab(item);
              }}
            />
          )
        ))}
      </TabBar>
    </AppBar>
  );

  const filteredPostalRanges = postalRanges.filter((range) => (
    range.value?.length === VALID_POSTAL_RANGE_LENGTH
  ));

  return (
    <Container>
      <CardMain>
        <CardContent endSpacing>
          <Property label={schema.name} />
          <DateRangeFilter
            dateRange={dateRange}
            label="Toon statistieken uit de postcodes:"
            setDateRange={setDateRange}
          />
          <PostalRangeFilter
            label="Toon statistieken uit de postcodes:"
            postalRanges={postalRanges}
            setPostalRange={setPostalRange}
          />
        </CardContent>
        <CardDivider />
        {tabBar}
      </CardMain>
      <div style={{ marginTop: '1em' }}>
        <TabPane>
          <Resource
            nextPage={() => setPage(page + 1)}
            previousPage={() => setPage(page - 1)}
            subject={iriFromTemplate(iriTemplate.value, {
              date_range: dateRangeToS(dateRange),
              page,
              postal_range: filteredPostalRanges?.map((range) => range.value)?.join(','),
            })}
          />
        </TabPane>
      </div>
    </Container>
  );
};

DashboardPageFull.type = teamGL.DashboardPage;

DashboardPageFull.topology = fullResourceTopology;

export default register(DashboardPageFull);
