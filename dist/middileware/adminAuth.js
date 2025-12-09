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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogout = exports.isLogin = void 0;
const isLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.studentid) {
            console.log("session..............................", req.session.studentid);
            next();
        }
        else {
            console.log("no session...........................................");
            res.redirect('/login');
        }
        console.log("dont come here ok>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log("error in register");
        }
    }
});
exports.isLogin = isLogin;
const isLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.session.studentid, "000000000000000000000000000000000000000000000000000000000000000000000000");
        if (req.session.studentid) {
            console.log("logout session------------------------------------------------------");
            res.redirect('/dashboard');
        }
        else {
            next();
        }
        console.log("logout session ================================================================");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log("error in register");
        }
    }
});
exports.isLogout = isLogout;
