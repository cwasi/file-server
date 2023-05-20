import express from 'express';
import { protect, restrictTo } from './../controllers/authController';
import {
  countNumberOfFileDownload,
  downloadFile,
  getAllDownloads,
} from '../controllers/downloadController';



const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, restrictTo('user'),downloadFile)
  .get(countNumberOfFileDownload, getAllDownloads);



export default router;
