import { Request, Response } from 'express';
import * as agentService from './agent.service';

export const getAll = async (req: Request, res: Response) => {
  const agents = await agentService.getAllAgents();
  res.json(agents);
};

export const getById = async (req: Request, res: Response) => {
  const agent = await agentService.getAgentById(req.params.id);
  if (!agent) return res.status(404).json({ message: 'Agent not found' });
  res.json(agent);
};

export const create = async (req: Request, res: Response) => {
  const agent = await agentService.createAgent(req.body);
  res.status(201).json(agent);
};

export const update = async (req: Request, res: Response) => {
  const agent = await agentService.updateAgent(req.params.id, req.body);
  if (!agent) return res.status(404).json({ message: 'Agent not found' });
  res.json(agent);
};

export const remove = async (req: Request, res: Response) => {
  const agent = await agentService.deleteAgent(req.params.id);
  if (!agent) return res.status(404).json({ message: 'Agent not found' });
  res.json({ message: 'Agent deleted' });
};
