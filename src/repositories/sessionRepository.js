import { userModel } from "../dao/MongoDB/models/userModel.js"
import bcrypt from 'bcrypt'
class SessionRepository{

    async findUser(email){
        try{
            const user = await userModel.findOne({ email:email})
            return user
        }
        catch(error){
            throw error
        }
    } 

    async findUserById(userId){
        try{
            const user = await userModel.findById(userId)
            return user
        }
        catch(error){
            throw error
        }
    } 

    async updatePassword(userId,password){
        try{
            const user = await userModel.findById(userId)
            user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            await user.save()

        }
        catch(error){
            throw error
        }
    } 

    async getUsers(){
        try{
            const users = await userModel.find().lean()
            return users
        }
        catch(error){
            throw error
        }
    }

    async deleteUser(uid){
        try{
            const response = await userModel.findByIdAndDelete(uid)
            return response
        }
        catch(error){
            throw error
        }
    }
}

export default SessionRepository   