import express from 'express';

import {
  countNumberOfFileDownload,
  downloadFile,
  getAllDownloads,
} from '../controllers/downloadController';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(downloadFile)
  .get(countNumberOfFileDownload, getAllDownloads);

export default router;
