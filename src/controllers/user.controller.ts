import type { CommonController } from "../types"



export const signUpController: CommonController = async (req, res) => {
    res.json({
        messages: 'user',
        data: {},
    })
}