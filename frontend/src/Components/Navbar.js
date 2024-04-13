import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/navbar.css'

export default function Navbar() {
    return (
        <>
            <div>
                <div id="nav-bar">
                    <div id="nav-header">
                        <Link id="nav-title" to="/home">ExpenseGraphica</Link>
                        <hr />
                    </div>
                    <div id="nav-content">
                        <Link to="/add-expense">
                            <div className="nav-button"><i className="bi bi-plus-square"></i><span>Add Expense</span></div>
                        </Link>
                        <Link to="/statement">
                            <div className="nav-button"><i className="bi bi-cash"></i><span>Statement</span></div>
                        </Link>
                        <Link to="/detailed-report">
                            <div className="nav-button"><i className="bi bi-bar-chart-line-fill"></i><span>Detailed Report</span></div>
                        </Link>
                        <Link to="/">
                            <div className="nav-button"><i className="bi bi-box-arrow-left"></i><span>Log Out</span></div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
