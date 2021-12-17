import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { ComponentRegistration } from 'link-lib';
import {
  MapDataToPropsParam,
  register,
  value,
} from 'link-redux';
import { ComponentType } from 'react';

import CompActionButton from './components/ActionButton';
import CompAttachmentPreview from './components/AttachmentPreview';
import CompAttributeListItem from './components/AttributeListItem';
import CompBlurButton from './components/BlurButton';
import CompBreadcrumbsBreadcrumb from './components/Breadcrumbs/Breadcrumb';
import CompButton from './components/Button';
import CompButtonWithFeedback from './components/ButtonWithFeedback';
import CompCardCardActions from './components/Card/CardActions';
import CompCardCardContent from './components/Card/CardContent';
import CompCardCardDivider from './components/Card/CardDivider';
import CompCardCardHeader from './components/Card/CardHeader';
import CompCollapseText from './components/CollapseText';
import CompCollapsible from './components/Collapsible';
import CompCollection from './components/Collection';
import CompCollectionProvider from './components/Collection/CollectionProvider';
import { HeaderFloat as CompHeaderFloat } from './components/Collection/HeaderFloat';
import CompColumn from './components/Column';
import CompColumns from './components/Columns';
import CompCountBubble from './components/CountBubble';
import CompCoverImage from './components/CoverImage';
import CompDetail from './components/Detail';
import CompDetailText from './components/Detail/DetailText';
import CompDetailDate from './components/DetailDate';
import CompDropdownMenu from './components/DropdownMenu/DropdownMenu';
import CompError from './components/Error';
import CompFieldLabel from './components/FieldLabel';
import CompFormFooterImage from './components/Form/FooterImage';
import CompFormFooterRight from './components/Form/FooterRight';
import CompFormFormSection from './components/Form/FormSection';
import CompFormFieldCharCounter from './components/FormField/CharCounter';
import CompFormFieldFieldHelper from './components/FormField/FieldHelper';
import CompFormField from './components/FormField/FormField';
import CompGridGridHeader from './components/Grid/GridHeader';
import CompGridGridItem from './components/Grid/GridItem';
import CompHeaderWithMenu from './components/HeaderWithMenu';
import CompHeading from './components/Heading';
import CompImage from './components/Image';
import CompCheckboxesInput from './components/Input/CheckboxesInput';
import CompInputFileInput from './components/Input/FileInput';
import CompInputInput from './components/Input/Input';
import CompLDLink from './components/LDLink';
import CompLink from './components/Link';
import CompLinkDuo from './components/LinkDuo';
import CompLinkLinkLabel from './components/Link/LinkLabel';
import CompLinkedDetailDate from './components/LinkedDetailDate';
import CompLoading from './components/Loading';
import CompMenuItem from './components/MenuItem';
import CompMenuSectionLabel from './components/MenuSectionLabel';
import CompMetadata from './components/Metadata';
import CompNavBarContent from './components/NavBarContent';
import CompNavbarLinkNavbarLinkCount from './components/NavbarLink/NavbarLinkCount';
import CompNavbarLinkNavbarLinkIcon from './components/NavbarLink/NavbarLinkIcon';
import CompNavbarLinkNavbarLinkImage from './components/NavbarLink/NavbarLinkImage';
import CompNavbarLinkNavbarLinkLabel from './components/NavbarLink/NavbarLinkLabel';
import CompNavbarLinkNavbarLinkLink from './components/NavbarLink/NavbarLinkLink';
import CompNetworkStatusIndicator from './components/NetworkStatusIndicator';
import CompOmniform from './components/Omniform';
import CompOmniformOmniformPreview from './components/Omniform/OmniformPreview';
import CompOverlayContainer from './components/OverlayContainer';
import { PageHeader as CompPageHeader } from './components/PageHeader';
import CompPageRow from './components/PageRow';
import CompProgress from './components/Progress';
import CompResourceBoundary from './components/ResourceBoundary';
import { FertileComponentVariant, createFertileComponent } from './components/RichText/FertileComponent';
import { InnerText as CompInnerText } from './components/RichText/InnerText';
import { createTypographyComponent } from './components/RichText/TypographyElements';
import CompScrollContainer from './components/ScrollContainer';
import CompSearchForm from './components/SearchForm';
import CompSignInFormSignInFormLink from './components/SignInForm/SignInFormLink';
import CompSignOutForm from './components/SignOutForm/SignOutFormLink';
import CompSkipNavigation from './components/SkipNavigation';
import CompSpinner from './components/Spinner';
import CompSubSection from './components/SubSection';
import CompUnorderedList from './components/UnorderedList';
import CompVerticalScroller from './components/VerticalScroller';
import CompVoteData from './components/VoteData';
import { component, components } from './componentsList';
import SelectInputSelectInputField from './containers/SelectInputField';
import argu from './ontology/argu';
import elements from './ontology/elements';
import ontola from './ontology/ontola';
import { allTopologies } from './topologies';

export { component, components };

const childTextMap = {
  bold: value(elements.bold),
  color: value(elements.color),
  italic: value(elements.italic),
  text: value(schema.text),
  underline: value(elements.underline),
};

const childElementMap = {
  children: elements.children,
  color: value(elements.color),
};

const childLinkMap = {
  ...childElementMap,
  href: value(ontola.href),
  trackingId: value(argu.trackingId),
};

const childLiMap = {
  ...childElementMap,
  listVariant: value(elements.variant),
};

export interface ComponentMap {
  [k: number]: [React.FC<any>, MapDataToPropsParam] | [React.FC<any>];
}

const childTypographyMap = {
  ...childElementMap,
  align: value(elements.align),
};

export const componentMap: ComponentMap = {
  [rdf.id(components.ActionButton)]: [CompActionButton],
  [rdf.id(components.AttachmentPreview)]: [CompAttachmentPreview],
  [rdf.id(components.AttributeListItem)]: [CompAttributeListItem],
  [rdf.id(components.BlurButton)]: [CompBlurButton],
  [rdf.id(components.BreadcrumbsBreadcrumb)]: [CompBreadcrumbsBreadcrumb],
  [rdf.id(components.Button)]: [CompButton, {
    action: argu.ns('action'),
    children: value(schema.text),
    icon: schema.image,
  }],
  [rdf.id(components.ButtonWithFeedback)]: [CompButtonWithFeedback],
  [rdf.id(components.CardCardActions)]: [CompCardCardActions],
  [rdf.id(components.CardCardContent)]: [CompCardCardContent],
  [rdf.id(components.CardCardDivider)]: [CompCardCardDivider],
  [rdf.id(components.CardCardHeader)]: [CompCardCardHeader],
  [rdf.id(components.CheckboxesInput)]: [CompCheckboxesInput],
  [rdf.id(components.CollapseText)]: [CompCollapseText],
  [rdf.id(components.Collapsible)]: [CompCollapsible],
  [rdf.id(components.Collection)]: [CompCollection],
  [rdf.id(components.CollectionProvider)]: [CompCollectionProvider],
  [rdf.id(components.Column)]: [CompColumn],
  [rdf.id(components.Columns)]: [CompColumns],
  [rdf.id(components.CountBubble)]: [CompCountBubble],
  [rdf.id(components.CoverImage)]: [CompCoverImage],
  [rdf.id(components.Detail)]: [CompDetail],
  [rdf.id(components.DetailDate)]: [CompDetailDate],
  [rdf.id(components.DetailText)]: [CompDetailText],
  [rdf.id(components.DropdownMenu)]: [CompDropdownMenu],

  [rdf.id(components.ElementP)]: [createTypographyComponent('body1'), childTypographyMap],
  [rdf.id(components.ElementA)]: [createFertileComponent('a'), childLinkMap],
  [rdf.id(components.ElementOl)]: [createFertileComponent('ol'), childElementMap],
  [rdf.id(components.ElementLi)]: [createFertileComponent('li'), childLiMap],
  [rdf.id(components.ElementUl)]: [createFertileComponent('ul'), childElementMap],
  [rdf.id(components.ElementH1)]: [createTypographyComponent('h1'), childTypographyMap],
  [rdf.id(components.ElementH2)]: [createTypographyComponent('h2'), childTypographyMap],
  [rdf.id(components.ElementH3)]: [createTypographyComponent('h3'), childTypographyMap],
  [rdf.id(components.ElementH4)]: [createTypographyComponent('h4'), childTypographyMap],
  [rdf.id(components.ElementH5)]: [createTypographyComponent('h5'), childTypographyMap],
  [rdf.id(components.ElementH6)]: [createTypographyComponent('h6'), childTypographyMap],
  [rdf.id(components.ElementSpan)]: [createFertileComponent('span'), childElementMap],
  [rdf.id(components.ElementNote)]: [createFertileComponent('aside', FertileComponentVariant.Note), childElementMap],
  [rdf.id(components.ElementTip)]: [createFertileComponent('aside', FertileComponentVariant.Tip), childElementMap],
  [rdf.id(components.ElementInnerText)]: [CompInnerText, childTextMap],

  [rdf.id(components.Error)]: [CompError],
  [rdf.id(components.FieldLabel)]: [CompFieldLabel],
  [rdf.id(components.FormField)]: [CompFormField],
  [rdf.id(components.FormFieldCharCounter)]: [CompFormFieldCharCounter],
  [rdf.id(components.FormFieldFieldHelper)]: [CompFormFieldFieldHelper],
  [rdf.id(components.FormFooterImage)]: [CompFormFooterImage],
  [rdf.id(components.FormFooterRight)]: [CompFormFooterRight],
  [rdf.id(components.FormFormSection)]: [CompFormFormSection],
  [rdf.id(components.GridGridHeader)]: [CompGridGridHeader],
  [rdf.id(components.GridGridItem)]: [CompGridGridItem],
  [rdf.id(components.HeaderWithMenu)]: [CompHeaderWithMenu],
  [rdf.id(components.HeaderFloat)]: [CompHeaderFloat],
  [rdf.id(components.Heading)]: [CompHeading],
  [rdf.id(components.Image)]: [CompImage],
  [rdf.id(components.InputFileInput)]: [CompInputFileInput],
  [rdf.id(components.InputInput)]: [CompInputInput],
  [rdf.id(components.LDLink)]: [CompLDLink],
  [rdf.id(components.Link)]: [CompLink],
  [rdf.id(components.LinkDuo)]: [CompLinkDuo],
  [rdf.id(components.LinkLinkLabel)]: [CompLinkLinkLabel],
  [rdf.id(components.LinkedDetailDate)]: [CompLinkedDetailDate],
  [rdf.id(components.Loading)]: [CompLoading],
  [rdf.id(components.MenuItem)]: [CompMenuItem],
  [rdf.id(components.MenuSectionLabel)]: [CompMenuSectionLabel],
  [rdf.id(components.Metadata)]: [CompMetadata],
  [rdf.id(components.NavBarContent)]: [CompNavBarContent],
  [rdf.id(components.NavbarLinkNavbarLinkCount)]: [CompNavbarLinkNavbarLinkCount],
  [rdf.id(components.NavbarLinkNavbarLinkIcon)]: [CompNavbarLinkNavbarLinkIcon],
  [rdf.id(components.NavbarLinkNavbarLinkImage)]: [CompNavbarLinkNavbarLinkImage],
  [rdf.id(components.NavbarLinkNavbarLinkLabel)]: [CompNavbarLinkNavbarLinkLabel],
  [rdf.id(components.NavbarLinkNavbarLinkLink)]: [CompNavbarLinkNavbarLinkLink],
  [rdf.id(components.NetworkStatusIndicator)]: [CompNetworkStatusIndicator],
  [rdf.id(components.Omniform)]: [CompOmniform],
  [rdf.id(components.OmniformOmniformPreview)]: [CompOmniformOmniformPreview],
  [rdf.id(components.OverlayContainer)]: [CompOverlayContainer],
  [rdf.id(components.PageHeader)]: [CompPageHeader],
  [rdf.id(components.PageRow)]: [CompPageRow],
  [rdf.id(components.Progress)]: [CompProgress],
  [rdf.id(components.ResourceBoundary)]: [CompResourceBoundary],
  [rdf.id(components.ScrollContainer)]: [CompScrollContainer],
  [rdf.id(components.SearchForm)]: [CompSearchForm],
  [rdf.id(components.SelectInputSelectInputField)]: [SelectInputSelectInputField],
  [rdf.id(components.SignInFormSignInFormLink)]: [CompSignInFormSignInFormLink],
  [rdf.id(components.SignOutForm)]: [CompSignOutForm],
  [rdf.id(components.SkipNavigation)]: [CompSkipNavigation],
  [rdf.id(components.Spinner)]: [CompSpinner],
  [rdf.id(components.SubSection)]: [CompSubSection],
  [rdf.id(components.UnorderedList)]: [CompUnorderedList],
  [rdf.id(components.VerticalScroller)]: [CompVerticalScroller],
  [rdf.id(components.VoteData)]: [CompVoteData],
};

export const componentRegistrations = (): Array<Array<ComponentRegistration<ComponentType<any>>>> => (
  Object
    .entries((componentMap))
    .map(([id, [comp, propMap]]) => {
      comp.type = rdf.fromId(id);
      comp.topology = allTopologies;
      comp.mapDataToProps = propMap;

      return register(comp);
    })
);
