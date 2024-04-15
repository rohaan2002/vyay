import Transaction from "../models/transaction.model.js";

Transaction
const transactionResolver={
    Query: {
        transactions: async(_,__,context)=>{
            try{
                if(!context.getUser()) throw new Error("Unauthorized");
                const userId = context.getUser()._id;
                const transactions = await Transaction.find({userId}); 
                 //wo sare Transactions db m jinke andr {userId:useId} ho - where userId = context.getUser()._id; ho wo transactions fetch hojayenge
                 return transactions;
            }catch(err){
                console.error("Error in transaction resolver", err);
                throw new Error(err.message||"Error getting transactions")

            }
        },

        transaction: async(_,{transactionId},)=>{
            try{
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            }catch(err){
                console.error("Error in transaction resolver", err);
                throw new Error (err.message||"Error getting transactions")

            }
        },
        //TODO in future -> add categoryStatstics as Query
        categoryStatistics: async(_,__,context)=>{
            if(!context.getUser()) throw new Error("Unauthorized");
            const userId = context.getUser()._id;
            const transactions = await Transaction.find({userId})
            const categoryMap = {};

            // const transactions =

            transactions.forEach((transaction)=>{
                if(!categoryMap[transaction.category]){
                    categoryMap[transaction.category]=0;
                }
                categoryMap[transaction.category]+=transaction.amount;
            })

            return Object.entries(categoryMap).map(([category, totalAmount])=>({category, totalAmount}))
            // this will be returned -
            // [{category: "expense", totalAmount: 150},{category: "investment", totalAmount: 500},{category: "saving", totalAmount: 200}]
            // so an array of objects will be returned
            // when i mapped the array [category, amount] into {category, amount}, for each of that array the object created will have to be stored somewhere? it gets stored into an array

        }
    },
    Mutation : {
        createTransaction: async(_,{input},context)=>{            
            try{
                const newTransaction = new Transaction ({
                    ...input, userId: context.getUser()._id
                })

                newTransaction.save();
                return newTransaction;
            }catch(err){
                console.error("Error in createTransaction resolver", err);
                throw new Error ("Error creating new Transaction");
            }
        },
        updateTransaction: async(_,{input},context)=>{            
            try{
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId,input, {new:true});

                return updatedTransaction;
            }catch(err){
                console.error("Error in updateTransaction resolver", err);
                throw new Error ("Error updating Transaction");
            }
        },
        deleteTransaction: async(_,{transactionId},context)=>{            
            try{
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

                return deletedTransaction;
            }catch(err){
                console.error("Error in deleteTransaction resolver", err);
                throw new Error ("Error deleting Transaction");
            }
        },

    }
    // TODO - add transaction-user relationship  in future
}

export default transactionResolver;

 