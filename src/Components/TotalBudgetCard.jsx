import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgets , UNCATEGORIZED_BUDGET_ID } from '../Contexts/BudgetContext'

function TotalBudgetCard(props) {

    const { budgets , expenses } = useBudgets() 
    const max = budgets.reduce(
        (total , budget) => (total + budget.max) , 0
    )
    const amount = expenses.reduce(
            (total , expense) => (total + expense.amount) , 0
    )

    if(max === 0) return null


    return (
        <BudgetCard 
            name ='Total' 
            amount={amount} 
            max={max}
            gray 
            hideButtons
            {...props} 
        />
    )
}

export default TotalBudgetCard