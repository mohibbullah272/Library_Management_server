"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrowBook_model_1 = require("./borrowBook.model");
const book_model_1 = require("../books/book.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const updatedBook = yield book_model_1.Books.borrowBook(bookId, quantity);
        const borrowRecord = yield borrowBook_model_1.Borrow.create({
            book: bookId,
            quantity,
            dueData: dueDate,
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}));
exports.borrowRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield borrowBook_model_1.Borrow.aggregate([{
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
    ]);
    res.json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data
    });
}));
