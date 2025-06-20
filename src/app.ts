import express, { Application, Request, Response } from 'express'
import { bookRouter } from './app/book.controller'
 const  app:Application = express()
app.use(express.json())
app.use('/api/books',bookRouter)

app.get('/',async(req:Request,res:Response)=>{
    res.send('welcome to library management system server')
})


export default app