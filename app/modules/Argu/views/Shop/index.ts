import { ViewRegistrations } from '../../../../Module';

import Cart from './Cart';
import CartDetail from './CartDetail';
import CouponBatch from './CouponBatch';
import Offer from './Offer';
import ShopFull from './ShopFull';

const views: ViewRegistrations = [
  ...Cart,
  ...CartDetail,
  ...CouponBatch,
  ...Offer,
  ...ShopFull,
];

export default views;
