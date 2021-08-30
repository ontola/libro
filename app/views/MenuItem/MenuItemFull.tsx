import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import SubSection from '../../components/SubSection';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import MainBody from '../../topologies/MainBody';

import { MenuTypes } from './types';

const MenuItemFull: FC = ({ subject }) => {
  const [isPartOf] = useProperty(schema.isPartOf);

  if (!isNamedNode(subject)) {
    return null;
  }

  return (
    <React.Fragment>
      <Container>
        <MainBody>
          {isPartOf
            ? <Property label={schema.isPartOf} />
            : (
              <Property label={schema.name} />
            )}
        </MainBody>
      </Container>
      <SubSection menu={subject} />
    </React.Fragment>
  );
};

MenuItemFull.type = MenuTypes;

MenuItemFull.topology = fullResourceTopology;

export default register(MenuItemFull);
