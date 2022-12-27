import { Request, Response } from 'express';

const verifyLoginErrors = (loginErrors: string[], req: Request, res: Response) => {
    console.log('Verifying Login Errors... ' + loginErrors)
    if (loginErrors.length > 0) {
        req.flash('errors', loginErrors)
        req.session.save(() => {
            return res.redirect('back');
        });
        return;
    }
}

export { verifyLoginErrors };