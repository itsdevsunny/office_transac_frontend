import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';


class OfficeTransactions extends Component {

    constructor(props){
        super(props);

        this.state = {
            transactions: [],
        }
    }

    componentDidMount(){
        fetch("http://localhost:3002/api/v1/office_transactions", {
            method: 'GET',
            headers: {
                'Content-Type':'application/json', 
            }
        })
        .then(response => response.json())
        .then(response => {
            if(response.success){
                this.setState({
                    transactions: response.transactions,
                })
            }
        });
    }

    formatDate(date){
        const options = { 
            year: 'numeric', 
            month: 'numeric', 
            day: '2-digit' 
        };
        return new Date(date).toLocaleDateString("en-US", options);
    }

    render() {

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Office Transactions</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><Link to="/office-transaction/create" >+ Add Transaction</Link></th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Running Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.transactions.map((transaction, index)=>
                        <tr key={index}>
                            <td>{this.formatDate(transaction.createdAt)}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.transaction_type == 1 ? transaction.amount : ""}</td>
                            <td>{transaction.transaction_type == 2 ? transaction.amount : ""}</td>
                            <td>{transaction.running_balance}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}

export default OfficeTransactions;