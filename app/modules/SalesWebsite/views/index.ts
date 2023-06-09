import { ViewRegistrations } from '../../../Module';

import About from './About';
import AnimatedCarousel from './AnimatedCarousel';
import Block from './Block';
import BlogPage from './BlogPage';
import BlogContainer from './Blogs';
import CasePage from './CasePage';
import Cases from './Cases';
import CasesPage from './CasesPage';
import ComparisonTable from './ComparisonTable';
import ContactPage from './ContactPage';
import CTA from './CTA';
import Facet from './Facet';
import Feature from './Feature';
import FeatureBlock from './FeatureBlock';
import Features from './Features';
import SalesHeader from './Header';
import HomePage from './HomePage';
import LottieAnimation from './LottieAnimation';
import MailchimpForm from './MailchimpForm';
import PipedriveForm from './PipedriveForm';
import PricingPage from './PricingPage';
import ProcessPage from './ProcessPage';
import ProductPage from './ProductPage';
import Proposition from './Propositions';
import SellingPoint from './SellingPoint';
import StackedImages from './StackedImages';
import Step from './Step';
import Stepper from './Stepper';
import Tier from './Tier';
import TrialPage from './TrialPage';

const views: ViewRegistrations = [
  ...About,
  ...AnimatedCarousel,
  ...Block,
  ...BlogContainer,
  ...BlogPage,
  ...CTA,
  ...CasePage,
  ...Cases,
  ...CasesPage,
  ...ContactPage,
  ...ComparisonTable,
  ...Facet,
  ...Feature,
  ...FeatureBlock,
  ...Features,
  ...HomePage,
  ...LottieAnimation,
  ...MailchimpForm,
  ...PipedriveForm,
  ...PricingPage,
  ...ProcessPage,
  ...ProductPage,
  ...Proposition,
  ...Step,
  ...Stepper,
  ...SellingPoint,
  ...SalesHeader,
  ...StackedImages,
  ...Tier,
  ...TrialPage,
];

export default views;
