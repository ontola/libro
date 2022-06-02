import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { ComponentRegistration } from 'link-lib';
import {
  MapDataToPropsParam,
  register,
  value,
} from 'link-redux';
import { ComponentType } from 'react';

import { component, components } from './componentsList';
import CompActionButton from './modules/Action/components/ActionButton';
import CompCountBubble from './modules/Argu/components/CountBubble';
import CompVoteData from './modules/Argu/components/VoteData';
import argu from './modules/Argu/ontology/argu';
import CompSignInFormSignInFormLink from './modules/Auth/components/SignInForm/SignInFormLink';
import CompSignOutForm from './modules/Auth/components/SignOutForm/SignOutFormLink';
import CompCollection from './modules/Collection/components';
import CompCollectionProvider from './modules/Collection/components/CollectionProvider';
import { HeaderFloat as CompHeaderFloat } from './modules/Collection/components/HeaderFloat';
import CompAttachmentPreview from './modules/Common/components/AttachmentPreview';
import CompAttributeListItem from './modules/Common/components/AttributeListItem';
import CompBlurButton from './modules/Common/components/BlurButton';
import CompBreadcrumbsBreadcrumb from './modules/Common/components/Breadcrumbs/Breadcrumb';
import CompButton from './modules/Common/components/Button';
import CompButtonWithFeedback from './modules/Common/components/ButtonWithFeedback';
import CompCardCardActions from './modules/Common/components/Card/CardActions';
import CompCardCardContent from './modules/Common/components/Card/CardContent';
import CompCardCardDivider from './modules/Common/components/Card/CardDivider';
import CompCardCardHeader from './modules/Common/components/Card/CardHeader';
import CompCollapseText from './modules/Common/components/CollapseText';
import CompCollapsible from './modules/Common/components/Collapsible';
import CompColumn from './modules/Common/components/Column';
import CompColumns from './modules/Common/components/Columns';
import CompCoverImage from './modules/Common/components/CoverImage';
import CompDetail from './modules/Common/components/Detail';
import CompDetailText from './modules/Common/components/Detail/DetailText';
import CompDetailDate from './modules/Common/components/DetailDate';
import CompError from './modules/Common/components/Error';
import CompGridGridHeader from './modules/Common/components/Grid/GridHeader';
import CompGridGridItem from './modules/Common/components/Grid/GridItem';
import CompHeaderWithMenu from './modules/Common/components/HeaderWithMenu';
import CompHeading from './modules/Common/components/Heading';
import CompImage from './modules/Common/components/Image';
import CompLDLink from './modules/Common/components/LDLink';
import CompLink from './modules/Common/components/Link';
import CompLinkLinkLabel from './modules/Common/components/Link/LinkLabel';
import CompLinkDuo from './modules/Common/components/LinkDuo';
import CompLinkedDetailDate from './modules/Common/components/LinkedDetailDate';
import CompMetadata from './modules/Common/components/Metadata';
import CompOverlayContainer from './modules/Common/components/OverlayContainer';
import { PageHeader as CompPageHeader } from './modules/Common/components/PageHeader';
import CompPageRow from './modules/Common/components/PageRow';
import CompProgress from './modules/Common/components/Progress';
import CompScrollContainer from './modules/Common/components/ScrollContainer';
import CompSearchForm from './modules/Common/components/SearchForm';
import CompSubSection from './modules/Common/components/SubSection';
import CompUnorderedList from './modules/Common/components/UnorderedList';
import CompVerticalScroller from './modules/Common/components/VerticalScroller';
import CompLoading from './modules/Common/components/Loading';
import CompSpinner from './modules/Common/components/Loading/Spinner';
import CompNetworkStatusIndicator from './modules/Common/components/NetworkStatusIndicator';
import CompResourceBoundary from './modules/Common/components/ResourceBoundary';
import CompSkipNavigation from './modules/Common/components/SkipNavigation';
import ontola from './modules/Kernel/ontology/ontola';
import { FertileComponentVariant, createFertileComponent } from './modules/Elements/components/FertileComponent';
import { InnerText as CompInnerText } from './modules/Elements/components/InnerText';
import { createTypographyComponent } from './modules/Elements/components/TypographyElements';
import elements from './modules/Elements/ontology/elements';
import CompFieldLabel from './modules/Form/components/FieldLabel';
import CompFormFooterImage from './modules/Form/components/Form/FooterImage';
import CompFormFooterRight from './modules/Form/components/Form/FooterRight';
import CompFormFormSection from './modules/Form/components/Form/FormSection';
import CompFormFieldCharCounter from './modules/Form/components/FormField/CharCounter';
import CompFormFieldFieldHelper from './modules/Form/components/FormField/FieldHelper';
import CompFormField from './modules/Form/components/FormField/FormField';
import CompCheckboxesInput from './modules/Form/components/Input/CheckboxesInput';
import CompInputFileInput from './modules/Form/components/Input/FileInput';
import CompInputInput from './modules/Form/components/Input/Input';
import SelectInputSelectInputField from './modules/Form/components/SelectInputField';
import CompDropdownMenu from './modules/Menu/components/DropdownMenu/DropdownMenu';
import CompMenuItem from './modules/Menu/components/MenuItem';
import CompNavBarContent from './modules/NavBar/components/NavBarContent';
import CompNavbarLinkNavbarLinkCount from './modules/NavBar/components/NavbarLink/NavbarLinkCount';
import CompNavbarLinkNavbarLinkIcon from './modules/NavBar/components/NavbarLink/NavbarLinkIcon';
import CompNavbarLinkNavbarLinkImage from './modules/NavBar/components/NavbarLink/NavbarLinkImage';
import CompNavbarLinkNavbarLinkLabel from './modules/NavBar/components/NavbarLink/NavbarLinkLabel';
import CompNavbarLinkNavbarLinkLink from './modules/NavBar/components/NavbarLink/NavbarLinkLink';
import CompOmniform from './modules/Omniform/components/Omniform';
import CompOmniformOmniformPreview from './modules/Omniform/components/OmniformPreview';
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
    children: elements.children,
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
  [rdf.id(components.ElementLic)]: [createFertileComponent('span'), childElementMap],
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
