import schema from '@ontologies/schema';
import {
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { retrievePath } from '../../helpers/iris';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { Detail } from '../../components';
import rivm from '../../ontology/rivm';

const CategoryDetailsBar = ({ name, subject }) => (
  <Detail
    icon="tag"
    text={name.value}
    title={name.value}
    url={retrievePath(subject.value)}
  />
);

CategoryDetailsBar.type = rivm.Category;

CategoryDetailsBar.topology = [detailsBarTopology, contentDetailsTopology];

CategoryDetailsBar.mapDataToProps = { name: schema.name };

CategoryDetailsBar.propTypes = {
  name: linkType,
  subject: subjectType,
};

export default register(CategoryDetailsBar);
