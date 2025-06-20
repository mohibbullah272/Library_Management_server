import mongoose, { Model, model } from "mongoose";
import IBook from "./book.interface";


interface IBookModel extends Model<IBook> {
  borrowBook(bookId: string, quantity: number): Promise<IBook>;
}

const BookSchema = new mongoose.Schema<IBook>({
title:{type:String,required:true,trim:true},
author:{type:String,required:true,},
genre:{type:String, 
    enum:["FICTION","NON_FICTION","SCIENCE","HISTORY","BIOGRAPHY","FANTASY"],required:true },
isbn:{type:String},
description:String,
copies: {
    type: Number,
    required: true,
    min: [0, 'Copies cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Copies must be an integer'
    }
  },
  available:Boolean

},
{
    collection:'books',
    versionKey:false,
    timestamps:true
})

BookSchema.statics.borrowBook = async function (bookId: string, quantity: number): Promise<IBook> {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error("Book not found ");
  }

  if (book.copies < quantity) {
    throw new Error(`Not enough copies available. Only ${book.copies} left! `);
  }

  book.copies -= quantity;

  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};

export const Books = mongoose.model<IBook, IBookModel>("Books", BookSchema);

 