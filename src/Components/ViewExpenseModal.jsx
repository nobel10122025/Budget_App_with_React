import React from 'react'
import { Button, ModalHeader, Modal , Stack , ModalTitle, ModalBody } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../Contexts/BudgetContext'
import { currentFormatter } from '../utils'

function ViewExpenseModal({budgetId , handleClose}) {
    const {budgets , deleteExpense , deleteBudget , getBudgetExpense} = useBudgets()

    const expensesList = getBudgetExpense(budgetId)

    const budget = (UNCATEGORIZED_BUDGET_ID === budgetId) ? 
    {
        name : 'Uncategorized' , 
        id : UNCATEGORIZED_BUDGET_ID
    } : budgets.find( b => b.id === budgetId)
   
   return(
        <Modal show = {budgetId != null} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>
                    <Stack direction='horizontal' gap='2'>
                    <div>expense {budget ?.name} </div>   
                    <Button 
                        variant = 'outline-danger'
                        onClick={() => {
                            deleteBudget(budget)
                            handleClose()
                        }}
                    >
                        Delete
                    </Button>
                    </Stack>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Stack direction='vertical' gap='3'>
                {
                    expensesList.map( expense => (
                        <Stack direction='horizontal' gap='2' key={expense.id} className=''>
                            <div className='me-auto fs-4'>{expense.description}</div>
                            <div className='fs-5'>
                                {currentFormatter.format(expense.amount)}
                            </div>
                            <Button 
                                variant='outline-danger' 
                                onClick={ () => deleteExpense(expense)}
                                size='sm'>&times;
                            </Button>
                        </Stack>
                    ))
                }
                </Stack>
            </ModalBody>
        </Modal>
   ) 
}

export default ViewExpenseModal