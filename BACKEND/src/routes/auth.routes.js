import {Router} from 'express'
import authController from '../controllers/auth.controller.js'
import authmiddleware from '../middlewares/auth.middleware.js'

const authRouter=Router()


authRouter.post("/register",authController.registerUserController)
authRouter.post("/login",authController.loginUserController)
authRouter.get("/logout",authController.logoutUserController)
authRouter.get("/getme",authmiddleware.authUser,authController.getMeController);



export default authRouter