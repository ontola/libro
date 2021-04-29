import { createNS } from '@ontologies/core';

const sales = createNS('https://argu.co/ns/sales#');

export default {
  ns: sales,

  /* classes */
  // eslint-disable-next-line sort-keys
  Block: sales('Block'),
  /** A page containing a blogpost. */
  BlogPage: sales('BlogPage'),
  /** Collection of BlogPage.  */
  Blogs: sales('Blogs'),
  /** A page describing a case. */
  CasePage: sales('CasePage'),
  /** Collection of CasePage.  */
  Cases: sales('Cases'),
  Feature: sales('Feature'),
  Features: sales('Features'),
  FeaturesContainer: sales('FeaturesContainer'),
  Functionality: sales('Functionality'),
  HomePage: sales('HomePage'),
  MoreInformationBlock: sales('MoreInformationBlock'),
  ProcessPage: sales('ProcessPage'),
  ProductPage: sales('ProductPage'),
  ProductPropositionBlock: sales('ProductPropositionBlock'),
  Proposition: sales('Proposition'),
  Step: sales('Step'),

  /* properties */
  backgroundImage: sales('backgroundImage'),
  backgroundImageMobile: sales('backgroundImageMobile'),
  blogShowcase: sales('blogShowcase'),
  blogs: sales('blogs'),
  buttonText: sales('buttonText'),
  buttonTextTwo: sales('buttonTextTwo'),
  callToActionText: sales('callToActionText'),
  callToActionTitle: sales('callToActionTitle'),
  caseButtonText: sales('caseButtonText'),
  caseShowcase: sales('caseShowcase'),
  cases: sales('cases'),
  duoBlock: sales('duoBlock'),
  featureTitle: sales('featureTitle'),
  features: sales('features'),
  featuresShowcase: sales('featuresShowcase'),
  moreInformationBlock: sales('moreInformationBlock'),
  productOfferSubtitle: sales('productOfferSubtitle'),
  productOfferSubtitleText: sales('productOfferSubtitleText'),
  productOfferSubtitleTwo: sales('productOfferSubtitleTwo'),
  productOfferTitle: sales('productOfferTitle'),
  productPageBlogSection: sales('productPageBlogSection'),
  productTextContent: sales('productTextContent'),
  productTextTitle: sales('productTextTitle'),
  propositions: sales('propositions'),
  showcase: sales('showcase'),
  stepper: sales('stepper'),
  tagline: sales('tagline'),
  textBlock: sales('textBlock'),
  textColor: sales('textColor'),
  textTitle: sales('textTitle'),
  theme: sales('theme'),
};
