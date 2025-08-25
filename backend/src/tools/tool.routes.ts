import { Router } from 'express';
import * as toolController from './tool.controller';
import { validateBody } from '../middleware/validate';
import { createToolSchema, updateToolSchema } from './tool.validation';

const router = Router();

router.get('/', toolController.getAll);
router.get('/:id', toolController.getById);
router.post('/', validateBody(createToolSchema), toolController.create);
router.put('/:id', validateBody(updateToolSchema), toolController.update);
router.delete('/:id', toolController.remove);

export default router;
