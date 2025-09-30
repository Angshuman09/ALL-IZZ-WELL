import express from 'express';
import { adminCheck, authCheck, superAdminCheck } from '../../middleware/admins/authCheck.middleware.js';
import { getAdminsDataController, getStudentsDataController } from '../../controllers/admins/dashboards.controller.js';

const router = express.Router();

router.get('/admin/getadminData',authCheck, superAdminCheck, getAdminsDataController);
router.get('/admin/getStudentsData',authCheck, adminCheck, getStudentsDataController);

export default router;