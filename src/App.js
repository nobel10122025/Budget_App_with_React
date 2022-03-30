import { useState } from 'react';

import {Stack , Button} from 'react-bootstrap';
import Container from "react-bootstrap/Container"

import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard';
import ViewExpenseModal from './Components/ViewExpenseModal';
import {useBudgets , UNCATEGORIZED_BUDGET_ID } from './Contexts/BudgetContext';

function App() {

  const [showBudgetModal , setShowBudgetModal] = useState(false)
  const [showExpenseModal , setShowExpenseModal] = useState(false)
  const [addExpenseModalBudgetId , setAddExpenseModalBudgetId] = useState()
  const [viewExpenseModalBudgetId , setViewExpenseModalBudgetId] = useState()
  const {budgets , getBudgetExpense } = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  
  return (
  <>
  <Container className='my-3'>
    <Stack direction='horizontal' gap='3' className='mb-4'> 
       <h1 className='me-auto'>Budgets</h1>
       <Button variant='primary' onClick={() => setShowBudgetModal(true)}>Add Budget</Button>
       <Button variant='outline-primary' onClick={() => setShowExpenseModal(true)}>Add Expense</Button>
    </Stack>
    <div style={{
      display:"grid",
      gridTemplateColumns : "repeat(auto-fill , minmax(300px , 1fr))",
      gap: "1rem",
      alignItems:"flex-start"
    }}>
      {
        budgets.map((budget) => {
          const amount = getBudgetExpense(budget.id).reduce(
            (totalAmount , expense) => totalAmount + expense.amount , 0
          ) 
          return (
            <BudgetCard
              name={budget.name} 
              amount={amount} 
              max={budget.max} 
              clickAddExpense = {() => openAddExpenseModal(budget.id)}
              clickViewExpense = {() => (setViewExpenseModalBudgetId(budget.id))}
            />
          )
        })
      } 
      
      <UncategorizedBudgetCard
        clickAddExpense = {() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
        clickViewExpense = {() => (setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID))}
      />

      <TotalBudgetCard />
    </div>
   </Container>

    <AddBudgetModal 
      show={showBudgetModal} 
      handleClose={() => setShowBudgetModal(false)}
    />
    
    <AddExpenseModal 
      show={showExpenseModal} 
      budgetId={addExpenseModalBudgetId}
      handleClose={() => setShowExpenseModal(false)} 
    />

    <ViewExpenseModal 
      budgetId={viewExpenseModalBudgetId} 
      handleClose={() => setViewExpenseModalBudgetId()}
    />
  </>
  );
}

export default App;
