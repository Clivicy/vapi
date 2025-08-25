import { Request, Response } from 'express';
import * as testSuiteService from './testSuite.service';

export const getAll = async (req: Request, res: Response) => {
  const suites = await testSuiteService.getAllTestSuites();
  res.json(suites);
};

export const getById = async (req: Request, res: Response) => {
  const suite = await testSuiteService.getTestSuiteById(req.params.id);
  if (!suite) return res.status(404).json({ message: 'Test suite not found' });
  res.json(suite);
};

export const create = async (req: Request, res: Response) => {
  const suite = await testSuiteService.createTestSuite(req.body);
  res.status(201).json(suite);
};

export const update = async (req: Request, res: Response) => {
  const suite = await testSuiteService.updateTestSuite(req.params.id, req.body);
  if (!suite) return res.status(404).json({ message: 'Test suite not found' });
  res.json(suite);
};

export const remove = async (req: Request, res: Response) => {
  const suite = await testSuiteService.deleteTestSuite(req.params.id);
  if (!suite) return res.status(404).json({ message: 'Test suite not found' });
  res.json({ message: 'Test suite deleted' });
};
