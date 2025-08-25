import { Router } from 'express';
import * as userController from './user.controller';
import { validateBody } from '../middleware/validate';
import { createUserSchema, updateUserSchema } from './user.validation';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', validateBody(createUserSchema), userController.create);
router.put('/:id', validateBody(updateUserSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;
