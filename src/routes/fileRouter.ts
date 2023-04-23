import express from 'express';

import {
  createfile,
  getAllfiles,
  numOfdownloadAndEmails,
} from './../controllers/fileController';
import { protect, restictTo } from './../controllers/authController';
import downloadRouter from './../routes/downloadRouter';

const router = express.Router();

router.use('/download/:fileId', downloadRouter);
router.use(protect);
router.route('/').get(getAllfiles).post(restictTo('admin'), createfile);
router
  .route('/num-of-files-download-and-email-sent')
  .get(restictTo('admin'), numOfdownloadAndEmails);

export default router;
