import type { CommonController } from "../types"
import { getUserByUsernameService, createUserServices } from "../services"
import { Logger } from "../utils/logger"
import { SendResponse } from "../core/response"
import { UserRegisterInput } from "../schema"



export const signUpController: CommonController = async (req, res) => {


    // try {
        //  UserRegisterInput for double validation
        const { firstName,
            lastName,
            fullName,
            email,
            phone,
            profileImage,
            bio,
            password,
            username
        }: UserRegisterInput = req.body

        //    username check
        // TODO: check if the user exist on db
        const usernameExist = await getUserByUsernameService(username)
        if (usernameExist) {
            // M3 Class 1
             SendResponse.conflict({
                 res,
                 messages: 'User name taken',
                 data: { username },
                 success: false
             })
            return
        }
        // const username: string = ((firstName + lastName).toLowerCase())
        // console.log('data', data)
        //  we have to check if username exists or not
        const user = await createUserServices({
            username,
            firstName,
            lastName,
            fullName,
            email,
            phone,
            profileImage,
            bio,
            password,
            role: 'user',
        })
        const userResponse = {
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName,
            fullName: user?.fullName,
            email: user?.email,
            phone: user?.phone,
            role: user?.role,
        }

        // res.status(200).json({
        //     success: true,
        //     messages: 'User created successfully',
        //     data: {
        //         userResponse,
        //     }
        // })
        // M3 Class 1
        // replacing the 200 status lines of code above
        SendResponse.success({
            res,
            success: true,
            messages: 'User created successfully',
            data: userResponse,
        })
    } 
    // catch (error) {
    //     Logger.error(error)

    //     SendResponse.error({
    //         res,
    //         success: false,
    //         messages: `Internal server error, ${error}`,
    //         data: {}
    //     })
    // }
// }

export const userLoginController: CommonController = async (req, res) => {
//    access token: short term token.some company sets it for 15mins like for banking softwares. Some for 7 days
// refresh token: active for 30 days
// after 7 days, if logged in and refreshed, the access token will be invalid. 
// then the refesh token will be checked if it is valid(ubder 30 days) or not 
// if valid, it will create a new access token  
// we will send the access token and refresh token to the SendResponse
SendResponse.success({
        res,
        success: true,
        messages: 'User Login Successfully',
        data: {},
    })
// res.send("Hello")

}