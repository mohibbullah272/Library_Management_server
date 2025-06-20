import express, { Request, Response } from 'express'
import { Borrow } from './borrowBook.model';
import { Books } from '../books/book.model';

export const borrowRouter = express.Router()

borrowRouter.post('/',async(req:Request,res:Response)=>{
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const updatedBook = await Books.borrowBook(bookId, quantity);

        const borrowRecord = await Borrow.create({
          book: bookId,
          quantity,
          dueData: dueDate,
        });
    
    
        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrowRecord,
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
})
borrowRouter.get('/',async(req:Request,res:Response)=>{
const data = await Borrow.aggregate([   {
    $addFields: {
      bookObjectId: { $toObjectId: "$book" } // Convert book field
    }
  },
  {
    $group: {
      _id: "$bookObjectId",
      totalQuantity: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "_id",
      as: "bookDetails"
    }
  },
  { $unwind: "$bookDetails" },
  {
    $project: {
      _id: 0,
      book: {
        title: "$bookDetails.title",
        isbn: "$bookDetails.isbn"
      },
      totalQuantity: 1
    }
  }
])
res.json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data
  });
})