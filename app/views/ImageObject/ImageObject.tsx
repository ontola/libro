import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { formFooterTopology } from '../../topologies/FormFooter';
import { menuTopology } from '../../topologies/Menu';
import { navbarTopology } from '../../topologies/Navbar';
import { pageHeaderTopology } from '../../topologies/PageHeader';
import { selectTopology } from '../../topologies/Select';
import { selectedValueTopology } from '../../topologies/SelectedValue';
import { tableCellTopology } from '../../topologies/TableCell';
import { voteBubbleTopology } from '../../topologies/VoteBubble';

interface ImageObjectProps {
  /** Hover text to display. */
  ariaLabel: string;
}

const ImageObject: FC<ImageObjectProps> = ({ ariaLabel }) => (
  <Property
    ariaLabel={ariaLabel}
    label={[schema.thumbnail, ontola.imgUrl64x64]}
  />
);

ImageObject.type = [
  schema.ImageObject,
  schema.VideoObject,
];

ImageObject.topology = [
  detailsBarTopology,
  menuTopology,
  formFooterTopology,
  pageHeaderTopology,
  tableCellTopology,
  navbarTopology,
  selectTopology,
  selectedValueTopology,
  voteBubbleTopology,
];

export default ImageObject;
