import express from 'express'
import bodyparser from 'body-parser'
import {sessionMiddleware} from './middleware/session-middleware'
import { getUserByUsernameAndPassword } from './services/user-services'

const app = express()

app.use(bodyparser.json())

app.use(sessionMiddleware)


//take login requests
app.post('/login', (req, res) => {
    let {username, password} = req.body
    //if they don't put in a username or password deny their request
    if(!username || !password){
        res.status(400).send('Invalid Credintials')
    }
    //check if the username and password are valid and return a user if they are
    try{
        let user = getUserByUsernameAndPassword(username, password)
        req.session.user = user
        res.json(user)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})

//take requests on the port 9001
app.listen(9001, ()=>{
    console.log('app has started')
})