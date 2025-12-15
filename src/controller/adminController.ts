import { Request, Response } from "express"
import Admin, { IAdmin } from "../model/schoolModel";
import bcrypt from 'bcryptjs'
import { Session, SessionData } from 'express-session'
import Student from "../model/studentModel";

// Extend the SessionData interface


// Extend the Request type to include our custom session


class AdminController {
    async loadRegister(req: Request, res: Response): Promise<void> {
        try {
            res.render('register');
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            } else {
                console.log("error in register")
            }
        }
    }

    async insertStudent(req: Request, res: Response): Promise<void> {
        const { email, name } = req.body

        console.log(email, "the email while register ");

        try {
            const existStudent = await Admin.find({email})
            if (existStudent && existStudent.length > 0) {
                return res.render('register', { message: "email is already exist" });
            }
            const pass = req.body.password
            const spassword = await bcrypt.hash(pass, 10);
            const student = new Admin({
                name: name,
                email: email,
                password: spassword
            });

            const studentData = await student.save();
            console.log("the data saved ");
            
            if (studentData) {
                res.redirect('/login')
            } else {
                res.render('register', { message: "Your registration has been failed" });
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            } else {
                console.log("error");
            }
        }
    }

    async loginLoad(req: Request, res: Response): Promise<void> {
        try {
            res.render('login')
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("error in login");
            }
        }
    }

    async verifyLogin(req: Request, res: Response): Promise<void> {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const schoolData = await Admin.findOne({email:email}) as IAdmin | null;
            if(schoolData){
                const passwordMatch = await bcrypt.compare(password, schoolData.password);
                if(passwordMatch){
                    const studentData = await Student.find()
                    req.session.studentid = schoolData._id as unknown as string
                    res.render('dashboard',{user:schoolData,student:studentData})
                } else {

                    res.render('login', { message: "Invalid password" });
                }
            } else {
                console.log("use not found")
                res.render('login', { message: "User not found" });
            }
        } catch (error) {
            console.error("Error in verifyLogin:", error);
            res.status(500).render('login', { message: "An error occurred during login" });
        }
    }

    async loadDashboard(req:Request,res:Response):Promise<void>{
        try {
            const studentData = await Student.find()
            res.render('dashboard',{student:studentData})

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("error in dashbaord");
            }
        }
    }
    
    async newUserLoad(req:Request,res:Response):Promise<void>{
        try {
             res.render('new-user')

            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log("error in dashbaord");
                }
            }
    }

    async addUser(req:Request,res:Response):Promise<void>{
        try {
            const rollNo=req.body.rollNo
            const studentDetails = await Student.findOne({rollno:rollNo})
            if(studentDetails){
                  return res.render('dashboard',{student:studentDetails,message:'email already exist'});
            }

            const student = new Student({
                name:req.body.name,
                dob:req.body.dob,
                class:req.body.class,
                rollNo:req.body.rollNo,
                phone:req.body.phone
            });

            const studentData = await student.save();

            if(studentData){
                res.redirect('/dashboard');
            }
            else{
                res.render('new-user',{message:'Something wrong'})
            }

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("error in dashbaord");
            }
        }
    }

    async editStudent(req:Request,res:Response):Promise<void>{
        try {
            
            const id = req.query.id;
            const studentData = await Student.findById({_id:id});
            if(studentData){
                res.render('edit-student',{student:studentData});
            }else{
                res.redirect('/dashboard');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("error in dashbaord");
            }
        }
    }

    async updateStudent(req:Request,res:Response):Promise<void>{

        try {
            const {rollNo,id}=req.body
            const studentDetails = await Student.findById({_id:req.body.id});
            const existingStudent = await Student.find({ rollNo,_id:{ $ne:id }});

            if(existingStudent && existingStudent.length > 0){
                return res.render('edit-student',{student:studentDetails,message:'email already exist'})
            }

            const studentData =  await Student.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name, dob:req.body.dob, class:req.body.rollNo, phone:req.body.phone}});
            res.redirect('/dashboard');
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("error in dashbaord");
            }
        }
    }

    async deleteStudent(req:Request,res:Response):Promise<void>{
        try {
            const id = req.query.id;
            await Student.deleteOne({_id:id})
            res.redirect('/dashboard');
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("error in dashbaord");
            }
        }
    
    }

    async logOut(req:Request,res:Response):Promise<void>{
        try {
            
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                } else {
                    console.log("logout")
                    res.redirect('/login');  // Or any other route you want to redirect to after logout
                }
            });
            
        } catch (error) {
            
        }
    }
    
    
}

export default AdminController