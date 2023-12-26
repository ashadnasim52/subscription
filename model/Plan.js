// models/plan.js

const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
	planId: { type: String, required: true, unique: true },
	planName: { type: String, required: true },
	description: { type: String },
	amount: { type: Number, required: true },
	interval: { type: String, default: 'monthly' },
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
