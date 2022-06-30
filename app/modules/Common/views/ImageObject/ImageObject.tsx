import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useStrings,
} from 'link-redux';
import React from 'react';

import ontola from '../../../Core/ontology/ontola';
import { formFooterTopology } from '../../../Form/topologies/FormFooter';
import { selectTopology } from '../../../Form/topologies/Select';
import { selectedValueTopology } from '../../../Form/topologies/SelectedValue';
import { menuTopology } from '../../../Menu/topologies/Menu';
import { navbarTopology } from '../../../NavBar/topologies/Navbar';
import { tableCellTopology } from '../../../Table/topologies/TableCell';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { pageHeaderTopology } from '../../topologies/PageHeader';

interface ImageObjectProps {
  /** Hover text to display. */
  ariaLabel: string;
}

const ImageObject: FC<ImageObjectProps> = ({ ariaLabel }) => {
  const aria = useStrings([schema.description, schema.caption]);

  return (
    <Property
      ariaLabel={ariaLabel ?? aria}
      label={[schema.thumbnail, ontola.imgUrl64x64]}
    />
  );
};

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
];

export default ImageObject;
