import { Request, Response } from 'express'
export const middlewareLoginAuth = async (req: Request, res: Response, next: () => void) => {

    next();
}