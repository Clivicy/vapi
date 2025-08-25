import { Router } from 'express';
import * as apikeyController from './apikey.controller';
import { validateBody } from '../middleware/validate';
import { createAPIKeySchema, updateAPIKeySchema } from './apikey.validation';

const router = Router();

router.get('/', apikeyController.getAll);
router.get('/:id', apikeyController.getById);
router.post('/', validateBody(createAPIKeySchema), apikeyController.create);
router.put('/:id', validateBody(updateAPIKeySchema), apikeyController.update);
router.delete('/:id', apikeyController.remove);

export default router;
