import { Request, Response ,NextFunction} from "express"

export const isLogin = async(req:Request,res:Response,next:NextFunction)=>{
    try {

        if(req.session.studentid){
        console.log("session..............................",req.session.studentid)
        next();
        }
        else{
            console.log("no session...........................................")
            res.redirect('/login');
        }
        console.log("dont come here ok>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        
        
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log("error in register")
        }
    }
}

export const isLogout = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.session.studentid,"000000000000000000000000000000000000000000000000000000000000000000000000");
        
        if(req.session.studentid){
            console.log("logout session------------------------------------------------------")
             res.redirect('/dashboard');
        }else{
            next()
        }
        console.log("logout session ================================================================")
        
        
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log("error in register")
        }
    }
}

