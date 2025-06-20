import express, { Request, Response } from 'express'
import { Books } from './book.model'


export const bookRouter = express.Router()


bookRouter.post('/',async(req:Request,res:Response)=>{
        const body = req.body
        try {
            const Data = await Books.create(body)
            res.status(201).json({
                "success":true,
                "message": "Book created successfully",
                 Data
                
            })
        }catch (error: any) {
            if (error.name === "ValidationError") {
              res.status(400).send({
                message: "Validation failed",
                success: false,
                error: {
                  name: error.name,
                  errors: error.errors
                }
              });
            } else {
              res.status(500).send({
                message: "Internal server error",
                success: false,
                error: error.message
              });
            }
          }

        
})

bookRouter.get('/',async(req:Request,res:Response)=>{
const filter = req.query.filter;
const sortBy = req.query.sortBy;
const limit = req.query.limit ?? "10"

const limitInt: number = parseInt(limit as string);
try {
    if(filter ?? sortBy){
        const data = await Books.find({genre:filter}).sort({sortBy:1}).limit(limitInt)
        res.status(200).json({
            "success":true,
            "message": "Books retrieved successfully",
            data
        })
    }else{
        const data = await Books.find().limit(limitInt)
        res.status(200).json({
            "success":true,
            "message": "Books retrieved successfully",
            data
        })
    }

 
} catch (error: any) {
      res.status(500).send({
        message: "Internal server error",
        success: false,
        error: error.message
      });
  }

})
