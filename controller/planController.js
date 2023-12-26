// controllers/planController.js

const Razorpay = require('razorpay');
const { nanoid } = require('nanoid');
const Plan = require('../model/Plan');
const User = require('../model/user');

const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const getAllPlans = async (req, res) => {
	try {
		const plans = await Plan.find();
		res.json(plans);
	} catch (error) {
		console.error('Error fetching plans:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
const getAllUsers = async (req, res) => {
	try {
		const plans = await User.find({
			isAdmin: false,
		});
		res.json(plans);
	} catch (error) {
		console.error('Error fetching plans:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getPlanById = async (req, res) => {
	const { id } = req.params;

	try {
		const plan = await Plan.findById(id);
		if (!plan) {
			return res.status(404).json({ error: 'Plan not found' });
		}

		res.json(plan);
	} catch (error) {
		console.error('Error fetching plan by ID:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const createPlan = async (req, res) => {
	try {
		const { planId, planName, description, amount, interval } = req.body;

		// const planOptions = {
		// 	id: planId,
		// 	period: interval || 'monthly',
		// 	interval: 1,
		// 	item: {
		// 		name: planName,
		// 		description: description || '', // You can include a description if available
		// 		amount: amount * 100,
		// 		currency: 'INR',
		// 	},
		// };
		// console.log(planOptions);

		// const razorpayPlan = await razorpay.subscriptions.create(planOptions);
		// console.log({
		// 	planName,
		// 	description,
		// 	amount,
		// 	interval,
		// 	razorpayPlanId: razorpayPlan.id,
		// });
		const newPlan = new Plan({
			planId, // Generate a unique planId
			planName,
			description,
			amount,
			interval,
			// razorpayPlanId: razorpayPlan.id,
		});

		await newPlan.save();

		res.json({ success: true, plan: newPlan });
	} catch (error) {
		console.error('Error creating plan:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const updatePlan = async (req, res) => {
	const { id } = req.params;
	const { name, amount, description } = req.body;

	try {
		const plan = await Plan.findById(id);
		if (!plan) {
			return res.status(404).json({ error: 'Plan not found' });
		}

		plan.name = name || plan.name;
		plan.amount = amount || plan.amount;
		plan.description = description || plan.description;

		await plan.save();

		res.json(plan);
	} catch (error) {
		console.error('Error updating plan:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const deletePlan = async (req, res) => {
	const { id } = req.params;

	try {
		const plan = await Plan.findByIdAndDelete(id);
		if (!plan) {
			return res.status(404).json({ error: 'Plan not found' });
		}

		res.json({ success: true });
	} catch (error) {
		console.error('Error deleting plan:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	getAllPlans,
	getPlanById,
	createPlan,
	updatePlan,
	deletePlan,
	getAllUsers,
};
