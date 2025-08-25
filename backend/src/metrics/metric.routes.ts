import { Router } from 'express';
import * as metricController from './metric.controller';
import { validateBody } from '../middleware/validate';
import { createMetricSchema, updateMetricSchema } from './metric.validation';

const router = Router();

router.get('/', metricController.getAll);
router.get('/:id', metricController.getById);
router.post('/', validateBody(createMetricSchema), metricController.create);
router.put('/:id', validateBody(updateMetricSchema), metricController.update);
router.delete('/:id', metricController.remove);

export default router;
