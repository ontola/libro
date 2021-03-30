import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  ReturnType,
  linkType,
  register,
  subjectType,
  useDataInvalidation,
  useResourceLinks,
  useResourceProperty,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Heading from '../../components/Heading';
import { LoadingRow } from '../../components/Loading';
import { useSeqToArr } from '../../hooks/useSeqToArr';
import argu from '../../ontology/argu';
import { inlineTopology } from '../../topologies/Inline';
import { allTopologies } from '../../topologies';
import './ProcessStepp.scss';
import { homeMessages } from '../../translations/messages';

const featurePropMap = {
  icons: {
    label: argu.icon,
    returnType: ReturnType.AllTerms,
  },
};

const ProcessStep = ({
  color,
  exampleClass,
  icon,
  subject,
}) => {
  const { formatMessage } = useIntl();
  const [featureList] = useResourceProperty(subject, argu.features);
  const features = useSeqToArr(featureList);
  const featuresData = useResourceLinks(features, featurePropMap);
  useDataInvalidation([...features, featureList, subject]);

  const exampleContent = {
    [argu.Survey.id]: (
      <div className="CardContent">
        <Heading>{formatMessage(homeMessages.surveyExampleTitle)}</Heading>
        <ul className="ProcessStep--box-icons">
          <li>
            <h3>
              <span className="fa fa-circle-o" />
              <span className="ProcessStep--filler-bar li-survey-1 icon-left" style={{ width: '20%' }} />
            </h3>
          </li>
          <li>
            <h3>
              <span className="fa fa-circle-o" />
              <span className="ProcessStep--filler-bar li-survey-2 icon-left" style={{ width: '15%' }} />
            </h3>
          </li>
          <li>
            <h3>
              <span className="fa fa-circle-o" />
              <span className="ProcessStep--filler-bar li-survey-3 icon-left" style={{ width: '25%' }} />
            </h3>
          </li>
        </ul>
      </div>
    ),
    [argu.Question.id]: (
      <div className="CardContent">
        <Heading variant="question">{formatMessage(homeMessages.questionExampleTitle)}</Heading>
        <span className="ProcessStep--filler-bar" />
        <span className="ProcessStep--filler-bar" />
        <span className="ProcessStep--filler-bar" style={{ width: '30%' }} />
        <ul className="ProcessStep--box-icons">
          <li className="li-question-1 animate">
            <h3 className="landing-motion-t">
              <span className="fa fa-lightbulb-o" />
              <span className="ProcessStep--filler-bar landing-motion-bg icon-left" style={{ width: '50%' }} />
            </h3>
          </li>
          <li className="li-question-2 animate">
            <h3 className="landing-motion-t">
              <span className="fa fa-lightbulb-o" />
              <span className="ProcessStep--filler-bar landing-motion-bg icon-left" style={{ width: '60%' }} />
            </h3>
          </li>
          <li className="li-question-3 animate">
            <h3 className="landing-motion-t">
              <span className="fa fa-lightbulb-o" />
              <span className="ProcessStep--filler-bar landing-motion-bg icon-left" style={{ width: '65%' }} />
            </h3>
          </li>
        </ul>
      </div>
    ),
    [argu.Motion.id]: (
      <div className="CardContent">
        <Heading variant="motion">{formatMessage(homeMessages.motionExampleTitle)}</Heading>
        <div className="detailsBar li-motion-4 animate landing__detail-decision">
          <div className="detail detail--decision--approved">
            <div className="detail__icon">
              <div className="fa fa-check-square-o" />
            </div>
            <div className="detail__text">{formatMessage(homeMessages.acceptedDecision)}</div>
          </div>
        </div>
        <span className="ProcessStep--filler-bar" />
        <span className="ProcessStep--filler-bar" style={{ width: '60%' }} />
        <ul className="ProcessStep--box-icons">
          <li className="li-motion-1 animate">
            <h3 className="landing-pro-t">
              <span className="fa fa-plus" />
              <span className="ProcessStep--filler-bar landing-pro-bg icon-left" style={{ width: '50%' }} />
            </h3>
          </li>
          <li className="li-motion-2 animate">
            <h3 className="landing-pro-t">
              <span className="fa fa-plus" />
              <span className="ProcessStep--filler-bar landing-pro-bg icon-left" style={{ width: '60%' }} />
            </h3>
          </li>
        </ul>
        <ul className="ProcessStep--box-icons">
          <li className="li-motion-3 animate">
            <h3 className="landing-con-t">
              <span className="fa fa-minus" />
              <span className="ProcessStep--filler-bar landing-con-bg icon-left" style={{ width: '45%' }} />
            </h3>
          </li>
        </ul>
      </div>
    ),
  };

  return (
    <div className="ProcessStep">
      <div className="ProcessStep--arrow">
        <div className="Triad--item" style={{ backgroundColor: color.value }}>
          <div className={`Triad--icon fa fa-${icon?.value}`} />
          <div className="Triad--text">
            <Property label={schema.name} topology={inlineTopology} />
          </div>
          <div className="Triad--arrow Triad--arrow-right" style={{ borderLeftColor: color.value }} />
        </div>
        <ul className="ProcessStep--feature-list">
          {featuresData.map(({ icons, subject: feature }) => (
            <Resource key={feature} subject={feature} onLoad={LoadingRow}>
              <li className="ProcessStep--feature">
                <h3 className={icons.length > 1 ? 'ProcessStep--two-icons' : ''}>
                  {icons.map((featureIcon) => (
                    <span className={`fa fa-${featureIcon.value}`} key={featureIcon.value} />
                  ))}
                  <Heading size="4">
                    <Property label={schema.name} topology={inlineTopology} />
                  </Heading>
                </h3>
                <p>
                  <Property label={schema.text} topology={inlineTopology} />
                </p>
              </li>
            </Resource>
          ))}
        </ul>
      </div>
      <div className="ProcessStep--example">
        <div className="Card">
          {exampleContent[exampleClass.id]}
        </div>
      </div>
    </div>
  );
};

ProcessStep.type = argu.ProcessStep;

ProcessStep.topology = allTopologies;

ProcessStep.mapDataToProps = {
  color: schema.color,
  exampleClass: argu.exampleClass,
  icon: argu.icon,
};

ProcessStep.propTypes = {
  color: linkType,
  exampleClass: linkType,
  icon: linkType,
  subject: subjectType,
};

export default register(ProcessStep);
