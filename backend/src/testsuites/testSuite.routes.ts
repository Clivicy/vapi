import { Router } from 'express';
import * as testSuiteController from './testSuite.controller';
import { validateBody } from '../middleware/validate';
import { createTestSuiteSchema, updateTestSuiteSchema } from './testSuite.validation';

const router = Router();

router.get('/', testSuiteController.getAll);
router.get('/:id', testSuiteController.getById);
router.post('/', validateBody(createTestSuiteSchema), testSuiteController.create);
router.put('/:id', validateBody(updateTestSuiteSchema), testSuiteController.update);
router.delete('/:id', testSuiteController.remove);

export default router;
