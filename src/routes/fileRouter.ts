import express from 'express';

import {
  getAllfiles,
  numOfdownloadAndEmails,
  saveFile,
  uploadFile,
} from './../controllers/fileController';
import { protect, restictTo } from './../controllers/authController';
import downloadRouter from './../routes/downloadRouter';

const router = express.Router();

router.use(protect);
router.route('/').get(getAllfiles);
router.use('/download/:fileId', downloadRouter);

router.use(restictTo('admin'));
router
  .route('/num-of-files-download-and-emails-sent')
  .get(restictTo('admin'), numOfdownloadAndEmails);
router.route('/upload-file').post(restictTo('admin'), uploadFile, saveFile);

export default router;
