import React, { useContext} from "react";
import useLocalStorage from "../Hooks/useLocalStorage";

const BudgetsContext= React.createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBudgets(){
    return useContext(BudgetsContext)
}

const BudgetProvider = ({ children }) => {
    const [expenses , setExpenses] = useLocalStorage('expenses',[])
    const [budgets , setBudgets] = useLocalStorage('budgets',[])

    function addExpense({description , amount , budgetId}){
        setExpenses((currentExpenses) => {
            return [...currentExpenses , {id : new Date().getTime().toString() , description , amount , budgetId }]
        })
    }

    function addBudget({ name , max }){
        setBudgets((currentBudget) => {
            if(currentBudget.find((budget) => budget.name === name)) {
                return currentBudget
            }
            return [...currentBudget ,{id : new Date().getTime().toString() , name , max}]})
    }

    function deleteBudget({id}){
        setExpenses((currentExpenses) => {
            return currentExpenses.map( expense => {
                if (expense.budgetId !== id ) return expense
                return {...expense , budgetId : UNCATEGORIZED_BUDGET_ID}
            })
        })
        setBudgets((currentBudget) => {
            return currentBudget.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({id}){
        setExpenses((currentExpenses) => {
            return currentExpenses.filter(expense => expense.id !== id)
        })
    }

    function getBudgetExpense(Id){
        return expenses.filter(expense => expense.budgetId === Id)
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            addExpense,
            addBudget,
            deleteExpense,
            deleteBudget,
            getBudgetExpense
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}

export default BudgetProvider