import express from 'express';
import multer from 'multer';

import {
  createfile,
  getAllfiles,
  numOfdownloadAndEmails,
  saveDocument,
  // uploadFile,
} from './../controllers/fileController';
import { protect, restictTo } from './../controllers/authController';
import downloadRouter from './../routes/downloadRouter';

const upload = multer({ dest: 'src/public/document' });

const router = express.Router();

router.use('/download/:fileId', downloadRouter);
router.use(protect);
router.route('/').get(getAllfiles).post(restictTo('admin'), createfile);
router
  .route('/num-of-files-download-and-email-sent')
  .get(restictTo('admin'), numOfdownloadAndEmails);

router
  .route('/upload-file')
  .post(restictTo('admin'), upload.single('photo'), saveDocument);

export default router;
