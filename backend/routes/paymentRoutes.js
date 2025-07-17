import express from 'express';

import { isAuthenticatedUser } from '../middlewares/authMiddlware.js';
import {
  stripeCheckoutSession,
  // stripeWebhook,
} from '../controllers/paymentControllers.js';

const router = express.Router();

router
  .route('/payment/checkout_session')
  .post(isAuthenticatedUser, stripeCheckoutSession);

// router.route('/payment/webhook').post(stripeWebhook);

export default router;
