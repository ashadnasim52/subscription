const express = require('express');
const passport = require('passport');
const userController = require('../controller/userController');
const Plan = require('../model/Plan');
const User = require('../model/user');

const router = express.Router();
router.get('/plans', async (req, res) => {
	try {
		const plans = await Plan.find();
		return res.json({
			error: false,
			message: 'Plans',
			payload: plans,
		});
	} catch (error) {
		console.error('Error fetching plans:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
router.get(
	'/self',
	passport.authenticate('user-rule', { session: false }),
	async (req, res) => {
		try {
			const user = await User.findOne({
				_id: req.user._id,
			});
			return res.json({
				error: false,
				message: 'Plans',
				payload: user,
			});
		} catch (error) {
			console.error('Error fetching plans:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);
router.post(
	'/subscribe',
	passport.authenticate('user-rule', { session: false }),
	userController.subscribeUser
);
router.post(
	'/change-plan',
	passport.authenticate('user-rule', { session: false }),
	userController.changePlan
);
router.post(
	'/cancel',
	passport.authenticate('user-rule', { session: false }),
	userController.cancelPlan
);
router.post(
	'/payment-success',
	passport.authenticate('user-rule', { session: false }),
	userController.handlePaymentSuccess
);
router.post(
	'/payment-failure',
	passport.authenticate('user-rule', { session: false }),
	userController.handlePaymentFailure
);

module.exports = router;
