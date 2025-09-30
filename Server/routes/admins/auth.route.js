import express from 'express';
import { adminLoginController, adminRegisterController, adminLogoutController } from '../../controllers/admins/auth.controller.js';
const router = express.Router();

router.post('/admin/login', adminLoginController);
router.post('admin/register',adminRegisterController);
router.post('/admin/logout', adminLogoutController)
export default router;