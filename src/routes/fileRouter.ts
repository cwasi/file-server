import express from 'express';

import {
  getAllfiles,
  numOfdownloadAndEmails,
  saveFile,
  uploadFile,
  getFile,
} from './../controllers/fileController';
import { protect, restrictTo } from './../controllers/authController';
import downloadRouter from './../routes/downloadRouter';

const router = express.Router();

router.use(protect);
router.use('/download/:filetitle', restrictTo('user'), downloadRouter);
router.route('/').get(getAllfiles);
router.route('/:slug').get(getFile);

router.use(restrictTo('admin'));
router
  .route('/num-of/downloads/email-sent/search/:file')
  .get(restrictTo('admin'), numOfdownloadAndEmails);
router.route('/upload-file').post(restrictTo('admin'), uploadFile, saveFile);

export default router;
