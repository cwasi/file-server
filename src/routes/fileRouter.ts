import express from 'express';

import { createfile, getAllfiles } from '../controllers/fileController';
const router = express.Router();

router.route('/').get(getAllfiles).post(createfile);

export default router;
