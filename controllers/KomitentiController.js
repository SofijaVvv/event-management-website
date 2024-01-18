"use strict";
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
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
exports.editKomitent = exports.addKomitent = exports.getKomitenti = void 0;
var database = require("../config/db.js");
function getKomitenti(callback) {
    database('komitent').select().orderBy([{ column: "naziv", order: "asc" }]).then(function (rows) {
        callback(rows);
    });
}
exports.getKomitenti = getKomitenti;
// export async function upsertKomitenta(reqBody:IKomitent, response) {
// try {
//     const insertedIds = await database("komitent")
//         .insert(reqBody)
//         .onConflict("email")
//         .merge();
//     const insertedKomitentId = insertedIds[0];
//     return response.status(200).json(insertedKomitentId);
// } catch (error) {
//     console.error('Greška prilikom dodavanja komitenta:', error);
//     response.status(500).json({ success: false, message: 'Greška prilikom dodavanja komitenta.' });
// }
// }
function addKomitent(noviKomitent, response) {
    return __awaiter(this, void 0, void 0, function () {
        var insertedIds, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database("komitent")
                            .insert(noviKomitent)];
                case 1:
                    insertedIds = _a.sent();
                    noviKomitent.id = insertedIds[0];
                    response.json(noviKomitent);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Greška prilikom dodavanja komitenta:', error_1);
                    response.status(500).json({ success: false, message: 'Greška prilikom dodavanja komitenta.' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addKomitent = addKomitent;
function editKomitent(updatePodaciKomitenta, response) {
    return __awaiter(this, void 0, void 0, function () {
        var komitent, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, database("komitent")
                            .where("id", updatePodaciKomitenta.id)
                            .update(updatePodaciKomitenta)];
                case 1:
                    komitent = _a.sent();
                    response.status(200).json({ success: true, message: 'Komitent je izmijenjen.' });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Greška prilikom izmene komitenta:', error_2);
                    response.status(500).json({ success: false, message: 'Greška prilikom izmene komitenta.' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.editKomitent = editKomitent;
