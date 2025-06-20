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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("./book.model");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const Data = yield book_model_1.Books.create(body);
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            Data
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).send({
                message: "Validation failed",
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors
                }
            });
        }
        else {
            res.status(500).send({
                message: "Internal server error",
                success: false,
                error: error.message
            });
        }
    }
}));
exports.bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filter = req.query.filter;
    const sortBy = req.query.sortBy;
    const limit = (_a = req.query.limit) !== null && _a !== void 0 ? _a : "10";
    const limitInt = parseInt(limit);
    try {
        if (filter !== null && filter !== void 0 ? filter : sortBy) {
            const data = yield book_model_1.Books.find({ genre: filter }).sort({ sortBy: 1 }).limit(limitInt);
            res.status(200).json({
                "success": true,
                "message": "Books retrieved successfully",
                data
            });
        }
        else {
            const data = yield book_model_1.Books.find().limit(limitInt);
            res.status(200).json({
                "success": true,
                "message": "Books retrieved successfully",
                data
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}));
exports.bookRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const data = yield book_model_1.Books.findById(bookId);
        res.status(200).json({
            "success": true,
            "message": "Book retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}));
exports.bookRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const body = req.body;
    try {
        const data = yield book_model_1.Books.findByIdAndUpdate(bookId, body, { new: true });
        res.status(200).json({
            "success": true,
            "message": "Book updated successfully",
            data
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}));
exports.bookRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        yield book_model_1.Books.findByIdAndDelete(bookId);
        res.status(202).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}));
