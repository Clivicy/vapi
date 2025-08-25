import { Router } from 'express';
import * as integrationController from './integration.controller';
import { validateBody } from '../middleware/validate';
import { createIntegrationSchema, updateIntegrationSchema } from './integration.validation';

const router = Router();

router.get('/', integrationController.getAll);
router.get('/:id', integrationController.getById);
router.post('/', validateBody(createIntegrationSchema), integrationController.create);
router.put('/:id', validateBody(updateIntegrationSchema), integrationController.update);
router.delete('/:id', integrationController.remove);

export default router;
