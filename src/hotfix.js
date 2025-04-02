"use strict";
// import { prisma } from "./db";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var db_1 = require("./db");
// const fixAuthorImages = async () =>
// {
//   try
//   {
//     const authors = await prisma.author.findMany();
//     for (const author of authors)
//     {
//       if (author.image)
//       {
//         const fixedImage = author.image.replace("/authors/", "/");
//         if (fixedImage !== author.image)
//         {
//           await prisma.author.update({
//             where: { id: author.id },
//             data: { image: fixedImage },
//           });
//           console.log(`Updated author ${author.id}: ${fixedImage}`);
//         }
//       }
//     }
//     console.log("All author images fixed.");
//   }
//   catch (error)
//   {
//     console.error("Error updating author images:", error.message);
//   }
// };
// fixAuthorImages();
// const updateAuthorImages = async () =>
// {
//   try
//   {
//     const authors = await prisma.author.findMany();
//     for (const author of authors)
//     {
//       if (author.image && author.image.endsWith(".jpg"))
//       {
//         const updatedImage = author.image.replace(".jpg", "-M.jpg");
//         await prisma.author.update({
//           where: { id: author.id },
//           data: { image: updatedImage },
//         });
//         console.log(`Updated author ${author.id}: ${updatedImage}`);
//       }
//     }
//     console.log("All author images updated.");
//   }
//   catch (error)
//   {
//     console.error("Error updating author images:", error.message);
//   }
// };
// updateAuthorImages();
// const updateBookCovers = async () =>
// {
//   try
//   {
//     const books = await prisma.book.findMany();
//     for (const book of books)
//     {
//       if (book.cover)
//       {
//         const randomBookId = Math.floor(Math.random() * 1000000);
//         const updatedCover =
//           " https://covers.openlibrary.org/b/id/" + randomBookId + "-M.jpg";
//         await prisma.book.update({
//           where: { id: book.id },
//           data: { cover: updatedCover },
//         });
//         console.log(`Updated book ${book.id}: ${updatedCover}`);
//       }
//     }
//     console.log("All book covers updated.");
//   }
//   catch (error)
//   {
//     console.error("Error updating book covers:", error.message);
//   }
// };
// updateBookCovers();
// browse all tags and add color to them
var colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FFA133",
    "#FF5733",
    "#33FF57",
    "#3357FF",
];
var updateTags = function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, _i, tags_1, tag, randomIndex, randomColor, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, db_1.prisma.tag.findMany()];
            case 1:
                tags = _a.sent();
                _i = 0, tags_1 = tags;
                _a.label = 2;
            case 2:
                if (!(_i < tags_1.length)) return [3 /*break*/, 5];
                tag = tags_1[_i];
                randomIndex = Math.floor(Math.random() * colors.length);
                randomColor = colors[randomIndex];
                if (!!tag.color) return [3 /*break*/, 4];
                // Update the tag with a new color
                return [4 /*yield*/, db_1.prisma.tag.update({
                        where: { id: tag.id },
                        data: { color: randomColor }
                    })];
            case 3:
                // Update the tag with a new color
                _a.sent();
                console.log("Updated tag ".concat(tag.id, " with color ").concat(randomColor));
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error("Error updating tags:", error_1.message);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
updateTags();
