import React , {useRef} from 'react'

import {Button, Form, FormControl, FormGroup, FormLabel, ModalBody, ModalHeader, ModalTitle , Modal } from 'react-bootstrap'

import { useBudgets } from '../Contexts/BudgetContext';

function AddBudgetModal({show , handleClose}) {

    const nameRef = useRef()
    const maxRef = useRef()

    const { addBudget } = useBudgets()

    function handleSubmit(e){
        e.preventDefault();
        addBudget({
            name:nameRef.current.value,
            max:parseFloat(maxRef.current.value)
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
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <FormControl type='text' id='name' ref={nameRef} required/>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor='Amount'>Maximum Amount</FormLabel>
                    <FormControl type='number' ref ={maxRef} id='amount' min={0} step={0.01} required/>
                </FormGroup>
                <div className='d-flex justify-content-end mt-3'>
                    <Button variant="primary" type='submit'>Add</Button>
                </div>
            </ModalBody>
        </Form>        
    </Modal>
  )
}

export default AddBudgetModal