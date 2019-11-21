

//using factory design pattern to make authorization easy to implement across the app
export function authorization(roleIds: number[], userId?: boolean){
    return (req, res, next)=>{        
        let auth = false
        
        if(!req.session.user){
            res.status(400).send('Please log in')
            return
        }
        
        //check if there role has authorization
        if(roleIds.includes(req.session.user.role.roleId)){
            auth = true
        }

        //check if userId is the same as what they're trying to access
        if(userId){
            let id = +req.params.id
            if(!isNaN(id)){
                if(req.session.user.userId === id){
                    auth = true
                }
            }
        }

        if(auth){
            next()
        }else{
            res.status(401).send("The incoming token has expired")
        }
    }
}