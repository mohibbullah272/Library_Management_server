import mongoose, { model } from "mongoose";
import IBorrowBook from "./borrowBooks.interface";


const borrowBook = new mongoose.Schema<IBorrowBook>({
    book:{type:String,required:true},
    quantity:{type:Number,required:true},
    dueData:{type:Date}
},
{
    versionKey:false,
    collection:'borrowBooks',
    timestamps:true
})

export  const Borrow = model('Borrow',borrowBook)