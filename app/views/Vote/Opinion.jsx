import rdf from '@ontologies/core';
import { linkType, register } from 'link-redux';
import React, { Component } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { cardTopology } from '../../topologies/Card';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import './Opinion.scss';

class Opinion extends Component {
  static type = NS.argu('Vote');

  static topology = [
    cardTopology,
    cardRowTopology,
  ];

  static mapDataToProps = [
    NS.schema('option'),
    NS.argu('primaryVote'),
  ];

  static propTypes = {
    option: linkType,
    primaryVote: linkType,
  };


  render() {
    const { option, primaryVote } = this.props;

    let classes;
    switch (rdf.id(option)) {
      case rdf.id(NS.argu('yes')):
        classes = 'fa-thumbs-up Opinion--icon-pro';
        break;
      case rdf.id(NS.argu('no')):
        classes = 'fa-thumbs-down Opinion--icon-con';
        break;
      default:
        classes = 'fa-pause Opinion--icon-neutral';
        break;
    }
    if (primaryVote.value === 'false') {
      classes += ' Opinion--icon-expired';
    }

    return (
      <span className={`fa Opinion--icon ${classes}`} />
    );
  }
}

export default register(Opinion);
