import { Router } from 'express';
import * as agentController from './agent.controller';
// import { validateBody } from '@middleware/validate'; // Uncomment if validation is added

const router = Router();

router.get('/', agentController.getAll);
router.get('/:id', agentController.getById);
router.post('/', agentController.create); // Add validateBody(schema) if needed
router.put('/:id', agentController.update); // Add validateBody(schema) if needed
router.delete('/:id', agentController.remove);

export default router;
