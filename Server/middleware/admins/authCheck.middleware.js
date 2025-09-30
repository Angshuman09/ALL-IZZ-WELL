import jwt, { decode } from "jsonwebtoken";
import { Admin } from "../../models/Admins.model.js";

export const authCheck = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: "Invalid Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      res.status(401).json({ error: "Unauthorized: Access denied" });
    }

    const admin = await Admin.findById(decoded.adminId).select("-password");

    if(!admin){
      res.status(404).json({error: "User not found"});
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log(`error in authUser middleware: ${error}`);
    res.status(500).json({error:`error in authUser middleware: ${error}`});
  }
};


export const superAdminCheck = async (req, res, next)=>{
  if(req?.admin && req.admin.role === 'superadmin'){
    next();
  }

  res.status(401).json({error: "Unauthorized: Access denied"});
}

export const adminCheck = async (req, res, next)=>{
  if(req?.admin && req.admin.role === 'admin'){
    next();
  }
  res.status(401).json({error: "Unauthorized: Access denied"});
}