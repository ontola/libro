import { linkType, register } from 'link-redux';
import React from 'react';

import { Detail } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import TypeDetail from '../Thing/properties/type';

import FormFooter from './FormFooter';

class RDFSClass extends React.PureComponent {
  static type = NS.rdfs('Class');

  static topology = detailsBarTopology;

  static mapDataToProps = [
    NS.schema('description'),
    NS.rdfs('label'),
  ];

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
