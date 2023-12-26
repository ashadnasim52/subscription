// routes/planRoutes.js

const express = require('express');
const planController = require('../controller/planController');

const router = express.Router();

router.get('/', planController.getAllPlans);
router.get('/users', planController.getAllUsers);
router.get('/:id', planController.getPlanById);
router.post('/', planController.createPlan);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

module.exports = router;
