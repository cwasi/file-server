import express from 'express';

import {
  getAllfiles,
  numOfdownloadAndEmails,
  saveFile,
  uploadFile,
  getFile,
} from './../controllers/fileController';
import { protect, restictTo } from './../controllers/authController';
import downloadRouter from './../routes/downloadRouter';

const router = express.Router();

router.use(protect);
router.use('/download/:filetitle', restictTo('user'), downloadRouter);
router.route('/').get(getAllfiles);
router.route('/:slug').get(getFile);

router.use(restictTo('admin'));
router
  .route('/num-of-files-download-and-emails-sent')
  .get(restictTo('admin'), numOfdownloadAndEmails);
router.route('/upload-file').post(restictTo('admin'), uploadFile, saveFile);

export default router;
