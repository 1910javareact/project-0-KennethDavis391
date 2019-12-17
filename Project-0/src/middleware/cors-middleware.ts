import { Request } from 'express'

export function corsFilter(req: Request, res, next){
    res.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, token');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'token')
    if (req.method === 'OPTIONS'){
        res.status(200).send();
    } else {
        next();
    }
}