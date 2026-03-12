import type { Request, Response } from "express"

export type CommonController = (req:Request, res: Response) => Promise <void>