import express from 'express';
import schoolRoute from './routes/schoolRout'
import path from "path"
import mongoose from 'mongoose';
import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
      studentid?: string;
    }
  }

mongoose.connect(
  "mongodb+srv://ashmikapp2002_db_user:PizdOzGkTb1pacUW@cluster0.xp5dmmg.mongodb.net/myDatabase",
);
const app = express();

app.use((req,res,next)=>{
  res.set('Cache-control','no-store,no-cache');
  next()
})

const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }
  }));
app.use('/', schoolRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});