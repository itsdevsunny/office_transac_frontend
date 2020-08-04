import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Row, Col, Form, Button } from 'react-bootstrap';

class OfficeTransactionCreate extends Component {

    constructor(props){
        super(props);

        this.state = {
            expenseAdded: false,
            transactionType: "",
            amount: "",
            description: "",
        }
    }

    handleOnChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleFormSubmit(e){
        e.preventDefault();
        
        let payload = {
            transaction_type: this.state.transactionType,
            amount: this.state.amount,
            description: this.state.description,
        }

		fetch("http://localhost:3002/api/v1/office_transaction/create", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json', 
            },
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                this.setState({
                    expenseAdded: true,
                })
            }
        });
    }

    render() {

        if(this.state.expenseAdded){
            return <Redirect to="/office-transactions" />
        }

        return (
            <Form onSubmit={(e)=>this.handleFormSubmit(e)}>
                <Row>
                <Col className="mb-2" xs={12} sm={2} md={4}></Col>
                <Col className="mb-2" xs={12} sm={8} md={4}>
                    <Form.Group>
                        <Form.Label>Transaction Type</Form.Label>
                        <Form.Control as="select" onChange={(e)=>this.handleOnChange(e)} name="transactionType">
                            <option value="0">Select Transaction type</option>
                            <option value="1">Credit</option>
                            <option value="2">Debit</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Amount
                        </Form.Label>
                        <Form.Control onChange={(e)=>this.handleOnChange(e)} name="amount" type="number" placeholder="Amount" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control onChange={(e)=>this.handleOnChange(e)} name="description" type="text" placeholder="Description" />
                    </Form.Group>

                    <Form.Group>
                        <Button type="submit">Save</Button>
                        <Link className="ml-2" to="/office-transactions">Cancel</Link>
                    </Form.Group>
                </Col>
                <Col className="mb-2" xs={12} sm={2} md={4}></Col>
                </Row>
            </Form>
        );
    }
}

export default OfficeTransactionCreate;