import NodeShape from './NodeShape';
import Label from './properties/label';
import Property from './properties/property';
import SHACLClass from './properties/SHACLClass';
import TargetClass from './properties/targetClass';
import PropertyShape from './PropertyShape';
import PropertyGroup from './PropertyGroup';
import FormStep from './FormStep';

export default [
  Label,
  NodeShape,
  Property,
  SHACLClass,
  TargetClass,
  ...PropertyShape,
  PropertyGroup,
  FormStep,
];
