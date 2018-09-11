import { linkType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../components';
import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';


class RDFSClassFormFooter extends React.PureComponent {
  static type = NS.rdfs('Class');

  static topology = formFooterTopology;

  static mapDataToProps = [
    NS.schema('description'),
    NS.rdfs('label'),
    NS.schema('image'),
  ];

  static propTypes = {
    current: PropTypes.bool,
    description: linkType.isRequired,
    image: linkType.isRequired,
    label: linkType.isRequired,
    onClick: PropTypes.func,
  };

  render() {
    const {
      current,
      description,
      image,
      label,
      onClick,
    } = this.props;

    const curClass = current ? ' Button--omniform-switcher--current' : '';

    return (
      <Button
        className={`Button--omniform-switcher Button--omniform-switcher-- ${curClass}`}
        icon={normalizeFontAwesomeIRI(image)}
        theme="transparant"
        title={description.value}
        onClick={onClick}
      >
        {label.value}
      </Button>
    );
  }
}

export default register(RDFSClassFormFooter);
