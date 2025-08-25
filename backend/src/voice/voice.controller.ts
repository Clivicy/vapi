import { Request, Response } from 'express';
import * as voiceService from './voice.service';

export const getAll = async (req: Request, res: Response) => {
  const voices = await voiceService.getAllVoices();
  res.json(voices);
};

export const getById = async (req: Request, res: Response) => {
  const voice = await voiceService.getVoiceById(req.params.id);
  if (!voice) return res.status(404).json({ message: 'Voice not found' });
  res.json(voice);
};

export const create = async (req: Request, res: Response) => {
  const voice = await voiceService.createVoice(req.body);
  res.status(201).json(voice);
};

export const update = async (req: Request, res: Response) => {
  const voice = await voiceService.updateVoice(req.params.id, req.body);
  if (!voice) return res.status(404).json({ message: 'Voice not found' });
  res.json(voice);
};

export const remove = async (req: Request, res: Response) => {
  const voice = await voiceService.deleteVoice(req.params.id);
  if (!voice) return res.status(404).json({ message: 'Voice not found' });
  res.json({ message: 'Voice deleted' });
};
