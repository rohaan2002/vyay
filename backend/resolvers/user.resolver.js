import {users} from './../dummyData/data.js'
import User from './../typeDefs/user.typedef.js'
import bcrypt from 'bcryptjs'
const userResolver={
    Mutation:{
        signUp: async(_,{input}, context)=>{
            try{
                const {username,name, password, gender} = input;

                if(!username || !name|| !password || !gender){
                    throw new Error("All fields are required");
                }

                const existingUser = await User.findOne({username})

                if(existingUser) throw new Error("User already exists!");

                const salt = await bcrypt.genSalt(10); //jitna higher salt value rkhoge utna bada and secure hashedPassword banta h. but higher salt value is computationally expensive, so its a tradeoff and 10 is a good number
                const hashedPassword =await bcrypt.hash(password, salt);

                // getting placeholder profilePic
                const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
                const girlProfilePic = `https://avatar.iran.liara.run/public/?girl?username=${username}`

                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePic: gender==="male"?boyProfilePic: girlProfilePic
                })

                await newUser.save();
                await context.login(newUser);

                return newUser

            }catch(err){
                console.error("Error in signUp mutation: ",err);
                throw new Error(err.message|| "Internal Server Error");
            }
        },
        
        login: async(_,{input},context)=>{
            try{
                const {username, password} = input;
                const {user}= await context.authenticate("graphql-local",{username, password})

                await context.login(user)
                return user;

            }catch(err){
                console.error("Error in login", err);
                throw new Error(err.message|| "Internal Server Error");
            }
        },
        logout: async(_,__, context)=>{
           
            try{
                await context.logout();
                req.session.destroy((err)=>{
                    if(err) throw err;
                })
            
            res.clearCookie("connect.sid");
            return {message: "Logged Out Succesfully"}
            }catch(err){
                console.error("Error occured in logout", err);
                throw new Error(err.message|| "Internal Server Error");

            }
        }
    },
    Query: {
        // users: ()=>{
        //     return users
        // },
        authUser: async(_,__,context)=>{
            try{
                const user = context.getUser();
                return user
            }catch(err){
                console.error("Error occured in authUser", err);
                throw new Error(err.message||"Internal server error, in authUser")
            }
        },

        user: async(_, {userId})=>{
           try{
            const user = await User.findById(userId);
            return user;
           }catch(err){
            console.log("Error occured in user query", err);
            throw new Error(err.message||"Internal server error, in user (resolver)")
           }
        },
    },
}

export default userResolver

