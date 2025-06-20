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
bookRouter.get('/:bookId',async(req:Request,res:Response)=>{
    const bookId = req.params.bookId;
    try {
        const data = await Books.findById(bookId)
      res.status(200).json({
        "success": true,
        "message": "Book retrieved successfully",
        data
      })
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            success: false,
            error: error.message
          });
    }
})
bookRouter.put('/:bookId',async(req:Request,res:Response)=>{
const bookId = req.params.bookId;
const body = req.body
try {
    const data = await Books.findByIdAndUpdate(bookId,body,{new:true})
    res.status(200).json({
        "success": true,
        "message": "Book updated successfully",
        data
    })
} catch (error:any) {
    res.status(500).send({
        message: "Internal server error",
        success: false,
        error: error.message
      });
}

})
bookRouter.delete('/:bookId',async(req:Request,res:Response)=>{
    const bookId = req.params.bookId;
    try {
         await Books.findByIdAndDelete(bookId)
        res.status(202).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        })
    } catch (error:any) {
        res.status(500).send({
            message: "Internal server error",
            success: false,
            error: error.message
          });
    }
})