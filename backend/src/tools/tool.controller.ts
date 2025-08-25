import { Request, Response } from 'express';
import * as toolService from './tool.service';

export const getAll = async (req: Request, res: Response) => {
  const tools = await toolService.getAllTools();
  res.json(tools);
};

export const getById = async (req: Request, res: Response) => {
  const tool = await toolService.getToolById(req.params.id);
  if (!tool) return res.status(404).json({ message: 'Tool not found' });
  res.json(tool);
};

export const create = async (req: Request, res: Response) => {
  const tool = await toolService.createTool(req.body);
  res.status(201).json(tool);
};

export const update = async (req: Request, res: Response) => {
  const tool = await toolService.updateTool(req.params.id, req.body);
  if (!tool) return res.status(404).json({ message: 'Tool not found' });
  res.json(tool);
};

export const remove = async (req: Request, res: Response) => {
  const tool = await toolService.deleteTool(req.params.id);
  if (!tool) return res.status(404).json({ message: 'Tool not found' });
  res.json({ message: 'Tool deleted' });
};
