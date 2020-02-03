import { literal } from '@rdfdev/prop-types';
import {
  Resource,
  linkType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../components/Button';
import FieldLabel from '../../../components/FieldLabel';
import { FormContext } from '../../../components/Form/Form';
import FormSection from '../../../components/Form/FormSection';
import { tryParseInt } from '../../../helpers/numbers';
import { omniformSupplementBarTopology } from '../../../topologies/OmniformSupplementBar/OmniformSupplementBar';

import { NestedResourceView } from './components/NestedResourceView';
import OneToOneRenderer from './OneToOne';
import OneToManyRenderer from './OneToMany';

const createAddButton = (subject) => (addItem) => (
  <Button
    small
    theme="transparant"
    onClick={addItem}
  >
    <Resource
      subject={subject}
      topology={omniformSupplementBarTopology}
    />
  </Button>
);

const DescriptionComponent = ({ description }) => {
  if (!description) {
    return null;
  }

  return <div>{description.value}</div>;
};

DescriptionComponent.propTypes = {
  description: literal,
};

const createLabelComponent = (name) => (showLabel) => {
  if (!name) {
    return null;
  }

  return (
    <FieldLabel
      hidden={!showLabel}
      label={name.value}
    />
  );
};


const NestedResource = (props) => {
  const {
    description,
    path,
    fieldName,
    targetNode,
    targetValues,
    maxCount,
    minCount,
    name,
    onKeyUp,
    shClass,
    theme,
  } = props;
  const context = React.useContext(FormContext);
  const [dataObjects, setDataObjects] = React.useState(targetValues.map((iri) => ({ '@id': iri })));

  React.useEffect(() => {
    setDataObjects(targetValues.map((iri) => ({ '@id': iri })));
  }, [context, targetValues]);

  const isOneToMany = !maxCount || tryParseInt(maxCount) > 1 || tryParseInt(minCount) > 1;
  const initialValue = isOneToMany
    ? dataObjects
    : dataObjects?.[0];

  if (theme === 'omniform') {
    return null;
  }

  const FieldView = isOneToMany
    ? OneToManyRenderer
    : OneToOneRenderer;

  return (
    <FormSection name={fieldName} path={path}>
      <FieldView
        addButton={createAddButton(path)}
        context={context}
        descriptionElement={<DescriptionComponent description={description} />}
        fieldName={fieldName}
        initialValue={initialValue}
        labelComponent={createLabelComponent(name)}
        maxCount={maxCount}
        minCount={minCount}
        NestedResourceView={(nestedProps) => (
          <NestedResourceView
            {...nestedProps}
            shClass={shClass}
            targetNode={targetNode}
            theme={theme}
            onKeyUp={onKeyUp}
          />
        )}
        theme={theme}
      />
    </FormSection>
  );
};

NestedResource.propTypes = {
  description: linkType,
  fieldName: PropTypes.string,
  maxCount: linkType,
  minCount: linkType,
  name: linkType,
  nestedShape: PropTypes.bool,
  onKeyUp: PropTypes.func,
  path: linkType,
  shClass: linkType,
  targetNode: subjectType,
  targetValues: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': linkType,
    })
  ),
  theme: PropTypes.string,
};

export default NestedResource;
