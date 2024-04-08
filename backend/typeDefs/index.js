import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typedef";
import transactionTypeDef from "./transaction.typedef";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef])


export default mergedTypeDefs;