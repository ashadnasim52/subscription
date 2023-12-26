const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
	email: { type: String },
	isAdmin: { type: Boolean, default: false },
	subscription: {
		razorpay_payment_id: String,
		razorpay_signature: String,
		razorpay_subscription_id: String,
		planId: { type: String },
		trialEndDate: { type: String },
		planRazorpayId: { type: String },
		subscriptionId: { type: String },
		active: { type: Boolean, default: false },
	},
	pastSubscription: [],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
