const userTypeDef=`#graphql
    type User{
        _id: ID!               #"!" means required field
        username:  String!
        name: String!
        password:  String!
        profilePicture: String!
        gender: String!
    }

    type Query{
        # users:  [User!] #we dont want to see all users in any query, this was just for testing
        authUser:  User
        user(userId: ID!):  User
    }  

    type Mutation{
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout : LogoutResponse
    }

    input SignUpInput{
        username: String!
        name: String!
        password:  String
        gender: String!

    }
    input LoginInput{
        username: String!
        password: String!
    }

    type LogoutResponse{
        message : String!
    }
`
export default userTypeDef
