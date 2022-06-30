import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { allTopologies } from '../../../../../topologies';
import Detail from '../../../../Common/components/Detail';
import app from '../../../../Core/ontology/app';
import teamGL from '../../../ontology/teamGL';

const Source = ({ linkedProp }: PropertyProps) => {
  if (linkedProp === app.ns('enums/volunteers/source#glapp')) {
    const text = emoji('📱 Aangemeld via GLAPP');

    return <Detail text={text} />;
  }

  if (linkedProp === app.ns('enums/volunteers/source#website')) {
    const text = emoji('💻 Aangemeld via groenlinks.nl');

    return <Detail text={text} />;
  }

  if (linkedProp === app.ns('enums/volunteers/source#moved')) {
    const text = emoji('🏠 Verhuisd naar deze afdeling');

    return <Detail text={text} />;
  }

  return null;
};

Source.type = teamGL.Volunteer;

Source.topology = allTopologies;

Source.property = teamGL.source;

export default register(Source);
