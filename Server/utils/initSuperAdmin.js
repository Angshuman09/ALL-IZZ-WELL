import { Admin } from "../models/Admins.model.js";
export const initializeSuperAdmin = async () => {
 try {
     const superAdminExists = await Admin.findOne({ role: 'superadmin' });
     
     if (!superAdminExists) {
       await Admin.create({
         username: process.env.SUPERADMIN_USERNAME,
         password: process.env.SUPERADMIN_PASSWORD ,
         role: 'superadmin',
         email: process.env.SUPERADMIN_EMAIL,
       });
       console.log("super admin created successfully");
 } else{
    console.log("super admin already exist!");
 }
}
 catch (error) {
    console.log(`error in creating super admin: ${error}`);
 }
  
};