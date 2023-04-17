import express from 'express';

import { createfile, getAllfiles } from './../controllers/fileController';
import downloadRouter from './../routes/downloadRouter';

const router = express.Router();

router.use('/:fileId/download', downloadRouter);

router.route('/').get(getAllfiles).post(createfile);

export default router;
