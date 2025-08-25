import { Request, Response } from 'express';
import * as integrationService from './integration.service';

export const getAll = async (req: Request, res: Response) => {
  const integrations = await integrationService.getAllIntegrations();
  res.json(integrations);
};

export const getById = async (req: Request, res: Response) => {
  const integration = await integrationService.getIntegrationById(req.params.id);
  if (!integration) return res.status(404).json({ message: 'Integration not found' });
  res.json(integration);
};

export const create = async (req: Request, res: Response) => {
  const integration = await integrationService.createIntegration(req.body);
  res.status(201).json(integration);
};

export const update = async (req: Request, res: Response) => {
  const integration = await integrationService.updateIntegration(req.params.id, req.body);
  if (!integration) return res.status(404).json({ message: 'Integration not found' });
  res.json(integration);
};

export const remove = async (req: Request, res: Response) => {
  const integration = await integrationService.deleteIntegration(req.params.id);
  if (!integration) return res.status(404).json({ message: 'Integration not found' });
  res.json({ message: 'Integration deleted' });
};
