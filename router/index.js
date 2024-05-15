import express from 'express';
const router = express.Router();
import { testController } from '../controllers/testController.js';
import { uploadFileController } from '../controllers/uploadFileController.js';

router.route('/test').get(testController);
router.route('/upload-file').post(uploadFileController);

export default router;