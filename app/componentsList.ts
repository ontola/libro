import { createNS } from '@ontologies/core';

import elements from './modules/Elements/ontology/elements';

export const component = createNS('component:');

export const components = {
  ActionButton: component('ActionButton'),
  Attachment: component('Attachment'),
  AttachmentPreview: component('AttachmentPreview'),
  AttributeListItem: component('AttributeListItem'),
  BlurButton: component('BlurButton'),
  BreadcrumbsBreadcrumb: component('Breadcrumbs/Breadcrumb'),
  Button: component('Button'),
  ButtonWithFeedback: component('ButtonWithFeedback'),
  CardCardActions: component('Card/CardActions'),
  CardCardContent: component('Card/CardContent'),
  CardCardDivider: component('Card/CardDivider'),
  CardCardHeader: component('Card/CardHeader'),
  CheckboxesInput: component('CheckboxesInput'),
  CollapseText: component('CollapseText'),
  Collapsible: component('Collapsible'),
  Collection: component('Collection'),
  CollectionProvider: component('CollectionProvider'),
  Column: component('Column'),
  Columns: component('Columns'),
  CountBubble: component('CountBubble'),
  CoverImage: component('CoverImage'),
  Detail: component('Detail'),
  DetailDate: component('DetailDate'),
  DetailText: component('Detail/text'),
  DropdownMenu: component('DropdownMenu'),
  ElementA: elements.A,
  ElementH1: elements.H1,
  ElementH2: elements.H2,
  ElementH3: elements.H3,
  ElementH4: elements.H4,
  ElementH5: elements.H5,
  ElementH6: elements.H6,
  ElementInnerText: elements.InnerText,
  ElementLi: elements.Li,
  ElementNote: elements.Note,
  ElementOl: elements.Ol,
  ElementP: elements.P,
  ElementSpan: elements.Span,
  ElementTip: elements.Tip,
  ElementUl: elements.Ul,
  Error: component('Error'),
  FieldLabel: component('FieldLabel'),
  FormField: component('FormField'),
  FormFieldCharCounter: component('FormField/CharCounter'),
  FormFieldFieldHelper: component('FormField/FieldHelper'),
  FormFooterImage: component('Form/FooterImage'),
  FormFooterRight: component('Form/FooterRight'),
  FormForm: component('Form/Form'),
  FormFormSection: component('Form/FormSection'),
  GridGridHeader: component('Grid/GridHeader'),
  GridGridItem: component('Grid/GridItem'),
  HeaderFloat: component('HeaderFloat'),
  HeaderWithMenu: component('HeaderWithMenu'),
  Heading: component('Heading'),
  Image: component('Image'),
  InputFileInput: component('Input/FileInput'),
  InputInput: component('Input/Input'),
  LDLink: component('LDLink'),
  Link: component('Link'),
  LinkDuo: component('LinkDuo'),
  LinkLinkLabel: component('Link/LinkLabel'),
  LinkedDetailDate: component('LinkedDetailDate'),
  Loading: component('Loading'),
  MenuItem: component('MenuItem'),
  Metadata: component('Metadata'),
  NavBarContent: component('NavBarContent'),
  NavbarLinkNavbarLinkCount: component('NavbarLink/NavbarLinkCount'),
  NavbarLinkNavbarLinkIcon: component('NavbarLink/NavbarLinkIcon'),
  NavbarLinkNavbarLinkImage: component('NavbarLink/NavbarLinkImage'),
  NavbarLinkNavbarLinkLabel: component('NavbarLink/NavbarLinkLabel'),
  NavbarLinkNavbarLinkLink: component('NavbarLink/NavbarLinkLink'),
  NetworkStatusIndicator: component('NetworkStatusIndicator'),
  Omniform: component('Omniform'),
  OmniformOmniformPreview: component('Omniform/OmniformPreview'),
  OverlayContainer: component('OverlayContainer'),
  PageHeader: component('PageHeader'),
  PageRow: component('PageRow'),
  Progress: component('Progress'),
  ResourceBoundary: component('ResourceBoundary'),
  ScrollContainer: component('ScrollContainer'),
  SearchForm: component('SearchForm'),
  SelectInputSelectInputField: component('SelectInput/SelectInputField'),
  SignInFormSignInFormLink: component('SignInForm/SignInFormLink'),
  SignOutForm: component('SignOutForm'),
  SkipNavigation: component('SkipNavigation'),
  Spinner: component('Spinner'),
  SubSection: component('SubSection'),
  UnorderedList: component('UnorderedList'),
  VerticalScroller: component('VerticalScroller'),
  VoteData: component('VoteData'),
};
