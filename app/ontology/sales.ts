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
  CasesPage: sales('CasesPage'),
  ContactPage: sales('ContactPage'),
  Facet: sales('Facet'),
  FacetPage: sales('FacetPage'),
  Feature: sales('Feature'),
  Features: sales('Features'),
  HomePage: sales('HomePage'),
  MoreInformationBlock: sales('MoreInformationBlock'),
  PricingPage: sales('PricingPage'),
  ProcessPage: sales('ProcessPage'),
  ProductPage: sales('ProductPage'),
  Proposition: sales('Proposition'),
  Step: sales('Step'),
  Tier: sales('Tier'),

  /* properties */
  backgroundImage: sales('backgroundImage'),
  backgroundImageMobile: sales('backgroundImageMobile'),
  bestOffer: sales('bestOffer'),
  blogShowcase: sales('blogShowcase'),
  blogs: sales('blogs'),
  buttonLink: sales('buttonLink'),
  buttonText: sales('buttonText'),
  buttonTextTwo: sales('buttonTextTwo'),
  callToActionText: sales('callToActionText'),
  callToActionTitle: sales('callToActionTitle'),
  caseButtonLink: sales('caseButtonLink'),
  caseButtonText: sales('caseButtonText'),
  caseShowcase: sales('caseShowcase'),
  cases: sales('cases'),
  discordLink: sales('discordLink'),
  discordText: sales('discordText'),
  duoBlock: sales('duoBlock'),
  email: sales('email'),
  facets: sales('facets'),
  featureTitle: sales('featureTitle'),
  features: sales('features'),
  featuresShowcase: sales('featuresShowcase'),
  flexDirection: sales('flexDirection'),
  includes: sales('includes'),
  locality: sales('locality'),
  logo: sales('logo'),
  logoText: sales('logoText'),
  moreDescription: sales('moreDescription'),
  moreInformationBlock: sales('moreInformationBlock'),
  morePageLink: sales('morePageLink'),
  morePageName: sales('morePageName'),
  moreTitle: sales('moreTitle'),
  postalCode: sales('postalCode'),
  priceInterval: sales('priceInterval'),
  priceUnit: sales('priceUnit'),
  productTextContent: sales('productTextContent'),
  productTextTitle: sales('productTextTitle'),
  propositions: sales('propositions'),
  secondaryImage: sales('secondaryImage'),
  showcase: sales('showcase'),
  stepper: sales('stepper'),
  streetAddress: sales('streetAddress'),
  tagline: sales('tagline'),
  tel: sales('tel'),
  tertiaryImage: sales('tertiaryImage'),
  textBlock: sales('textBlock'),
  textColor: sales('textColor'),
  textTitle: sales('textTitle'),
  theme: sales('theme'),
  tiers: sales('tiers'),
  website: sales('website'),
  websiteUrl: sales('websiteUrl'),

  /* Topologies */
  // eslint-disable-next-line sort-keys
  blueBlock: sales('topologies/blueBlock'),
};
