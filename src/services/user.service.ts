// to communicate with database

import { User, userModel } from "../models/user"

//  most of the time we will not return promise
// found user or did not find anything at all
// Promise: will return sth after operation executes successfully
// in this case User or null
type GetUserByUserName = ( username: string ) => Promise<User | null>
export const getUserByUsernameService: GetUserByUserName = (username) => {
    return userModel.findOne({ username })
}

// for user creation
// using Partial, we can parse the data of the User
type CreateUserServices= (userData: Partial <User>) => Promise <User | null>
export const createUserServices:CreateUserServices = (userData) => {
      return userModel.create(userData)
}