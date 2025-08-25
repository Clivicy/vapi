import { Router } from 'express';
import * as phoneNumberController from './phoneNumber.controller';
import { validateBody } from '../middleware/validate';
import { createPhoneNumberSchema, updatePhoneNumberSchema } from './phoneNumber.validation';

const router = Router();

router.get('/', phoneNumberController.getAll);
router.get('/:id', phoneNumberController.getById);
router.post('/', validateBody(createPhoneNumberSchema), phoneNumberController.create);
router.put('/:id', validateBody(updatePhoneNumberSchema), phoneNumberController.update);
router.delete('/:id', phoneNumberController.remove);

export default router;
