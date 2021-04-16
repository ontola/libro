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
  FeatureShowcase: sales('FeatureShowcase'),
  Features: sales('Features'),
  FunctionalitiesContainer: sales('FunctionalitiesContainer'),
  Functionality: sales('Functionality'),
  HomePage: sales('HomePage'),
  ProductPage: sales('ProductPage'),
  Proposition: sales('Proposition'),

  /* properties */
  backgroundImage: sales('backgroundImage'),
  backgroundImageMobile: sales('backgroundImageMobile'),
  blogShowcase: sales('blogShowcase'),
  blogs: sales('blogs'),
  buttonText: sales('buttonText'),
  callToActionText: sales('callToActionText'),
  callToActionTitle: sales('callToActionTitle'),
  caseButtonText: sales('caseButtonText'),
  caseShowcase: sales('caseShowcase'),
  cases: sales('cases'),
  duoBlock: sales('duoBlock'),
  featureTitle: sales('featureTitle'),
  features: sales('features'),
  functionalities: sales('functionalities'),
  functionalitiesShowcase: sales('functionalitiesShowcase'),
  productTextContent: sales('productTextContent'),
  productTextTitle: sales('productTextTitle'),
  propositions: sales('propositions'),
  showcase: sales('showcase'),
  tagline: sales('tagline'),
  textColor: sales('textColor'),
  theme: sales('theme'),
};
