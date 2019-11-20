import { Role } from "../models/user";


//using factory design pattern to make authorization easy to implement across the app
export function authorization(roles: Role[]){
    return (req, res, next)=>{
        let auth = false
        if(!req.session.user){
            res.status(400).send('Please log in')
            return
        }
        for (let userRole of req.session.user){
            if(roles.includes(userRole)){
                auth = true
            }
        }
        if(auth){
            next()
        }else{
            res.status(403).send("You are unauthorized to access this resource")
        }
    }
}