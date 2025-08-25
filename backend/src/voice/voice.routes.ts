import { Router } from 'express';
import * as voiceController from './voice.controller';
import { validateBody } from '../middleware/validate';
import { createVoiceSchema, updateVoiceSchema } from './voice.validation';

const router = Router();

router.get('/', voiceController.getAll);
router.get('/:id', voiceController.getById);
router.post('/', validateBody(createVoiceSchema), voiceController.create);
router.put('/:id', validateBody(updateVoiceSchema), voiceController.update);
router.delete('/:id', voiceController.remove);

export default router;
