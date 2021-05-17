import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { ComponentRegistration } from 'link-lib';
import {
  FC,
  MapDataToPropsParam,
  register,
  value,
} from 'link-redux';
import { ComponentType } from 'react';

import { createTypographyComponent } from './components/RichText/TypographyElements';
import CompActionButton from './components/ActionButton';
import CompAttachmentPreview from './components/AttachmentPreview';
import CompAttributeListItem from './components/AttributeListItem';
import CompBlurButton from './components/BlurButton';
import CompBreadcrumbsBreadcrumb from './components/Breadcrumbs/Breadcrumb';
import CompBreadcrumbsBreadcrumbsBar from './components/Breadcrumbs/BreadcrumbsBar';
import CompButton from './components/Button';
import CompButtonWithFeedback from './components/ButtonWithFeedback';
import CompCardCardActions from './components/Card/CardActions';
import CompCardCardButton from './components/Card/CardButton';
import CompCardCardContent from './components/Card/CardContent';
import CompCardCardDivider from './components/Card/CardDivider';
import CompCardCardHeader from './components/Card/CardHeader';
import CompCardCardLink from './components/Card/CardLink';
import CompCheckboxesInput from './components/Input/CheckboxesInput';
import CompCollapseText from './components/CollapseText';
import CompCollapsible from './components/Collapsible';
import CompCollection from './components/Collection';
import CompColumn from './components/Column/index';
import CompColumns from './components/Columns/index';
import CompContainerHeader from './components/Container/ContainerHeader';
import SelectInputSelectInputField from './containers/SelectInputField';
import { HeaderFloat as CompHeaderFloat } from './views/Collection/properties/header';
import CompCountBubble from './components/CountBubble/index';
import CompCoverImage from './components/CoverImage';
import CompDetail from './components/Detail';
import CompDetailDate from './components/DetailDate';
import CompDetailText from './components/Detail/DetailText';
import CompDropdownMenu from './components/DropdownMenu';
import CompError from './components/Error/index';
import CompFieldLabel from './components/FieldLabel';
import CompFormField from './components/FormField/FormField';
import CompFormFieldCharCounter from './components/FormField/CharCounter';
import CompFormFieldFieldHelper from './components/FormField/FieldHelper';
import CompFormFooterImage from './components/Form/FooterImage';
import CompFormFooterRight from './components/Form/FooterRight';
import CompFormFormSection from './components/Form/FormSection';
import CompGridGridHeader from './components/Grid/GridHeader';
import CompGridGridItem from './components/Grid/GridItem';
import CompHeaderWithMenu from './components/HeaderWithMenu';
import CompHeading from './components/Heading';
import CompImage from './components/Image';
import { FertileComponentVariant, createFertileComponent } from './components/RichText/FertileComponent';
import { InnerText as CompInnerText } from './components/RichText/InnerText';
import CompInputFileInput from './components/Input/FileInput';
import CompInputInput from './components/Input/Input';
import CompLDLink from './components/LDLink';
import CompLink from './components/Link';
import CompLinkDuo from './components/LinkDuo';
import CompLinkLinkLabel from './components/Link/LinkLabel';
import CompLinkedDetailDate from './components/LinkedDetailDate';
import CompLoading from './components/Loading';
import CompMarkdown from './components/Markdown';
import CompMenuItem from './components/MenuItem';
import CompMenuSectionLabel from './components/MenuSectionLabel/index';
import CompMetadata from './components/Metadata';
import CompNavBarContent from './components/NavBarContent/index';
import CompNavbarLinkNavbarLinkCount from './components/NavbarLink/NavbarLinkCount';
import CompNavbarLinkNavbarLinkIcon from './components/NavbarLink/NavbarLinkIcon';
import CompNavbarLinkNavbarLinkImage from './components/NavbarLink/NavbarLinkImage';
import CompNavbarLinkNavbarLinkLabel from './components/NavbarLink/NavbarLinkLabel';
import CompNavbarLinkNavbarLinkLink from './components/NavbarLink/NavbarLinkLink';
import CompNetworkStatusIndicator from './components/NetworkStatusIndicator/index';
import CompOmniform from './components/Omniform/index';
import CompOmniformOmniformPreview from './components/Omniform/OmniformPreview';
import CompOverlayContainer from './components/OverlayContainer';
import CompPageRow from './components/PageRow/index';
import CompProgress from './components/Progress';
import CompResourceBoundary from './components/ResourceBoundary';
import CompScrollContainer from './components/ScrollContainer/index';
import CompSearchForm from './components/SearchForm';
import CompSignInFormSignInFormLink from './components/SignInForm/SignInFormLink';
import CompSignOutForm from './components/SignOutForm/SignOutFormLink';
import CompSkipNavigation from './components/SkipNavigation/index';
import CompSpinner from './components/Spinner';
import CompUnorderedList from './components/UnorderedList/index';
import CompVerticalScroller from './components/VerticalScroller';
import CompVoteData from './components/VoteData/index';
import { component, components } from './componentsList';
import argu from './ontology/argu';
import { allTopologies } from './topologies';
import ontola from './ontology/ontola';
import elements from './ontology/elements';

export { component, components };

const childTextMap = {
  bold: value(elements.bold),
  italic: value(elements.italic),
  text: value(schema.text),
  underline: value(elements.underline),
};

const childElementMap = {
  children: elements.children,
};

const childLinkMap = {
  ...childElementMap,
  href: value(ontola.href),
};

export interface ComponentMap {
  [k: number]: [FC, MapDataToPropsParam] | [FC];
}

export const componentMap = {
  [rdf.id(components.ActionButton)]: [CompActionButton],
  [rdf.id(components.AttachmentPreview)]: [CompAttachmentPreview],
  [rdf.id(components.AttributeListItem)]: [CompAttributeListItem],
  [rdf.id(components.BlurButton)]: [CompBlurButton],
  [rdf.id(components.BreadcrumbsBreadcrumb)]: [CompBreadcrumbsBreadcrumb],
  [rdf.id(components.BreadcrumbsBreadcrumbsBar)]: [CompBreadcrumbsBreadcrumbsBar],
  [rdf.id(components.Button)]: [CompButton, {
    action: argu.ns('action'),
    children: value(schema.text),
    icon: schema.image,
  }],
  [rdf.id(components.ButtonWithFeedback)]: [CompButtonWithFeedback],
  [rdf.id(components.CardCardActions)]: [CompCardCardActions],
  [rdf.id(components.CardCardButton)]: [CompCardCardButton],
  [rdf.id(components.CardCardContent)]: [CompCardCardContent],
  [rdf.id(components.CardCardDivider)]: [CompCardCardDivider],
  [rdf.id(components.CardCardHeader)]: [CompCardCardHeader],
  [rdf.id(components.CardCardLink)]: [CompCardCardLink],
  [rdf.id(components.CheckboxesInput)]: [CompCheckboxesInput],
  [rdf.id(components.CollapseText)]: [CompCollapseText],
  [rdf.id(components.Collapsible)]: [CompCollapsible],
  [rdf.id(components.Collection)]: [CompCollection],
  [rdf.id(components.Column)]: [CompColumn],
  [rdf.id(components.Columns)]: [CompColumns],
  [rdf.id(components.ContainerHeader)]: [CompContainerHeader],
  [rdf.id(components.CountBubble)]: [CompCountBubble],
  [rdf.id(components.CoverImage)]: [CompCoverImage],
  [rdf.id(components.Detail)]: [CompDetail],
  [rdf.id(components.DetailDate)]: [CompDetailDate],
  [rdf.id(components.DetailText)]: [CompDetailText],
  [rdf.id(components.DropdownMenu)]: [CompDropdownMenu],

  [rdf.id(components.ElementP)]: [createTypographyComponent('body1'), childElementMap],
  [rdf.id(components.ElementA)]: [createFertileComponent('a'), childLinkMap],
  [rdf.id(components.ElementOl)]: [createFertileComponent('ol'), childElementMap],
  [rdf.id(components.ElementLi)]: [createFertileComponent('li'), childElementMap],
  [rdf.id(components.ElementUl)]: [createFertileComponent('ul'), childElementMap],
  [rdf.id(components.ElementH1)]: [createTypographyComponent('h1'), childElementMap],
  [rdf.id(components.ElementH2)]: [createTypographyComponent('h2'), childElementMap],
  [rdf.id(components.ElementH3)]: [createTypographyComponent('h3'), childElementMap],
  [rdf.id(components.ElementH4)]: [createTypographyComponent('h4'), childElementMap],
  [rdf.id(components.ElementH5)]: [createTypographyComponent('h5'), childElementMap],
  [rdf.id(components.ElementH6)]: [createTypographyComponent('h6'), childElementMap],
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
  [rdf.id(components.Markdown)]: [CompMarkdown],
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
  [rdf.id(components.UnorderedList)]: [CompUnorderedList],
  [rdf.id(components.VerticalScroller)]: [CompVerticalScroller],
  [rdf.id(components.VoteData)]: [CompVoteData],
};

export const componentRegistrations = (): Array<Array<ComponentRegistration<ComponentType<any>>>> => (
  Object
    .entries((componentMap as unknown as ComponentMap))
    .map(([id, [comp, propMap]]) => {
      comp.type = rdf.fromId(id);
      comp.topology = allTopologies;
      comp.mapDataToProps = propMap;

      return register(comp);
    })
);
