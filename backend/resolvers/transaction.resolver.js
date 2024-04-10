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
        }
        //TODO in future -> add categoryStatstics as Query
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

 