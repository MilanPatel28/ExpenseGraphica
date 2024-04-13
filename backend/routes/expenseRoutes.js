const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Expense = require('../models/Expense');

// @route   GET /expenses
// @desc    Get all expenses
// @access  Private
router.get('/expenses', authMiddleware, async (req, res) => {
  try {
    // Get expenses for the authenticated user
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /expenses
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

// @route   PUT /expenses/:id
// @desc    Update an existing expense
// @access  Private
router.put('/expenses/:id', authMiddleware, async (req, res) => {
  try {
    const { amount, category, modeOfExpense, date, description } = req.body;

    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Check if the logged-in user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update expense fields
    expense.amount = amount;
    expense.category = category;
    expense.modeOfExpense = modeOfExpense;
    expense.date = date;
    expense.description = description;

    await expense.save();

    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
