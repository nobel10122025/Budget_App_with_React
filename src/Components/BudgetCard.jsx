import React from 'react'
import { Card, ProgressBar , Stack ,Button } from 'react-bootstrap'
import { currentFormatter } from '../utils'

function BudgetCard({
    name , 
    amount , 
    max ,
    gray , 
    hideButtons , 
    clickAddExpense ,
    clickViewExpense
}) {

    let classNames = []
    if(amount > max){
        classNames.push("bg-danger","bg-opacity-10")
    } else if (gray){
        classNames.push("bg-light")
    }
  return (
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal'>
                <div>{name}</div>
                <div className='d-flex align-items-baseline'>
                   {currentFormatter.format(amount)} 
                    { max &&
                        <span className='fs-6 ms-2'>
                            / {currentFormatter.format(max)} 
                        </span>
                    }
                </div>
            </Card.Title>
            {max && 
                <ProgressBar 
                min='0' 
                max={max} 
                now={amount} 
                variant={ProgessBarVariant(amount , max)}
                className='rounded-pill' 
            />
            }
            {   !hideButtons && 
                <Stack direction='horizontal' className='mt-3' gap='4'>
                <Button 
                    variant='outline-primary'
                    className='ms-auto'
                    onClick={clickAddExpense}
                >
                    Add Expense
                </Button>
                <Button 
                    variant='outline-secondary'
                    onClick={clickViewExpense}
                >
                    View Expense
                </Button>
            </Stack>
            }    
            
        </Card.Body>
    </Card>
  )
}

export default BudgetCard

function ProgessBarVariant(amount , max){
    if(amount < 0.5 * max) return 'primary'
    else if (amount < 0.75 * max) return 'warning'
    else return 'danger'
}