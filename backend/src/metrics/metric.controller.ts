import { Request, Response } from 'express';
import * as metricService from './metric.service';

export const getAll = async (req: Request, res: Response) => {
  const metrics = await metricService.getAllMetrics();
  res.json(metrics);
};

export const getById = async (req: Request, res: Response) => {
  const metric = await metricService.getMetricById(req.params.id);
  if (!metric) return res.status(404).json({ message: 'Metric not found' });
  res.json(metric);
};

export const create = async (req: Request, res: Response) => {
  const metric = await metricService.createMetric(req.body);
  res.status(201).json(metric);
};

export const update = async (req: Request, res: Response) => {
  const metric = await metricService.updateMetric(req.params.id, req.body);
  if (!metric) return res.status(404).json({ message: 'Metric not found' });
  res.json(metric);
};

export const remove = async (req: Request, res: Response) => {
  const metric = await metricService.deleteMetric(req.params.id);
  if (!metric) return res.status(404).json({ message: 'Metric not found' });
  res.json({ message: 'Metric deleted' });
};
