import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authorization from '../middleware/authMiddleware.js';

const router = express.Router();
export const TOKEN_SECRET = "sumit1711";

router.post('/register', async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: 'User registered successfully',
        })
        
    }
    catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
})

router.post('/login', async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            throw new Error("User not found");
        }

        if(user.status!=="active"){
            throw new Error("User is blocked by Admin");
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);

        if(!validPass){
            throw new Error("Invalid password");
        }

        const token = jwt.sign({userID: user._id}, TOKEN_SECRET, {expiresIn: "1d"});
        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token,
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
})

router.get("/getCurrentUser", authorization, async(req, res)=>{
    try{
        const user = await User.findById(req.body.userID);
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        })
    }
    catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
})

router.get("/getUsers", authorization, async(req, res)=>{
    try{
        const users = await User.find();
        res.send({
            success: true,
            message: "User fetched successfully",
            users,
        })
    }catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
})

router.put("/updateStatus/:id", authorization, async(req,res)=>{
    try{
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "User Status updated successfully",
        })
    }catch(error){
        res.send({
            success: false,
            message: error.message,
        })
    }
})

export default router;