import type { Request, Response, NextFunction } from "express"
// for the common,repeated part
// using class is better because we can create many templates like success

// M3 Class 1
import * as status from '../libs/Https-Status-code/http-status-code'

type SendResponseProps<T> = {
    statusCode?: number,
    res: Response
    // data ashteo pare na ashteo pare
    //    data will be the prop type
    data?: T,
    // in string
    // will not always send
    messages?: string,
    success: boolean
}

// M3 Class 1
// class
// can accept response for different cases like success, error, delete, create, conflict etc using different options
class SendResponse {
    // T: Type template
    private static SendResponse<T>({ res, statusCode, data, messages }: SendResponseProps<T>) {
       if(res.headersSent){
        console.warn('Response has already been sent. Skipping response.')
        return
       }       
        // default return
        // if user does not send the statusCode, we will send the default statusCode
        // 200 is OK
        return res.status(statusCode ?? status.OK).json({
            // statusCode < 400 is true , otherwise  false
            success: statusCode ? statusCode < 400 : true,
            // default message when user does not send any messages
            messages: messages || 'Request processed successfully',
            data
        })

    }
    static success<T>(props: SendResponseProps<T>) {
        //    destructering props
        // only will defune the statusCode
        return this.SendResponse({ ...props, statusCode: status.OK })
    }
    static conflict<T>(props: SendResponseProps<T>) {
        return this.SendResponse({ ...props, statusCode: status.CONFLICT })
    }
    static error<T>(props: SendResponseProps<T>) {
        return this.SendResponse({ ...props, statusCode: status.BAD_REQUEST })
    }
    static badRequest<T>(props: SendResponseProps<T>) {
        return this.SendResponse({ ...props, statusCode: status.BAD_REQUEST })
    }
    static notFound<T>(props: SendResponseProps<T>) {
        return this.SendResponse({ ...props, statusCode: status.NOT_FOUND})
    }
}

export { SendResponse }