import mongoose, { model } from "mongoose";
import IBook from "./book.interface";



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

})

 export  const Books = model('Books',BookSchema)