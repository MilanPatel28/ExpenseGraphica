import React from 'react'
import '../Styles/enterexpense.css'
import Navbar from './Navbar'

export default function AddExpense() {
  return (
    <>
        <Navbar />
        <div className="card">
            {/* <div id="expense-alert"></div> */}
            <label>Amount: </label>
            <input type="text" name="amount" required/>
            <br/>

            <label>Category: </label>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="categoryDropdown">
                    Select Category
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item">Food</a></li>
                    <li><a className="dropdown-item">Bills</a></li>
                    <li><a className="dropdown-item">Health</a></li>
                    <li><a className="dropdown-item">Transportation</a></li>
                    <li><a className="dropdown-item">Shopping</a></li>
                    <li><a className="dropdown-item">Entertainment</a></li>
                </ul>
            </div>
            
            {/* <input type="hidden" id="selectedCategory" name="category" required/> */}
            <br/>

            <label>Mode of expense: </label>
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline1" name="mode_of_expense" className="custom-control-input" value="Online" required/>
                <label className="custom-control-label" htmlFor="customRadioInline1">Online</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline2" name="mode_of_expense" className="custom-control-input" value="Offline" required/>
                <label className="custom-control-label" htmlFor="customRadioInline2">Cash</label>
            </div>
            <br/>

            <label>Date: </label>
            <input type="date" name="date" required/>
            <br/>

            <label>Description: </label>
            <input type="text" name="description" required/>
            <br/>

            <button type="submit" className="btn btn-success submitbtn">Add expense</button>
        </div>
    </>
  )
}
