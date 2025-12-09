import express from 'express'
import AdminController from '../controller/adminController'
import { isLogin, isLogout } from '../middileware/adminAuth';

const router = express.Router()

const adminController = new AdminController()


router.get('/register',isLogout ,adminController.loadRegister);

router.post('/register', isLogout,adminController.insertStudent);

router.get('/',isLogout, adminController.loginLoad);

router.get('/login',isLogout, adminController.loginLoad);

router.post('/login',isLogout,adminController.verifyLogin)

router.get('/dashboard',isLogin,adminController.loadDashboard)

router.get('/new-user',isLogin,adminController.newUserLoad)

router.post('/new-user',isLogin,adminController.addUser);

router.get('/edit-student',isLogin,adminController.editStudent);

router.post('/edit-student',isLogin,adminController.updateStudent)

router.get('/delete-student',isLogin,adminController.deleteStudent)

router.get('/logout',isLogin,adminController.logOut)
export default router