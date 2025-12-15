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
const schoolModel_1 = __importDefault(require("../model/schoolModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
// Extend the SessionData interface
// Extend the Request type to include our custom session
class AdminController {
    loadRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render('register');
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
    }
    insertStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name } = req.body;
            console.log(email, "the email while register ");
            try {
                const existStudent = yield schoolModel_1.default.find({ email });
                if (existStudent && existStudent.length > 0) {
                    return res.render('register', { message: "email is already exist" });
                }
                const pass = req.body.password;
                const spassword = yield bcryptjs_1.default.hash(pass, 10);
                const student = new schoolModel_1.default({
                    name: name,
                    email: email,
                    password: spassword
                });
                const studentData = yield student.save();
                console.log("the data saved ");
                if (studentData) {
                    res.redirect('/login');
                }
                else {
                    res.render('register', { message: "Your registration has been failed" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error");
                }
            }
        });
    }
    loginLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render('login');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error in login");
                }
            }
        });
    }
    verifyLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const schoolData = yield schoolModel_1.default.findOne({ email: email });
                if (schoolData) {
                    const passwordMatch = yield bcryptjs_1.default.compare(password, schoolData.password);
                    if (passwordMatch) {
                        const studentData = yield studentModel_1.default.find();
                        req.session.studentid = schoolData._id;
                        res.render('dashboard', { user: schoolData, student: studentData });
                    }
                    else {
                        res.render('login', { message: "Invalid password" });
                    }
                }
                else {
                    console.log("use not found");
                    res.render('login', { message: "User not found" });
                }
            }
            catch (error) {
                console.error("Error in verifyLogin:", error);
                res.status(500).render('login', { message: "An error occurred during login" });
            }
        });
    }
    loadDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentData = yield studentModel_1.default.find();
                res.render('dashboard', { student: studentData });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error in dashbaord");
                }
            }
        });
    }
    newUserLoad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render('new-user');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error in dashbaord");
                }
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rollNo = req.body.rollNo;
                const studentDetails = yield studentModel_1.default.findOne({ rollno: rollNo });
                if (studentDetails) {
                    return res.render('dashboard', { student: studentDetails, message: 'email already exist' });
                }
                const student = new studentModel_1.default({
                    name: req.body.name,
                    dob: req.body.dob,
                    class: req.body.class,
                    rollNo: req.body.rollNo,
                    phone: req.body.phone
                });
                const studentData = yield student.save();
                if (studentData) {
                    res.redirect('/dashboard');
                }
                else {
                    res.render('new-user', { message: 'Something wrong' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error in dashbaord");
                }
            }
        });
    }
    editStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const studentData = yield studentModel_1.default.findById({ _id: id });
                if (studentData) {
                    res.render('edit-student', { student: studentData });
                }
                else {
                    res.redirect('/dashboard');
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error in dashbaord");
                }
            }
        });
    }
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rollNo, id } = req.body;
                const studentDetails = yield studentModel_1.default.findById({ _id: req.body.id });
                const existingStudent = yield studentModel_1.default.find({ rollNo, _id: { $ne: id } });
                if (existingStudent && existingStudent.length > 0) {
                    return res.render('edit-student', { student: studentDetails, message: 'email already exist' });
                }
                const studentData = yield studentModel_1.default.findByIdAndUpdate({ _id: req.body.id }, { $set: { name: req.body.name, dob: req.body.dob, class: req.body.rollNo, phone: req.body.phone } });
                res.redirect('/dashboard');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error in dashbaord");
                }
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                yield studentModel_1.default.deleteOne({ _id: id });
                res.redirect('/dashboard');
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log("error in dashbaord");
                }
            }
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.session.destroy((err) => {
                    if (err) {
                        console.error("Error destroying session:", err);
                    }
                    else {
                        console.log("logout");
                        res.redirect('/login'); // Or any other route you want to redirect to after logout
                    }
                });
            }
            catch (error) {
            }
        });
    }
}
exports.default = AdminController;
