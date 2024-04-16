import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../Styles/enterexpense.css';

const AddExpense = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        modeOfExpense: '',
        date: '',
        description: '',
        user: ''
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setFormData({ ...formData, category });
    };

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('x-auth-token'); // Assuming your token is stored as 'token' in localStorage
            const headers = {
                'Content-Type': 'application/json',
                'x-auth-token': token
            };

            await axios.post('http://localhost:5000/expenses', formData, { headers }); // Update the URL with the correct backend address
            // Clear form fields or show success message
            setFormData({
                amount: '',
                category: '',
                modeOfExpense: '',
                date: '',
                description: ''
            });
            setShowAlert(true); // Show alert
            setTimeout(() => {
                setShowAlert(false); // Hide alert after 2 seconds
            }, 2000);
            // alert('Expense added successfully!');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="expense-card">
                <div id="expense-alert">
                    {showAlert && ( // Display alert if showAlert is true
                        <div className="alert alert-success" role="alert">
                            Expense added successfully!
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Amount: </label>
                    <br />
                    <input type="text" name="amount" value={formData.amount} onChange={handleChange} required />
                    <br /><br />
                    <label>Category: </label>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="categoryDropdown">
                            {selectedCategory || "Select Category"}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => handleCategorySelect("Food")}>Food</a></li>
                            <li><a className="dropdown-item" onClick={() => handleCategorySelect("Bills")}>Bills</a></li>
                            <li><a className="dropdown-item" onClick={() => handleCategorySelect("Health")}>Health</a></li>
                            <li><a className="dropdown-item" onClick={() => handleCategorySelect("Transportation")}>Transportation</a></li>
                            <li><a className="dropdown-item" onClick={() => handleCategorySelect("Shopping")}>Shopping</a></li>
                            <li><a className="dropdown-item" onClick={() => handleCategorySelect("Entertainment")}>Entertainment</a></li>
                        </ul>
                    </div>
                    <br />
                    <label>Mode of expense: </label>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline1" name="modeOfExpense" className="custom-control-input" value="Online" onChange={handleChange} required />
                        <label className="custom-control-label" htmlFor="customRadioInline1">Online</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline2" name="modeOfExpense" className="custom-control-input" value="Cash" onChange={handleChange} required />
                        <label className="custom-control-label" htmlFor="customRadioInline2">Cash</label>
                    </div>
                    <br />

                    <label>Date: </label>
                    <br />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    <br /><br />

                    <label>Description: </label>
                    <br />
                    <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                    <br /><br />

                    <button type="submit" className="btn btn-success submitbtn">Add expense</button>
                </form>
            </div>
        </>
    );
}
export default AddExpense;