import { Request, Response } from 'express';
import * as apikeyService from './apikey.service';

export const getAll = async (req: Request, res: Response) => {
  const apikeys = await apikeyService.getAllAPIKeys();
  res.json(apikeys);
};

export const getById = async (req: Request, res: Response) => {
  const apikey = await apikeyService.getAPIKeyById(req.params.id);
  if (!apikey) return res.status(404).json({ message: 'API Key not found' });
  res.json(apikey);
};

export const create = async (req: Request, res: Response) => {
  const apikey = await apikeyService.createAPIKey(req.body);
  res.status(201).json(apikey);
};

export const update = async (req: Request, res: Response) => {
  const apikey = await apikeyService.updateAPIKey(req.params.id, req.body);
  if (!apikey) return res.status(404).json({ message: 'API Key not found' });
  res.json(apikey);
};

export const remove = async (req: Request, res: Response) => {
  const apikey = await apikeyService.deleteAPIKey(req.params.id);
  if (!apikey) return res.status(404).json({ message: 'API Key not found' });
  res.json({ message: 'API Key deleted' });
};
