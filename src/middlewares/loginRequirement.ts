import { Request, Response } from 'express'
const middlewareLoginRequired = async (req: Request, res: Response, next: () => void) => {
    console.log('req session user reading: ' + await req.session.user)

    // if (!req.session.user) {
    //     req.flash('errors', 'You need to make login');
    //     req.session.save(() => res.redirect('/'));
    //     return;
    // }
    next();
}

export { middlewareLoginRequired };