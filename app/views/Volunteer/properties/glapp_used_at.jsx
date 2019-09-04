import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const GlappUsedAt = ({ linkedProp }) => {
  const intl = useIntl();

  if (linkedProp) {
    return (
      <FormattedMessage
        defaultMessage="GLAPP voor het laatst gebruikt op {date}."
        id="https://app.argu.co/i18n/teamGL/glappUsedAt"
        tagName="p"
        values={{ date: intl.formatDate(new Date(linkedProp.value)) }}
      />
    );
  }

  return (
    <FormattedMessage
      defaultMessage="GLAPP nog niet gebruikt."
      id="https://app.argu.co/i18n/teamGL/glappNotUsed"
      tagName="p"
    />
  );
};

GlappUsedAt.type = NS.teamGL('Volunteer');

GlappUsedAt.property = NS.teamGL('glappUsedAt');

GlappUsedAt.topology = allTopologies;

GlappUsedAt.propTypes = {
  linkedProp: linkedPropType,
};

export default register(GlappUsedAt);
