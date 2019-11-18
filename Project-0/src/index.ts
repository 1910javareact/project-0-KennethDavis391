import express from 'express'
import bodyparser from 'body-parser'
import { getUser } from './services/login-services'
import { User } from './models/user'

const app = express()

app.use(bodyparser.json())

app.post('/login', (req, res) => {
    let {body} = req
    //check that body is a user with the correct password
    let user:User = getUser(body.username, body.password)
    if(user){
        res.json(user)
    }else{
        res.status(500).send('Login service is currently down')
    }
})


app.listen(1001, ()=>{
    console.log('app has started')
})