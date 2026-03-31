import { toLowerCase } from "zod"
import type { CommonController } from "../types"
import { getUserByUsernameService , createUserServices} from "../services"



export const signUpController: CommonController = async (req, res) => {
    const { firstName,
        lastName,
        fullName,
        email,
        phone,
        profileImage,
        bio,
        password } = req.body

    //    username check
    const username: string = ((firstName + lastName).toLowerCase())
    // console.log('data', data)
    //  we have to check if username exists or not
    const user =await createUserServices({
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

    // TODO: check if the user exit exit on db
    const usernameExist = await getUserByUsernameService(username)

    if (usernameExist) {

        res.json({
            messages: 'user name taken',
            data: {
                username,
            }
        })
    }
    res.json({
        messages: 'User created Successfully',
        data: user
    })
}