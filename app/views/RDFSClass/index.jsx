import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';

import Detail from '../../components/Detail';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import TypeDetail from '../Thing/properties/type';

import FormFooter from './FormFooter';

class RDFSClass extends React.PureComponent {
  static type = rdfs.Class;

  static topology = detailsBarTopology;

  static mapDataToProps = {
    description: schema.description,
    label: rdfs.label,
  };

  static propTypes = {
    description: linkType.isRequired,
    label: linkType.isRequired,
  };

  render() {
    const {
      description,
      label,
    } = this.props;

    return (
      <Detail
        linkedImage
        text={label.value}
        title={description ? description.value : undefined}
      />
    );
  }
}

export default [
  register(RDFSClass),
  FormFooter,
  TypeDetail,
];
