// description: String!
// paymentType: String!
// category:String!
// amount:Float!  
// date: String!
// location: String!

import {gql} from '@apollo/client';
export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($input: CreateTransactionInput!){
        createTransaction(input: $input){
            _id
            description
            paymentType
            category
            amount
            date
            location
        }
    }
`
export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($input: UpdateTransactionInput!){
        updateTransaction(input: $input){
            _id
            description   #things we'll get returned after running this mutation
            paymentType
            category
            amount
            date
            location
        }
    }
`

export const DELETE_TRANSACTION =gql`
    mutation DeleteTransaction($transactionId: ID!){
        deleteTransaction(transactionId: $transactionId){
            _id
            description   #things we'll get returned after running this mutation
            paymentType
            category
            amount
            date
            location
        }
    }
`