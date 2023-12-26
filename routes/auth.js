const express = require('express');
const router = express.Router();
const authController = require('.././controller/auth');

const { body, validationResult } = require('express-validator');

//      @type       GET
//      @route      /api/v1/auth/test
//      @desc       FOR TEST
//      @access     PUBLIC
router.get('/test', (req, res) => {
	return res.json({
		error: false,
		message: 'everthing wents ok',
	});
});

router.post(
	'/signin',
	[
		body('email').isEmail().trim().exists().withMessage('Email is Required'),

		body('password')
			.exists()
			.trim()
			.isLength({ min: 6 })
			.withMessage('password should have to be atleast 6 char long'),
	],
	authController.signIn
);

router.post(
	'/signup',
	[
		body('email').trim().exists().isEmail().withMessage('Email is Required'),
		body('password').trim().exists().withMessage('Password is Required'),
		body('userName').trim().exists().withMessage('User Name is Required'),
	],
	authController.signUp
);

module.exports = router;
