import { Request, Response } from 'express';

export const schedules = async (req: Request, res: Response) => {
    console.log('ta aqui no schedules...');
    const { email, password } = req.body;
    const objectRender = {
        email: email
    }

    if (req.isAuthenticated()) {
        console.dir(objectRender)
        res.render('schedules', objectRender);
    } else {
        console.log('deu ruim aqui no sch controller:' + req)
        res.redirect('/register')
    }
}

