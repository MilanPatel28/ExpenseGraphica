// expenseRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Expense = require('../models/Expense');

// @route   GET /api/expenses
// @desc    Get all expenses
// @access  Private
router.get('/expenses', authMiddleware, async (req, res) => {
  try {
    // Get expenses for the authenticated user
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send('Server Error');
  }
});

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

router.put('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, category, modeOfExpense, date, description } = req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, modeOfExpense, date, description },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
