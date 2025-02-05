
import { Router } from "express";
import { GetUsers, GetUserById, GetUserByCredential, Logout} from "../controllers/userController.js";



const userRouter =  Router()

userRouter.get('/users', GetUsers)
userRouter.get('/user/:id', GetUserById)
userRouter.post('/login', GetUserByCredential)
userRouter.post('/logout', Logout)





export default userRouter