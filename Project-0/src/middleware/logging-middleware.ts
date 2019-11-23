import {Request} from 'express'

export function loggingMiddleware(req:Request, res, next){
    console.log(`request url:${req.url}, request method:${req.method}, request user:${req.session.user.userId}`);
    next()
}