
// // for parsing
// import { z, ZodError } from 'zod'
// import { SyncRouterHandler } from "../types"
// // type AnyZodObject = z.ZodObject<z.ZodRawShape>
// type AnyZodObject = z.ZodObject<any>

// type ValidatorSchema = (schema: AnyZodObject) => SyncRouterHandler
// // any should not be used
// export const validatorSchema: ValidatorSchema = (schema): SyncRouterHandler => async (req, res, next) => {
//       try {
//             //      parsing what is in the body
//             schema.parse({
//                   body: req.body,
//                   query: req.query,
//                   params: req.params,
//             })
//             next()
//             // adding catch so that the server doesnot crash
//             // we need type for the error because error type is necessary
//       } catch (error) {
//             console.log(error)
//             if (error instanceof ZodError)
//                   // 400 : server bad request
//                   //  not sending any data
//                   res.status(400).json({
//                         success: false,
//                         messages: 'Invalid request.',
//                         data: {},
//                   })
//             res.status(400).json({
//                   success: false,
//                   messages: 'Invalid request',
//                   data: {},
//             })
//       }
// }
import type { z } from 'zod'
import type { SyncRouterHandler } from '../types'
import { ZodError } from 'zod'
import * as status from '../libs/Https-Status-code/http-status-code'
import { SendResponse } from '../core/response'


// type AnyZodObject = z.ZodObject<z.ZodRawShape>
type AnyZodObject = z.ZodType<any>

type ValidatorSchema = (schema: AnyZodObject) => SyncRouterHandler
export const validatorSchema: ValidatorSchema
  = (schema): SyncRouterHandler =>
    async (req, res, next) => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        })
        next()
      }
      catch (error) {
        if (res.headersSent)
          return

        // If it's a Zod validation error
        if (error instanceof ZodError) {
           // 400 : server bad request
//                   //  not sending any data
                     SendResponse.badRequest({
                        res,
                        success: false,
                        messages: 'Invalid request.',
                        data: error.format(),
                  })
        }

                    SendResponse.error({
                        res,
                        success: false,
                        messages: 'Something went wrong.',
                        data: {},
                  })
      }
    }
    