import { createNS } from '@ontologies/core';

const sales = createNS('https://argu.co/ns/sales#');

export default {
  ns: sales,

  /* classes */
  // eslint-disable-next-line sort-keys
  AboutPage: sales('AboutPage'),
  AnimatedCarousel: sales('AnimatedCarousel'),
  Block: sales('Block'),
  /** A page containing a blogpost. */
  BlogPage: sales('BlogPage'),
  /** Collection of BlogPage.  */
  Blogs: sales('Blogs'),
  CallToActionBlock: sales('CallToActionBlock'),
  CallToActionButton: sales('CallToActionButton'),
  /** A page describing a case. */
  CasePage: sales('CasePage'),
  /** Collection of CasePage.  */
  Cases: sales('Cases'),
  CasesPage: sales('CasesPage'),
  ComparisonTable: sales('ComparisonTable'),
  ComparisonTableGroup: sales('ComparisonTableGroup'),
  ComparisonTableItem: sales('ComparisonTableItem'),
  ContactPage: sales('ContactPage'),
  Facet: sales('Facet'),
  FacetPage: sales('FacetPage'),
  Feature: sales('Feature'),
  FeatureBlock: sales('FeatureBlock'),
  Features: sales('Features'),
  Header: sales('Header'),
  HomePage: sales('HomePage'),
  MailchimpForm: sales('MailchimpForm'),
  MoreInformationBlock: sales('MoreInformationBlock'),
  MoreInformationBlockSection: sales('MoreInformationBlockSection'),
  PipedriveForm: sales('PipedriveForm'),
  Price: sales('Price'),
  PricingPage: sales('PricingPage'),
  ProcessPage: sales('ProcessPage'),
  ProductPage: sales('ProductPage'),
  Proposition: sales('Proposition'),
  SellingPoint: sales('SellingPoint'),
  StackedImages: sales('StackedImages'),
  Step: sales('Step'),
  Team: sales('Team'),
  Tier: sales('Tier'),
  TrialPage: sales('TrialPage'),
  Values: sales('values'),

  /* properties */
  animationLength: sales('animationLength'),
  animationSplit: sales('animationSplit'),
  approximateHeight: sales('approximateHeight'),
  backgroundImage: sales('backgroundImage'),
  backgroundImageMobile: sales('backgroundImageMobile'),
  backgroundImageXL: sales('backgroundImageXL'),
  bestOffer: sales('bestOffer'),
  blogShowcase: sales('blogShowcase'),
  blogs: sales('blogs'),
  buttonLink: sales('buttonLink'),
  buttonText: sales('buttonText'),
  buttonTextTwo: sales('buttonTextTwo'),
  callToAction: sales('callToAction'),
  callToActionBackgroundImage: sales('callToActionBackgroundImage'),
  callToActionBlock: sales('callToActionBlock'),
  callToActionText: sales('callToActionText'),
  callToActionTitle: sales('callToActionTitle'),
  caseButtonLink: sales('caseButtonLink'),
  caseButtonText: sales('caseButtonText'),
  caseShowcase: sales('caseShowcase'),
  cases: sales('cases'),
  direction: sales('direction'),
  discordLink: sales('discordLink'),
  discordText: sales('discordText'),
  duoBlock: sales('duoBlock'),
  email: sales('email'),
  facets: sales('facets'),
  featureBlockText: sales('featureBlockText'),
  featureTitle: sales('featureTitle'),
  features: sales('features'),
  featuresShowcase: sales('featuresShowcase'),
  flexDirection: sales('flexDirection'),
  header: sales('header'),
  includes: sales('includes'),
  locality: sales('locality'),
  logo: sales('logo'),
  logoText: sales('logoText'),
  moreDescription: sales('moreDescription'),
  moreInformationBlock: sales('moreInformationBlock'),
  morePageLink: sales('morePageLink'),
  morePageName: sales('morePageName'),
  moreTitle: sales('moreTitle'),
  pipedriveForm: sales('pipedriveForm'),
  postalCode: sales('postalCode'),
  priceMonthly: sales('priceMonthly'),
  priceStatic: sales('pricingStatic'),
  priceYearly: sales('priceYearly'),
  productText: sales('productText'),
  propositions: sales('propositions'),
  secondaryImage: sales('secondaryImage'),
  sections: sales('sections'),
  showcase: sales('showcase'),
  stepper: sales('stepper'),
  streetAddress: sales('streetAddress'),
  table: sales('table'),
  tagline: sales('tagline'),
  teamMembers: sales('teamMembers'),
  tel: sales('tel'),
  tertiaryImage: sales('tertiaryImage'),
  textBlock: sales('textBlock'),
  textColor: sales('textColor'),
  textTitle: sales('textTitle'),
  theme: sales('theme'),
  tiers: sales('tiers'),
  values: sales('values'),
  website: sales('website'),
  websiteUrl: sales('websiteUrl'),

  /* Topologies */
  // eslint-disable-next-line sort-keys
  blueBlock: sales('topologies/blueBlock'),
};