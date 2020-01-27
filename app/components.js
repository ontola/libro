import rdf, { createNS } from '@ontologies/core';
import React from 'react';

import Spinner from './components/Spinner';

export { default as AttributeListItem } from './components/AttributeListItem/index';
export { default as ActionButton } from './components/ActionButton/index';
export { default as Attachment } from './components/Attachment/index';
export { default as Button } from './components/Button/index';
export { default as BlurButton } from './components/BlurButton/index';
export { default as Breadcrumb } from './components/Breadcrumbs/Breadcrumb';
export { default as BreadcrumbsBar } from './components/Breadcrumbs/BreadcrumbsBar';
export { default as CardContent } from './components/Card/CardContent';
export { default as CardHeader } from './components/Card/CardHeader';
export { default as CollapseText } from './components/CollapseText/index';
export { default as Columns } from './components/Columns/index';
export { default as CoverImage } from './components/CoverImage/index';
export { default as Cover } from './components/Cover/index';
export { default as Detail } from './components/Detail/index';
export { default as DetailText } from './components/Detail/text';
export { default as DetailImage } from './components/Detail/image';
export { default as DetailDate } from './components/DetailDate/index';
export { default as LinkedDetailDate } from './components/LinkedDetailDate/index';
export { default as Link } from './components/Link/index';
export { default as MenuItem } from './components/MenuItem';
export { default as Error } from './components/Error/index';
export { FormSection } from './components/Form/index';
export { default as Heading } from './components/Heading/index';
export { default as Image } from './components/Image/index';
export {
  Input,
  FileInput,
} from './components/Input/index';
export { default as LDLink } from './components/LDLink/index';
export { default as HoverPopup } from './components/HoverPopup/HoverPopup';
export { default as LinkDuo } from './components/LinkDuo/index';
export {
  default as Loading,
  LoadingButton,
  LoadingCard,
  LoadingCardFixed,
  LoadingCellRow,
  LoadingCoverPhoto,
  LoadingFullResource,
  LoadingMicroRow,
  LoadingDetail,
  LoadingPage,
  LoadingParent,
  LoadingRow,
  LoadingNavbarLink,
  SuspendedLoader,
} from './components/Loading/index';
export { default as Markdown } from './components/Markdown/index';
export { default as MarkdownFixedPreview } from './components/MarkdownFixedPreview/index';
export { default as NavBarContent } from './components/NavBarContent/index';
export { default as Omniform } from './components/Omniform/index';
export { default as OmniformPreview } from './components/Omniform/OmniformPreview';
export { default as ResourceBoundary } from './components/ResourceBoundary/index';
export { default as NavbarLink } from './components/NavbarLink/index';
export {
  SignInFormCard,
  SignInFormCardRow,
} from './components/SignInForm/index';
export { default as SkipNavigation } from './components/SkipNavigation/index';
export { default as Spinner } from './components/Spinner/index';
export { default as VerticalScroller } from './components/VerticalScroller/index';

export const component = createNS('component:');

const wrap = (LazyComp) => (props) => (
  React.createElement(
    React.Suspense,
    { fallback: React.createElement(Spinner, { loading: true }) },
    React.createElement(LazyComp, props)
  )
);

export const componentMap = {
  [rdf.id(component('ActionButton'))]: wrap(React.lazy(() => import('./components/ActionButton/index'))),
  [rdf.id(component('Attachment'))]: wrap(React.lazy(() => import('./components/Attachment/index'))),
  [rdf.id(component('AttachmentPreview'))]: wrap(React.lazy(() => import('./components/AttachmentPreview/index'))),
  [rdf.id(component('AttributeListItem'))]: wrap(React.lazy(() => import('./components/AttributeListItem/index'))),
  [rdf.id(component('BlurButton'))]: wrap(React.lazy(() => import('./components/BlurButton/index'))),
  [rdf.id(component('Breadcrumbs/Breadcrumb'))]: wrap(React.lazy(() => import('./components/Breadcrumbs/Breadcrumb'))),
  [rdf.id(component('Breadcrumbs/BreadcrumbsBar'))]: wrap(React.lazy(() => import('./components/Breadcrumbs/BreadcrumbsBar'))),
  [rdf.id(component('Breadcrumbs'))]: wrap(React.lazy(() => import('./components/Breadcrumbs/index'))),
  [rdf.id(component('Button'))]: wrap(React.lazy(() => import('./components/Button/index'))),
  [rdf.id(component('ButtonWithFeedback'))]: wrap(React.lazy(() => import('./components/ButtonWithFeedback/index'))),
  [rdf.id(component('Card/CardActions'))]: wrap(React.lazy(() => import('./components/Card/CardActions'))),
  [rdf.id(component('Card/CardButton'))]: wrap(React.lazy(() => import('./components/Card/CardButton'))),
  [rdf.id(component('Card/CardContent'))]: wrap(React.lazy(() => import('./components/Card/CardContent'))),
  [rdf.id(component('Card/CardDivider'))]: wrap(React.lazy(() => import('./components/Card/CardDivider'))),
  [rdf.id(component('Card/CardHeader'))]: wrap(React.lazy(() => import('./components/Card/CardHeader'))),
  [rdf.id(component('Card/CardLink'))]: wrap(React.lazy(() => import('./components/Card/CardLink'))),
  [rdf.id(component('CheckboxesInput'))]: wrap(React.lazy(() => import('./components/CheckboxesInput/index'))),
  [rdf.id(component('CollapseText'))]: wrap(React.lazy(() => import('./components/CollapseText/index'))),
  [rdf.id(component('Collapsible'))]: wrap(React.lazy(() => import('./components/Collapsible/index'))),
  [rdf.id(component('Collection'))]: wrap(React.lazy(() => import('./components/Collection/index'))),
  [rdf.id(component('Column'))]: wrap(React.lazy(() => import('./components/Column/index'))),
  [rdf.id(component('Columns'))]: wrap(React.lazy(() => import('./components/Columns/index'))),
  [rdf.id(component('Container'))]: wrap(React.lazy(() => import('./components/Container/ContainerHeader'))),
  [rdf.id(component('CountBubble'))]: wrap(React.lazy(() => import('./components/CountBubble/index'))),
  [rdf.id(component('Cover'))]: wrap(React.lazy(() => import('./components/Cover/index'))),
  [rdf.id(component('CoverImage'))]: wrap(React.lazy(() => import('./components/CoverImage/index'))),
  [rdf.id(component('Detail/image'))]: wrap(React.lazy(() => import('./components/Detail/image'))),
  [rdf.id(component('Detail'))]: wrap(React.lazy(() => import('./components/Detail/index'))),
  [rdf.id(component('Detail/text'))]: wrap(React.lazy(() => import('./components/Detail/text'))),
  [rdf.id(component('DetailDate'))]: wrap(React.lazy(() => import('./components/DetailDate/index'))),
  [rdf.id(component('DropdownMenu'))]: wrap(React.lazy(() => import('./components/DropdownMenu/index'))),
  [rdf.id(component('Error'))]: wrap(React.lazy(() => import('./components/Error/index'))),
  [rdf.id(component('FieldLabel'))]: wrap(React.lazy(() => import('./components/FieldLabel/index'))),
  [rdf.id(component('Form/FooterImage'))]: wrap(React.lazy(() => import('./components/Form/FooterImage'))),
  [rdf.id(component('Form/FooterRight'))]: wrap(React.lazy(() => import('./components/Form/FooterRight'))),
  [rdf.id(component('Form/Form'))]: wrap(React.lazy(() => import('./components/Form/Form'))),
  [rdf.id(component('Form/FormSection'))]: wrap(React.lazy(() => import('./components/Form/FormSection'))),
  [rdf.id(component('Form'))]: wrap(React.lazy(() => import('./components/Form/index'))),
  [rdf.id(component('FormField/CharCounter'))]: wrap(React.lazy(() => import('./components/FormField/CharCounter'))),
  [rdf.id(component('FormField/FieldHelper'))]: wrap(React.lazy(() => import('./components/FormField/FieldHelper'))),
  [rdf.id(component('FormField'))]: wrap(React.lazy(() => import('./components/FormField/index'))),
  [rdf.id(component('FormField/OptionsWrapper'))]: wrap(React.lazy(() => import('./components/FormField/OptionsWrapper'))),
  [rdf.id(component('FormFieldWrapper'))]: wrap(React.lazy(() => import('./components/FormFieldWrapper/index'))),
  [rdf.id(component('Grid/GridHeader'))]: wrap(React.lazy(() => import('./components/Grid/GridHeader'))),
  [rdf.id(component('Grid/GridItem'))]: wrap(React.lazy(() => import('./components/Grid/GridItem'))),
  [rdf.id(component('Headers'))]: wrap(React.lazy(() => import('./components/Headers/DutchGovernmentHeader'))),
  [rdf.id(component('HeaderWithMenu'))]: wrap(React.lazy(() => import('./components/HeaderWithMenu/index'))),
  [rdf.id(component('Heading'))]: wrap(React.lazy(() => import('./components/Heading/index'))),
  [rdf.id(component('HoverPopup'))]: wrap(React.lazy(() => import('./components/HoverPopup/HoverPopup'))),
  [rdf.id(component('Image'))]: wrap(React.lazy(() => import('./components/Image/index'))),
  [rdf.id(component('Input/FileInput'))]: wrap(React.lazy(() => import('./components/Input/FileInput'))),
  [rdf.id(component('Input/Input'))]: wrap(React.lazy(() => import('./components/Input/Input'))),
  [rdf.id(component('LabeledAttribute'))]: wrap(React.lazy(() => import('./components/LabeledAttribute/index'))),
  [rdf.id(component('LDLink'))]: wrap(React.lazy(() => import('./components/LDLink/index'))),
  [rdf.id(component('Link'))]: wrap(React.lazy(() => import('./components/Link/index'))),
  [rdf.id(component('Link/LinkLabel'))]: wrap(React.lazy(() => import('./components/Link/LinkLabel'))),
  [rdf.id(component('LinkDuo'))]: wrap(React.lazy(() => import('./components/LinkDuo/index'))),
  [rdf.id(component('LinkedDetailDate'))]: wrap(React.lazy(() => import('./components/LinkedDetailDate/index'))),
  [rdf.id(component('Loading'))]: wrap(React.lazy(() => import('./components/Loading/index'))),
  [rdf.id(component('Markdown'))]: wrap(React.lazy(() => import('./components/Markdown/index'))),
  [rdf.id(component('MarkdownFixedPreview'))]: wrap(React.lazy(() => import('./components/MarkdownFixedPreview/index'))),
  [rdf.id(component('MenuItem'))]: wrap(React.lazy(() => import('./components/MenuItem/index'))),
  [rdf.id(component('MenuSectionLabel'))]: wrap(React.lazy(() => import('./components/MenuSectionLabel/index'))),
  [rdf.id(component('Metadata'))]: wrap(React.lazy(() => import('./components/Metadata/index'))),
  [rdf.id(component('NavBarContent'))]: wrap(React.lazy(() => import('./components/NavBarContent/index'))),
  [rdf.id(component('NavbarLink'))]: wrap(React.lazy(() => import('./components/NavbarLink/index'))),
  [rdf.id(component('NavbarLink/NavbarLinkCount'))]: wrap(React.lazy(() => import('./components/NavbarLink/NavbarLinkCount'))),
  [rdf.id(component('NavbarLink/NavbarLinkIcon'))]: wrap(React.lazy(() => import('./components/NavbarLink/NavbarLinkIcon'))),
  [rdf.id(component('NavbarLink/NavbarLinkImage'))]: wrap(React.lazy(() => import('./components/NavbarLink/NavbarLinkImage'))),
  [rdf.id(component('NavbarLink/NavbarLinkLabel'))]: wrap(React.lazy(() => import('./components/NavbarLink/NavbarLinkLabel'))),
  [rdf.id(component('NavbarLink/NavbarLinkLink'))]: wrap(React.lazy(() => import('./components/NavbarLink/NavbarLinkLink'))),
  [rdf.id(component('NavbarLink/NavbarLinkWrapper'))]: wrap(React.lazy(() => import('./components/NavbarLink/NavbarLinkWrapper'))),
  [rdf.id(component('NetworkStatusIndicator'))]: wrap(React.lazy(() => import('./components/NetworkStatusIndicator/index'))),
  [rdf.id(component('Omniform'))]: wrap(React.lazy(() => import('./components/Omniform/index'))),
  [rdf.id(component('Omniform/OmniformPreview'))]: wrap(React.lazy(() => import('./components/Omniform/OmniformPreview'))),
  [rdf.id(component('Omniform/OmniformRemoveButton'))]: wrap(React.lazy(() => import('./components/Omniform/OmniformRemoveButton'))),
  [rdf.id(component('OverlayContainer'))]: wrap(React.lazy(() => import('./components/OverlayContainer/index'))),
  [rdf.id(component('PageRow'))]: wrap(React.lazy(() => import('./components/PageRow/index'))),
  [rdf.id(component('Progress'))]: wrap(React.lazy(() => import('./components/Progress/index'))),
  [rdf.id(component('ResourceBoundary'))]: wrap(React.lazy(() => import('./components/ResourceBoundary/index'))),
  [rdf.id(component('ScrollContainer'))]: wrap(React.lazy(() => import('./components/ScrollContainer/index'))),
  [rdf.id(component('SearchForm'))]: wrap(React.lazy(() => import('./components/SearchForm/index'))),
  [rdf.id(component('SelectInput'))]: wrap(React.lazy(() => import('./components/SelectInput/index'))),
  [rdf.id(component('SelectInput/SelectInputField'))]: wrap(React.lazy(() => import('./components/SelectInput/SelectInputField'))),
  [rdf.id(component('SelectInput/SelectInputList'))]: wrap(React.lazy(() => import('./components/SelectInput/SelectInputList'))),
  [rdf.id(component('SelectInput/SelectInputWrapper'))]: wrap(React.lazy(() => import('./components/SelectInput/SelectInputWrapper'))),
  [rdf.id(component('SignInForm/SignInFormBase'))]: wrap(React.lazy(() => import('./components/SignInForm/SignInFormBase'))),
  [rdf.id(component('SignInForm/SignInFormCard'))]: wrap(React.lazy(() => import('./components/SignInForm/SignInFormCard'))),
  [rdf.id(component('SignInForm/SignInFormCardRow'))]: wrap(React.lazy(() => import('./components/SignInForm/SignInFormCardRow'))),
  [rdf.id(component('SignInForm/SignInFormHelpers'))]: wrap(React.lazy(() => import('./components/SignInForm/SignInFormHelpers'))),
  [rdf.id(component('SignInForm/SignInFormLink'))]: wrap(React.lazy(() => import('./components/SignInForm/SignInFormLink'))),
  [rdf.id(component('SignOutForm'))]: wrap(React.lazy(() => import('./components/SignOutForm/SignOutFormLink'))),
  [rdf.id(component('SkipNavigation'))]: wrap(React.lazy(() => import('./components/SkipNavigation/index'))),
  [rdf.id(component('Spinner'))]: wrap(React.lazy(() => import('./components/Spinner/index'))),
  [rdf.id(component('UnorderedList'))]: wrap(React.lazy(() => import('./components/UnorderedList/index'))),
  [rdf.id(component('VerticalScroller'))]: wrap(React.lazy(() => import('./components/VerticalScroller/index'))),
  [rdf.id(component('VoteChart'))]: wrap(React.lazy(() => import('./components/VoteChart/index'))),
  [rdf.id(component('VoteData'))]: wrap(React.lazy(() => import('./components/VoteData/index'))),
};
