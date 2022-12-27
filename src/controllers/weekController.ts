import { Request, Response } from 'express';
import { Login } from '../models/UsersModel';

export const weekDays = async (req: Request, res: Response) => {
    const { email, password } = req.body.email;
    const objectRender = {
        email: email
    }
    console.log('testeee:' + await email)
    res.render('week-days/monday', objectRender);
}

