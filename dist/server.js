"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schoolRout_1 = __importDefault(require("./routes/schoolRout"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
mongoose_1.default.connect("mongodb+srv://ashmikapp2002_db_user:PizdOzGkTb1pacUW@cluster0.xp5dmmg.mongodb.net/?appName=Cluster0");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.set('Cache-control', 'no-store,no-cache');
    next();
});
const port = 3001;
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }
}));
app.use('/', schoolRout_1.default);
app.listen(port, () => {
    console.log(`Server is running on https://stdmanagement.onrender.com`);
});
