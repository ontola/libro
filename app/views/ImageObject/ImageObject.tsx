import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  useStrings,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import {
  detailsBarTopology,
  formFooterTopology,
  menuTopology,
  navbarTopology,
  pageHeaderTopology,
  selectTopology,
  selectedValueTopology,
  tableCellTopology,
} from '../../topologies';

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
