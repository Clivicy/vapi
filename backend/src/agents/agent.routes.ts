import { Router } from 'express';
import * as agentController from './agent.controller';

const router = Router();

router.get('/', agentController.getAll);
router.get('/:id', agentController.getById);
router.post('/', agentController.create);
router.put('/:id', agentController.update);
router.delete('/:id', agentController.remove);

export default router;
