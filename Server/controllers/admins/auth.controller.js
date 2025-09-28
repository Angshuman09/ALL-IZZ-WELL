import { Admin } from "../../models/Admins.model.js";
import jwt from 'jsonwebtoken';
export const adminAuthController = async (req, res)=>{
   try {
    const {username, password} = req.body;
    if(!username || !password) return res.status(401).json({error: "Username and Password is required"});

    const admin = await Admin.findOne({username});
    if(!admin){
       return res.status(404).json({error: "username not Not found"});
    }

    const isMatch = await admin.comparePassword(password);

    if(!isMatch){
        return res.status(404).json({error: "Password not matched"});
    }

    const token = jwt.sign({adminId: admin._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: '15d'
    })

    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        maxAge: 15*24*60*60*1000
    })

    res.status(200).json({admin:{
        username, email:admin.email, role: admin.role
    }})

   } catch (error) {
    console.log(`error in adminAuthController: ${error}`);
   }
}

export const getAdminsDataController = async (req, res)=>{
    res.json({message: "will working"})
}

export const getStudentsDataController = async (req, res)=>{
    res.json({message: "will working"})
}
