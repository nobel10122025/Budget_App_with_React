import React , {useRef} from 'react'

import {Button, Form, FormControl, FormGroup, FormLabel, ModalBody, ModalHeader, ModalTitle , Modal, FormSelect } from 'react-bootstrap'

import { useBudgets , UNCATEGORIZED_BUDGET_ID } from '../Contexts/BudgetContext';


function AddExpenseModal({show, budgetId , handleClose}) {

    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()

    const { budgets , addExpense } = useBudgets()

    function handleSubmit(e){
        e.preventDefault();
        addExpense({
            description :descriptionRef.current.value,
            amount : parseFloat(amountRef.current.value),
            budgetId : budgetIdRef.current.value
        })
        handleClose()
    }
    

  return (
    <Modal show={show} onHide ={handleClose} centered>
        <ModalHeader closeButton>
            <ModalTitle>Budget</ModalTitle>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
            <ModalBody>
                <FormGroup>
                    <FormLabel htmlFor='Description'>Description</FormLabel>
                    <FormControl type='text' id='Description' ref={descriptionRef} required/>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor='Amount'>Amount</FormLabel>
                    <FormControl type='number' ref ={amountRef} id='amount' min={0} step={0.01} required/>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Budget Type</FormLabel>
                    <FormSelect ref ={budgetIdRef} defaultValue={budgetId}>
                        <option key={UNCATEGORIZED_BUDGET_ID} value={UNCATEGORIZED_BUDGET_ID}>
                            Uncategoried
                        </option>
                    {
                        budgets.map((budget) => (
                            <option key={budget.id} value={budget.id}>
                                {budget.name}
                            </option>
                        ))
                    }
                    </FormSelect>
                </FormGroup>
                <div className='d-flex justify-content-end mt-3'>
                    <Button variant="primary" type='submit'>Add</Button>
                </div>
            </ModalBody>
        </Form>        
    </Modal>
  )
}

export default AddExpenseModal