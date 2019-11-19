import express from 'express'
import bodyparser from 'body-parser'
import { User } from './models/user'

const app = express()

app.use(bodyparser.json())

app.post('/login', (req, res) => {
    
})


app.listen(9001, ()=>{
    console.log('app has started')
})