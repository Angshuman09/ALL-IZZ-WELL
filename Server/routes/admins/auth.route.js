import express from 'express';
import { adminAuthController, getAdminsDataController, getStudentsDataController } from '../../controllers/admins/auth.controller.js';
const router = express.Router();

router.post('/admin/login', adminAuthController);
router.get('/admin/getadminData', getAdminsDataController);
router.get('/admin/getStudentsData', getStudentsDataController);
export default router;