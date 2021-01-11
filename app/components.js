import rdf from '@ontologies/core';

import CompActionButton from './components/ActionButton/index';
import CompAttachmentPreview from './components/AttachmentPreview';
import CompAttributeListItem from './components/AttributeListItem/index';
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
import CompCollapseText from './components/CollapseText/index';
import CompCollapsible from './components/Collapsible/index';
import CompCollection from './components/Collection/index';
import CompColumn from './components/Column/index';
import CompColumns from './components/Columns/index';
import CompContainerHeader from './components/Container/ContainerHeader';
import { HeaderFloat as CompHeaderFloat } from './views/Collection/properties/header';
import CompCountBubble from './components/CountBubble/index';
import CompCover from './components/Cover/index';
import CompCoverImage from './components/CoverImage';
import CompDetail from './components/Detail/index';
import CompDetailDate from './components/DetailDate/index';
import CompDetailImage from './components/Detail/image';
import CompDetailText from './components/Detail/text';
import CompDropdownMenu from './components/DropdownMenu';
import CompError from './components/Error/index';
import CompFieldLabel from './components/FieldLabel';
import CompFormField from './components/FormField/FormField';
import CompFormFieldCharCounter from './components/FormField/CharCounter';
import CompFormFieldFieldHelper from './components/FormField/FieldHelper';
import CompFormFooterImage from './components/Form/FooterImage';
import CompFormFooterRight from './components/Form/FooterRight';
import CompFormForm from './components/Form/Form';
import CompFormFormSection from './components/Form/FormSection';
import CompGridGridHeader from './components/Grid/GridHeader';
import CompGridGridItem from './components/Grid/GridItem';
import CompHeaderWithMenu from './components/HeaderWithMenu';
import CompHeading from './components/Heading';
import CompHoverPopup from './components/HoverPopup/HoverPopup';
import CompImage from './components/Image';
import CompInputFileInput from './components/Input/FileInput';
import CompInputInput from './components/Input/Input';
import CompLDLink from './components/LDLink';
import CompLabeledAttribute from './components/LabeledAttribute/index';
import CompLink from './components/Link';
import CompLinkDuo from './components/LinkDuo';
import CompLinkLinkLabel from './components/Link/LinkLabel';
import CompLinkedDetailDate from './components/LinkedDetailDate/index';
import CompLoading from './components/Loading';
import CompMarkdown from './components/Markdown';
import CompMenuItem from './components/MenuItem/index';
import CompMenuSectionLabel from './components/MenuSectionLabel/index';
import CompMetadata from './components/Metadata/index';
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
import CompProgress from './components/Progress/index';
import CompResourceBoundary from './components/ResourceBoundary';
import CompScrollContainer from './components/ScrollContainer/index';
import CompSearchForm from './components/SearchForm/index';
import CompSelectInputSelectInputField from './components/SelectInput/SelectInputField';
import CompSelectInputSelectInputList from './components/SelectInput/SelectInputList';
import CompSelectInputSelectInputWrapper from './components/SelectInput/SelectInputWrapper';
import CompSignInFormSignInFormLink from './components/SignInForm/SignInFormLink';
import CompSignOutForm from './components/SignOutForm/SignOutFormLink';
import CompSkipNavigation from './components/SkipNavigation/index';
import CompSpinner from './components/Spinner';
import CompUnorderedList from './components/UnorderedList/index';
import CompVerticalScroller from './components/VerticalScroller/index';
import CompVoteChart from './components/VoteChart/index';
import CompVoteData from './components/VoteData/index';
import { component, components } from './componentsList';

export { component, components };

export const componentMap = {
  [rdf.id(components.ActionButton)]: CompActionButton,
  [rdf.id(components.AttachmentPreview)]: CompAttachmentPreview,
  [rdf.id(components.AttributeListItem)]: CompAttributeListItem,
  [rdf.id(components.BlurButton)]: CompBlurButton,
  [rdf.id(components.BreadcrumbsBreadcrumb)]: CompBreadcrumbsBreadcrumb,
  [rdf.id(components.BreadcrumbsBreadcrumbsBar)]: CompBreadcrumbsBreadcrumbsBar,
  [rdf.id(components.Button)]: CompButton,
  [rdf.id(components.ButtonWithFeedback)]: CompButtonWithFeedback,
  [rdf.id(components.CardCardActions)]: CompCardCardActions,
  [rdf.id(components.CardCardButton)]: CompCardCardButton,
  [rdf.id(components.CardCardContent)]: CompCardCardContent,
  [rdf.id(components.CardCardDivider)]: CompCardCardDivider,
  [rdf.id(components.CardCardHeader)]: CompCardCardHeader,
  [rdf.id(components.CardCardLink)]: CompCardCardLink,
  [rdf.id(components.CheckboxesInput)]: CompCheckboxesInput,
  [rdf.id(components.CollapseText)]: CompCollapseText,
  [rdf.id(components.Collapsible)]: CompCollapsible,
  [rdf.id(components.Collection)]: CompCollection,
  [rdf.id(components.Column)]: CompColumn,
  [rdf.id(components.Columns)]: CompColumns,
  [rdf.id(components.ContainerHeader)]: CompContainerHeader,
  [rdf.id(components.CountBubble)]: CompCountBubble,
  [rdf.id(components.Cover)]: CompCover,
  [rdf.id(components.CoverImage)]: CompCoverImage,
  [rdf.id(components.Detail)]: CompDetail,
  [rdf.id(components.DetailDate)]: CompDetailDate,
  [rdf.id(components.DetailImage)]: CompDetailImage,
  [rdf.id(components.DetailText)]: CompDetailText,
  [rdf.id(components.DropdownMenu)]: CompDropdownMenu,
  [rdf.id(components.Error)]: CompError,
  [rdf.id(components.FieldLabel)]: CompFieldLabel,
  [rdf.id(components.FormField)]: CompFormField,
  [rdf.id(components.FormFieldCharCounter)]: CompFormFieldCharCounter,
  [rdf.id(components.FormFieldFieldHelper)]: CompFormFieldFieldHelper,
  [rdf.id(components.FormFooterImage)]: CompFormFooterImage,
  [rdf.id(components.FormFooterRight)]: CompFormFooterRight,
  [rdf.id(components.FormForm)]: CompFormForm,
  [rdf.id(components.FormFormSection)]: CompFormFormSection,
  [rdf.id(components.GridGridHeader)]: CompGridGridHeader,
  [rdf.id(components.GridGridItem)]: CompGridGridItem,
  [rdf.id(components.HeaderWithMenu)]: CompHeaderWithMenu,
  [rdf.id(components.HeaderFloat)]: CompHeaderFloat,
  [rdf.id(components.Heading)]: CompHeading,
  [rdf.id(components.HoverPopup)]: CompHoverPopup,
  [rdf.id(components.Image)]: CompImage,
  [rdf.id(components.InputFileInput)]: CompInputFileInput,
  [rdf.id(components.InputInput)]: CompInputInput,
  [rdf.id(components.LDLink)]: CompLDLink,
  [rdf.id(components.LabeledAttribute)]: CompLabeledAttribute,
  [rdf.id(components.Link)]: CompLink,
  [rdf.id(components.LinkDuo)]: CompLinkDuo,
  [rdf.id(components.LinkLinkLabel)]: CompLinkLinkLabel,
  [rdf.id(components.LinkedDetailDate)]: CompLinkedDetailDate,
  [rdf.id(components.Loading)]: CompLoading,
  [rdf.id(components.Markdown)]: CompMarkdown,
  [rdf.id(components.MenuItem)]: CompMenuItem,
  [rdf.id(components.MenuSectionLabel)]: CompMenuSectionLabel,
  [rdf.id(components.Metadata)]: CompMetadata,
  [rdf.id(components.NavBarContent)]: CompNavBarContent,
  [rdf.id(components.NavbarLinkNavbarLinkCount)]: CompNavbarLinkNavbarLinkCount,
  [rdf.id(components.NavbarLinkNavbarLinkIcon)]: CompNavbarLinkNavbarLinkIcon,
  [rdf.id(components.NavbarLinkNavbarLinkImage)]: CompNavbarLinkNavbarLinkImage,
  [rdf.id(components.NavbarLinkNavbarLinkLabel)]: CompNavbarLinkNavbarLinkLabel,
  [rdf.id(components.NavbarLinkNavbarLinkLink)]: CompNavbarLinkNavbarLinkLink,
  [rdf.id(components.NetworkStatusIndicator)]: CompNetworkStatusIndicator,
  [rdf.id(components.Omniform)]: CompOmniform,
  [rdf.id(components.OmniformOmniformPreview)]: CompOmniformOmniformPreview,
  [rdf.id(components.OverlayContainer)]: CompOverlayContainer,
  [rdf.id(components.PageRow)]: CompPageRow,
  [rdf.id(components.Progress)]: CompProgress,
  [rdf.id(components.ResourceBoundary)]: CompResourceBoundary,
  [rdf.id(components.ScrollContainer)]: CompScrollContainer,
  [rdf.id(components.SearchForm)]: CompSearchForm,
  [rdf.id(components.SelectInputSelectInputField)]: CompSelectInputSelectInputField,
  [rdf.id(components.SelectInputSelectInputList)]: CompSelectInputSelectInputList,
  [rdf.id(components.SelectInputSelectInputWrapper)]: CompSelectInputSelectInputWrapper,
  [rdf.id(components.SignInFormSignInFormLink)]: CompSignInFormSignInFormLink,
  [rdf.id(components.SignOutForm)]: CompSignOutForm,
  [rdf.id(components.SkipNavigation)]: CompSkipNavigation,
  [rdf.id(components.Spinner)]: CompSpinner,
  [rdf.id(components.UnorderedList)]: CompUnorderedList,
  [rdf.id(components.VerticalScroller)]: CompVerticalScroller,
  [rdf.id(components.VoteChart)]: CompVoteChart,
  [rdf.id(components.VoteData)]: CompVoteData,
};
