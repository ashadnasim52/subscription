const Plan = require('../model/Plan');
const User = require('../model/user');
const Razorpay = require('razorpay');
const { nanoid } = require('nanoid');

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const subscribeUser = async (req, res) => {
	const { planId } = req.body;

	try {
		const allPlans = await razorpay.plans.all();
		console.log(allPlans);
		// Assuming that the planId is provided by the frontend
		const user = await User.findById(req.user._id);
		const plan = await Plan.findById(planId);
		if (!user || !plan) {
			return res.status(404).json({ error: 'User not found' });
		}
		const trialEndDate = new Date();
		trialEndDate.setDate(trialEndDate.getDate() + 14);

		console.log({
			id: plan.planId,
			plan_id: plan.planId,
			entity: 'subscription',
			customer_notify: 1,
			total_count: 12, // Number of billing cycles
			customer_id: user._id.toString(),
		});
		const startAtUnixTimestamp = Math.floor(trialEndDate.getTime() / 1000); // Convert to seconds

		// Create a subscription on Razorpay
		const subscription = await razorpay.subscriptions.create({
			plan_id: plan.planId,
			customer_notify: 1,
			total_count: 12, // Number of billing cycles
			// customer_id: user._id.toString(),
			start_at: startAtUnixTimestamp, // Convert to seconds
		});

		// Update the user model with subscription details
		user.subscription = {
			planId,
			planRazorpayId: plan.planId,
			subscriptionId: subscription.id,
			active: false,
			trialEndDate: trialEndDate,
		};

		await user.save();

		res.json({
			subscriptionId: subscription.id,
			razorpayApiKey: process.env.RAZORPAY_KEY_ID,
		});
	} catch (error) {
		console.error('Subscription failed:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const changePlan = async (req, res) => {
	const { planId } = req.body;

	try {
		const allPlans = await razorpay.plans.all();
		console.log(allPlans);
		// Assuming that the planId is provided by the frontend
		const user = await User.findById(req.user._id);
		const plan = await Plan.findById(planId);
		if (!user || !plan) {
			return res.status(404).json({ error: 'User not found' });
		}
		const subscriptionId = user.subscription.subscriptionId;

		// Plan and other parameters to update the subscription
		const updateParams = {
			plan_id: planId, // Replace with the new plan ID
			quantity: 1, // Replace with the new quantity, if applicable
		};

		razorpay.subscriptions.update(
			subscriptionId,
			updateParams,
			(error, subscription) => {
				if (error) {
					console.error('Error updating subscription:', error);
					// Handle error
				} else {
					console.log('Subscription updated successfully:', subscription);
					// Handle success
				}
			}
		);
		// console.log({
		// 	id: plan.planId,
		// 	plan_id: plan.planId,
		// 	entity: 'subscription',
		// 	customer_notify: 1,
		// 	total_count: 12, // Number of billing cycles
		// 	customer_id: user._id.toString(),
		// });
		// // Create a subscription on Razorpay
		// const subscription = await razorpay.subscriptions.create({
		// 	plan_id: plan.planId,
		// 	customer_notify: 1,
		// 	total_count: 12, // Number of billing cycles
		// 	// customer_id: user._id.toString(),
		// 	// start_at:""
		// });

		// Update the user model with subscription details
		user.subscription = {
			planId,
			planRazorpayId: plan.planId,
			subscriptionId: subscriptionId,
			active: false,
		};

		await user.save();

		res.json({
			subscriptionId: subscriptionId,
			razorpayApiKey: process.env.RAZORPAY_KEY_ID,
		});
	} catch (error) {
		console.error('Subscription failed:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const cancelPlan = async (req, res) => {
	try {
		// const allPlans = await razorpay.plans.all();
		// console.log(allPlans);
		// Assuming that the planId is provided by the frontend

		try {
			const user = await User.findById(req.user._id);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}
			const subscriptionData = await razorpay.subscriptions.cancel(
				user.subscription.subscriptionId
			);
			console.log({ subscriptionData });
			await User.findByIdAndUpdate(req.user._id, {
				subscription: {
					active: false,
				},
				$push: {
					pastSubscription: {
						...user.subscription,
						cancelAt: new Date(),
					},
				},
			});

			return res.json({
				error: false,
				message: 'Subscription canceled',
			});
		} catch (error) {
			console.error('Error canceling subscription:', error);
			return res.status(500).json({
				error: true,
				message: 'Something went wrong. Please try again later.',
			});
		}
		// const subscriptionId = user.subscription.subscriptionId;
		// console.log({ subscriptionId });
		// razorpay.subscriptions.cancel(
		// 	subscriptionId,
		// 	async (error, subscription) => {
		// 		console.log({
		// 			error,
		// 			subscription,
		// 		});
		// 		if (error) {
		// 			console.error('Error updating subscription:', error);
		// 			return res.json({
		// 				error: true,
		// 				message: 'Something wents wrong, Please try after sometime',
		// 			});
		// 			// Handle error
		// 		} else {
		// 			console.log('Subscription updated successfully:', subscription);
		// 			await User.findByIdAndUpdate(req.user._id, {
		// 				subscription: {
		// 					active: false,
		// 				},
		// 				$push: {
		// 					pastSubscription: {
		// 						...user.subscription,
		// 						cancelAt: new Date(),
		// 					},
		// 				},
		// 			});
		// 			return res.json({
		// 				error: true,
		// 				message: 'Subscription cancelled',
		// 			});
		// 		}
		// 	}
		// );
		// console.log({
		// 	id: plan.planId,
		// 	plan_id: plan.planId,
		// 	entity: 'subscription',
		// 	customer_notify: 1,
		// 	total_count: 12, // Number of billing cycles
		// 	customer_id: user._id.toString(),
		// });
		// // Create a subscription on Razorpay
		// const subscription = await razorpay.subscriptions.create({
		// 	plan_id: plan.planId,
		// 	customer_notify: 1,
		// 	total_count: 12, // Number of billing cycles
		// 	// customer_id: user._id.toString(),
		// 	// start_at:""
		// });

		// Update the user model with subscription details
		// user.subscription = {
		// 	planId,
		// 	planRazorpayId: plan.planId,
		// 	subscriptionId: subscriptionId,
		// 	active: false,
		// };

		// await user.save();

		// res.json({
		// 	subscriptionId: subscriptionId,
		// 	razorpayApiKey: process.env.RAZORPAY_KEY_ID,
		// });
	} catch (error) {
		console.error('Subscription failed:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const handlePaymentSuccess = async (req, res) => {
	try {
		const {
			razorpay_payment_id,
			razorpay_signature,
			razorpay_subscription_id,
		} = req.body;

		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Update the user model when payment is successful
		user.subscription = {
			...user.subscription,
			razorpay_payment_id,
			razorpay_signature,
			razorpay_subscription_id,
			active: true,
		};
		await user.save();

		res.json({ success: true });
	} catch (error) {
		console.error('Failed to update subscription status:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const handlePaymentFailure = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Update the user model when payment fails
		user.subscription.active = false;
		await user.save();

		res.json({ success: true });
	} catch (error) {
		console.error('Failed to update subscription status:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	subscribeUser,
	handlePaymentSuccess,
	handlePaymentFailure,
	changePlan,
	cancelPlan,
};
