// expenseRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Expense = require('../models/Expense');

// @route   POST /api/expenses
// @desc    Add a new expense
// @access  Private
router.post('/expenses', authMiddleware, async (req, res) => {
  try {
    const { amount, category, modeOfExpense, date, description } = req.body;

    // Create new expense
    const newExpense = new Expense({
      amount,
      category,
      modeOfExpense,
      date,
      description,
      user: req.user.id // Associate expense with the logged-in user
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
