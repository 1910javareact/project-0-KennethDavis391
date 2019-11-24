import {Request} from 'express'

export function loggingMiddleware(req:Request, res, next){
    let date = Date()
    console.log(`request url:${req.url}, request method:${req.method}, request body:${JSON.stringify(req.body)}, request made by user:${req.session.user.userId} at time ${date}`);
    next()
}