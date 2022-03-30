import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgets , UNCATEGORIZED_BUDGET_ID } from '../Contexts/BudgetContext'

function UncategorizedBudgetCard(props) {

    const {getBudgetExpense} = useBudgets() 
    const amount = getBudgetExpense(UNCATEGORIZED_BUDGET_ID).reduce(
        (total , expense) => (total + expense.amount) , 0
    )
    if (amount === 0 ) return null
    return (
        <BudgetCard 
            name ='Uncategorised' 
            amount={amount} 
            gray 
            {...props} 
        />
    )
}

export default UncategorizedBudgetCard