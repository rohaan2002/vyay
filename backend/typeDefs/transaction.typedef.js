const transactionTypeDef= `#graphql
    type Transaction{
        _id:ID!
        userId: ID!
        description: String!
        paymentType: String!
        category:String!
        amount:Float!  
        location: String!
        date: String!
    }

    type CategoryStatistics{
        category: String!
        totalAmount: Float!
    }


    type Query{
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction  
        categoryStatistics: [CategoryStatistics!] 
        # The categoryStatistics query is expected to return an array of CategoryStatistics objects, each containing a category (String) and totalAmount (Float).
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput!): Transaction
        updateTransaction(input: UpdateTransactionInput!): Transaction

        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!
        paymentType: String!
        category:String!
        amount:Float!  
        date: String!
        location: String!
    }

    input UpdateTransactionInput {
        transactionId:ID!
        description: String!
        paymentType: String!
        category:String!
        amount:Float!  
        date: String!
        location: String!
    }
`
export default transactionTypeDef

