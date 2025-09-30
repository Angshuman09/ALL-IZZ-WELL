import { Admin } from "../../models/Admins.model.js";
import jwt from 'jsonwebtoken';
import parsePhoneNumber from 'libphonenumber-js';

export const adminLoginController = async (req, res)=>{
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

    if(admin.role === 'admin' && !admin.approved){
        return res.status(401).json({error: "Your are not approved"});
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
    res.status(500).json({error:`error in adminAuthController: ${error}`})
   }
}

export const adminRegisterController = async (req, res)=>{
   try {
     const {email, password, phoneNumber}= req.body;
 
     if(!email || !password || !phoneNumber || !college){
        return res.status(401).json({error: "Fields are required"});
     }

     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

     if(!emailRegex(email)){
        return res.status(401).json({error: "Email is not valid!"});
     }

     if(password.length<6){
        return res.status(401).json({error: "Password must be atleast of 6 characters"});
     }

     const phonenumber = parsePhoneNumber(phoneNumber);

     if(!phonenumber.isValid){
        return res.status(401).json({error: "Phone number is not valid"});
     }


     const admin = await Admin.create({
        email, password, phoneNumber
     })
     
     //work in progress


   } catch (error) {
    console.log(`error in adminAuthController: ${error}`);
    res.status(500).json({error:`error in adminAuthController: ${error}`})
   }
}

export const adminLogoutController = async (req, res)=>{
    try {
        res.cookies('token','',{maxAge: 0});
        res.status(200).json({success: true, message: "Admin Logout successfully"});
    } catch (error) {
    console.log(`error in adminLogoutController: ${error}`);
    res.status(500).json({error:`error in adminLogoutController: ${error}`})
    }
}