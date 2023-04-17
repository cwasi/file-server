import express from 'express';

import { downloadFile } from '../controllers/downloadController';

const router = express.Router({ mergeParams: true });

router.route('/').get(downloadFile);

export default router;
