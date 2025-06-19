import mongoose from "mongoose";
import {Server} from 'http'
import app from './app';
import * as dotenv from 'dotenv'
dotenv.config();


let server:Server;
const port = 5000;
async function Main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3t5vk.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('mongodb connected')
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
       
    }

}

Main()


