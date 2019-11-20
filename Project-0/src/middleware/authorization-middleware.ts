

//using factory design pattern to make authorization easy to implement across the app
export function authorization(roleIds: number[]){
    return (req, res, next)=>{        
        let auth = false
        
        if(!req.session.user){
            res.status(400).send('Please log in')
            return
        }
        
        if(roleIds.includes(req.session.user.role.roleId)){
            auth = true
        }
        if(auth){
            next()
        }else{
            res.status(401).send("The incoming token has expired")
        }
    }
}