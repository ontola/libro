import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  Property,
  subjectType,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { seqToArr } from '../../helpers/data';
import argu from '../../ontology/argu';
import { inlineTopology } from '../../topologies/Inline';
import Heading from '../../components/Heading';
import { LoadingGridContent, SuspendedLoader } from '../../components/Loading';

import './Triad.scss';

const SHARK_OFFSET = 15;
const SHARK_WIDTH = 33;
const SLIDE_COUNT = 2;

const Animations = ({ slide }) => (
  <div className={`Triad--animation Triad--animation-slide-${slide}`}>
    <div className="landanim-bar landanim-bar-2 landanim-challenge" />
    <div className="landanim-identify">
      <div className="landanim-circle landanim-circle-1" />
      <div className="landanim-circle landanim-circle-2" />
      <div className="landanim-circle landanim-circle-3" />
      <div className="landanim-circle landanim-circle-4" />
      <div className="landanim-bar landanim-bar-1" />
      <div className="landanim-bar landanim-bar-3" />
      <div className="landanim-bar landanim-bar-4" />
    </div>
    <div className="landanim-motionbox landanim-motionbox-2 landanim-motion" />
    <div className="landanim-cocreate">
      <div className="landanim-motionbox landanim-motionbox-1" />
      <div className="landanim-motionbox landanim-motionbox-2 landanim-motion" />
      <div className="landanim-motionbox landanim-motionbox-3" />
    </div>
    <div className="landanim-decide">
      <div className="landanim-pro landanim-pro-1" />
      <div className="landanim-pro landanim-pro-2" />
      <div className="landanim-pro landanim-pro-3" />
      <div className="landanim-con landanim-con-1" />
      <div className="landanim-con landanim-con-2" />
    </div>
  </div>
);

Animations.propTypes = {
  slide: PropTypes.number,
};

const messages = defineMessages({
  triadHeader: {
    defaultMessage: 'Engaged throughout your entire decision making process',
    id: 'https://app.argu.co/i18n/arguHome/triadHeader',
  },
});

const Triad = ({ subject }) => {
  const lrs = useLRS();
  const { formatMessage } = useIntl();
  const [slide, setSlide] = useState(0);

  if (!__CLIENT__) {
    return null;
  }

  const processSteps = seqToArr(lrs, [], lrs.getResourceProperty(subject, argu.processSteps));
  useDataInvalidation({
    dataSubjects: processSteps,
    subject,
  });
  const color = lrs.getResourceProperty(processSteps[slide], schema.color);
  const icon = lrs.getResourceProperty(processSteps[slide], argu.icon);

  const nextButton = () => {
    if (slide < SLIDE_COUNT) {
      return (
        <button
          className="Triad--button ArguHome--button"
          onClick={() => setSlide(slide + 1)}
        >
          Next
        </button>
      );
    }

    return (
      <button
        className="Triad--button ArguHome--button"
        onClick={() => setSlide(0)}
      >
        Again
      </button>
    );
  };

  return (
    <div className="Triad">
      <Heading size="1">{formatMessage(messages.triadHeader)}</Heading>
      <React.Suspense fallback={<LoadingGridContent />}>
        <div className="Triad--selector">
          {
              processSteps.map((processStep, index) => {
                const stepColor = lrs.getResourceProperty(processStep, schema.color);
                const stepIcon = lrs.getResourceProperty(processStep, argu.icon);

                return (
                  <LinkedResourceContainer
                    key={processStep}
                    subject={processStep}
                    onLoad={SuspendedLoader}
                  >
                    <button
                      className="Triad--button Triad--item"
                      style={{ backgroundColor: stepColor?.value }}
                      onClick={() => setSlide(index)}
                    >
                      {index > 0 && <div className="Triad--arrow Triad--arrow--left" />}
                      <div className={`Triad--icon fa fa-${stepIcon?.value}`} />
                      <div className="Triad--text"><Property label={schema.name} topology={inlineTopology} /></div>
                      <div className="Triad--arrow Triad--arrow-right" style={{ borderLeftColor: stepColor?.value }} />
                    </button>
                  </LinkedResourceContainer>
                );
              })
            }
        </div>
        <div className="Triad--current-triad Triad--show" style={{ backgroundColor: color?.value }}>
          <div
            className="Triad--sharkfin"
            style={{
              borderBottom: `1rem solid ${color?.value}`,
              left: `${SHARK_OFFSET + SHARK_WIDTH * slide}%`,
            }}
          />
          <LinkedResourceContainer subject={processSteps[slide]} onLoad={SuspendedLoader}>
            <div className="Triad--select">
              <div className={`Triad--background fa fa-${icon?.value}`} />
              <Heading><Property label={schema.description} topology={inlineTopology} /></Heading>
              <p className="Triad--current-triad-body"><Property label={schema.text} topology={inlineTopology} /></p>
              {nextButton()}
            </div>
          </LinkedResourceContainer>
          <Animations slide={slide} />
        </div>
      </React.Suspense>
    </div>
  );
};

Triad.propTypes = {
  subject: subjectType,
};

export default Triad;
