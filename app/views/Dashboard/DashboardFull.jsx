import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
  subjectType,
  useDataFetching,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '../../components/Button';
import CardContent from '../../components/Card/CardContent';
import CardDivider from '../../components/Card/CardDivider';
import FormInputs from '../../components/FormField/FormInputs';
import DatePicker from '../../containers/DatePicker';
import { iriFromTemplate } from '../../helpers/uriTemplate';
import { useContainerToArr } from '../../hooks/useContainerToArr';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { CardMain } from '../../topologies/Card';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import TabBar from '../../topologies/TabBar';
import TabPane from '../../topologies/TabPane';

const VALID_POSTAL_RANGE_LENGTH = 9;
const DATE_SIZE = 2;
const ONE_WEEK = 7;

const dateRangeToS = (dateRange) => (
  dateRange.map((date) => {
    const dd = date.getDate().toString().padStart(DATE_SIZE, '0');
    const mm = (date.getMonth() + 1).toString().padStart(DATE_SIZE, '0');
    const yyyy = date.getFullYear();

    return yyyy + mm + dd;
  }).join('-')
);

const dateToS = (date) => {
  const dd = date.getDate().toString().padStart(DATE_SIZE, '0');
  const mm = (date.getMonth() + 1).toString().padStart(DATE_SIZE, '0');
  const yyyy = date.getFullYear();

  return [yyyy, mm, dd].join('-');
};

const DateRangeFilter = ({ dateRange, setDateRange }) => (
  <div>
    <DatePicker
      value={dateToS(dateRange[0])}
      onChange={(value) => setDateRange([new Date(value), dateRange[1]])}
    />
    {' '}
    <DatePicker
      value={dateToS(dateRange[1])}
      onChange={(value) => setDateRange([dateRange[0], new Date(value)])}
    />
  </div>
);

DateRangeFilter.propTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.string),
  setDateRange: PropTypes.func,
};

const PostalRangeFilter = ({ postalRanges, setPostalRange }) => (
  <div className="Field  Field Field--variant-default Field--dirty Field--postalRange">
    <FormInputs
      removable
      input={{
        onChange: setPostalRange,
        value: postalRanges,
      }}
      meta={{}}
      type="postalRange"
      values={postalRanges}
    />
    <div>
      <Button
        theme="transparant"
        onClick={() => {
          const newValue = postalRanges.slice() || [];
          newValue.push(rdf.literal(''));
          setPostalRange(newValue);
        }}
      >
        + Postcodes toevoegen
      </Button>
    </div>
  </div>
);

PostalRangeFilter.propTypes = {
  postalRanges: PropTypes.arrayOf(linkType),
  setPostalRange: PropTypes.func,
};

const DasboardTabBar = ({ subject, onClick }) => (
  <Tab
    key={subject.value}
    label={(
      <Resource subject={subject}>
        <Property label={schema.name} />
      </Resource>
    )}
    value={subject.value}
    onClick={onClick}
  />
);

DasboardTabBar.propTypes = {
  onClick: PropTypes.func,
  subject: subjectType,
};

const DashboardFull = ({ dashboard }) => {
  useDataFetching([dashboard]);
  const [itemSequence] = useResourceProperty(dashboard, ontola.menuItems);
  const items = useContainerToArr(itemSequence);
  const [firstItem] = useResourceProperty(itemSequence, rdfx.ns('_0'));
  const [currentTab, setCurrentTab] = useState(null);
  const [iriTemplate] = useResourceProperty(currentTab, ontola.href);
  const currentActorPostalRanges = useResourceProperty(app.c_a, teamGL.postalRanges);
  const [page, setPage] = useState(1);
  const [postalRanges, setPostalRange] = useState([]);
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - ONE_WEEK);

    return [oneWeekAgo, today];
  });

  React.useEffect(() => {
    if (!currentTab && firstItem) {
      setCurrentTab(firstItem);
    }
  }, [firstItem]);

  React.useEffect(() => {
    if (postalRanges.length === 0 && currentActorPostalRanges) {
      setPostalRange(
        currentActorPostalRanges.map((range) => (
          rdf.literal(range.value.replace('0-', '0000-'))
        ))
      );
    }
  }, [currentActorPostalRanges]);

  if (!iriTemplate) {
    return null;
  }

  const tabBar = (
    <AppBar color="inherit" elevation={0} position="static">
      <TabBar value={currentTab?.value}>
        {items.map((item) => (
          <DasboardTabBar
            key={item.value}
            subject={item}
            value={item.value}
            onClick={(e) => {
              e.preventDefault();
              setCurrentTab(item);
            }}
          />
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
          Toon statistieken uit de periode:
          <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
          Toon statistieken uit de postcodes:
          <PostalRangeFilter postalRanges={postalRanges} setPostalRange={setPostalRange} />
        </CardContent>
        <CardDivider />
        {tabBar}
        <div style={{ marginTop: '1em' }}>
          <TabPane>
            <Resource
              nextPage={() => setPage(page + 1)}
              previousPage={() => setPage(page - 1)}
              subject={iriFromTemplate(iriTemplate.value, {
                date_range: dateRangeToS(dateRange),
                page,
                postal_range: filteredPostalRanges.length > 0 && filteredPostalRanges.map((range) => range.value).join(','),
              })}
            />
          </TabPane>
        </div>
      </CardMain>
    </Container>
  );
};

DashboardFull.type = teamGL.DashboardPage;

DashboardFull.topology = fullResourceTopology;

DashboardFull.mapDataToProps = {
  dashboard: teamGL.dashboard,
};

DashboardFull.propTypes = {
  dashboard: linkType,
};

export default register(DashboardFull);
