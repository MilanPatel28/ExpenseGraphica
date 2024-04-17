import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import EditExpenseModal from './EditExpenseModal';

export default function StatementPage() {
  const [expenses, setExpenses] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('x-auth-token');
      const response = await fetch('http://localhost:5000/expenses', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${token}`
        }
      });
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/expenses/${id}`, {
        method: 'DELETE'
      });
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (expense) => {
    console.log("i m in edit button expense");
    setSelectedExpense(expense);
    setEditModalOpen(true);
    console.log(expense);
  };

  const handleSaveEdit = (editedExpense) => {
    // Update the expense in local state
    const updatedExpenses = expenses.map(expense =>
      expense._id === editedExpense._id ? editedExpense : expense
    );
    setExpenses(updatedExpenses);

    // Send a request to update the expense on the server
    // You need to implement this part according to your backend API
    // For example:
    fetch(`http://localhost:5000/expenses/${editedExpense._id}`, {
      method: 'PUT',
      body: JSON.stringify(editedExpense),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // Handle response
    }).catch(error => {
      console.error('Error updating expense:', error);
    });

    setEditModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Expense List</h1>
        <ul>
          {expenses.map(expense => (
            <li key={expense._id}>
              <div>
                <p>Amount: {expense.amount}</p>
                <p>Category: {expense.category}</p>
                <p>Mode of Expense: {expense.modeOfExpense}</p>
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p>Description: {expense.description}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(expense)}>Edit</button>
                <button onClick={() => handleDelete(expense._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {editModalOpen && (
        <EditExpenseModal
          expense={selectedExpense}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}
