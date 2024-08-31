import React from 'react'
import Navbar from './Navbar'
import ColumnChart from './ColumnChart'
import DonutChart from './DonutChart'
import Heading from './Heading'
import styles from '../Styles/detailedreport.module.css'
export default function DetailedReport() {
  return (
    <>
    <div>
      <Navbar />
      <Heading text="Detailed Report" />
      <div className={styles.div1} >
        <h3>Month-wise Expenses</h3>
        <ColumnChart/>
      </div>
      <div className={styles.div2} >
        <h3>Category-wise Expenses</h3>
        <DonutChart/>
      </div>
    </div>
    </>
  )
}
