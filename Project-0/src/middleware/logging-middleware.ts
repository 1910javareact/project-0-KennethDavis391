// import { Request } from 'express';

// export function loggingMiddleware(req: Request, res, next) {
//     const date = Date();
//     if (!req.user) {
//         next();
//     }
//     console.log(`request url:${req.url}, request method:${req.method}, request body:${JSON.stringify(req.body)}, request made by user:${req.user.userId} at time ${date}`);
//     next();
// }