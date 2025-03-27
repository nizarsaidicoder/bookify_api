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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var fixAuthorImages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var authors, _i, authors_1, author, fixedImage, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, db_1.prisma.author.findMany()];
            case 1:
                authors = _a.sent();
                _i = 0, authors_1 = authors;
                _a.label = 2;
            case 2:
                if (!(_i < authors_1.length)) return [3 /*break*/, 5];
                author = authors_1[_i];
                if (!author.image) return [3 /*break*/, 4];
                fixedImage = author.image.replace("/authors/", "/");
                if (!(fixedImage !== author.image)) return [3 /*break*/, 4];
                return [4 /*yield*/, db_1.prisma.author.update({
                        where: { id: author.id },
                        data: { image: fixedImage },
                    })];
            case 3:
                _a.sent();
                console.log("Updated author ".concat(author.id, ": ").concat(fixedImage));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log("All author images fixed.");
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error updating author images:", error_1.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// fixAuthorImages();
var updateAuthorImages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var authors, _i, authors_2, author, updatedImage, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, db_1.prisma.author.findMany()];
            case 1:
                authors = _a.sent();
                _i = 0, authors_2 = authors;
                _a.label = 2;
            case 2:
                if (!(_i < authors_2.length)) return [3 /*break*/, 5];
                author = authors_2[_i];
                if (!(author.image && author.image.endsWith(".jpg"))) return [3 /*break*/, 4];
                updatedImage = author.image.replace(".jpg", "-M.jpg");
                return [4 /*yield*/, db_1.prisma.author.update({
                        where: { id: author.id },
                        data: { image: updatedImage },
                    })];
            case 3:
                _a.sent();
                console.log("Updated author ".concat(author.id, ": ").concat(updatedImage));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log("All author images updated.");
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.error("Error updating author images:", error_2.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// updateAuthorImages();
var updateBookCovers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var books, _i, books_1, book, randomBookId, updatedCover, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, db_1.prisma.book.findMany()];
            case 1:
                books = _a.sent();
                _i = 0, books_1 = books;
                _a.label = 2;
            case 2:
                if (!(_i < books_1.length)) return [3 /*break*/, 5];
                book = books_1[_i];
                if (!book.cover) return [3 /*break*/, 4];
                randomBookId = Math.floor(Math.random() * 1000000);
                updatedCover = " https://covers.openlibrary.org/b/id/" + randomBookId + "-M.jpg";
                return [4 /*yield*/, db_1.prisma.book.update({
                        where: { id: book.id },
                        data: { cover: updatedCover },
                    })];
            case 3:
                _a.sent();
                console.log("Updated book ".concat(book.id, ": ").concat(updatedCover));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log("All book covers updated.");
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                console.error("Error updating book covers:", error_3.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
updateBookCovers();
