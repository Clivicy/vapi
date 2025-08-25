import { Request, Response } from 'express';
import * as phoneNumberService from './phoneNumber.service';

export const getAll = async (req: Request, res: Response) => {
  const numbers = await phoneNumberService.getAllPhoneNumbers();
  res.json(numbers);
};

export const getById = async (req: Request, res: Response) => {
  const number = await phoneNumberService.getPhoneNumberById(req.params.id);
  if (!number) return res.status(404).json({ message: 'Phone number not found' });
  res.json(number);
};

export const create = async (req: Request, res: Response) => {
  const number = await phoneNumberService.createPhoneNumber(req.body);
  res.status(201).json(number);
};

export const update = async (req: Request, res: Response) => {
  const number = await phoneNumberService.updatePhoneNumber(req.params.id, req.body);
  if (!number) return res.status(404).json({ message: 'Phone number not found' });
  res.json(number);
};

export const remove = async (req: Request, res: Response) => {
  const number = await phoneNumberService.deletePhoneNumber(req.params.id);
  if (!number) return res.status(404).json({ message: 'Phone number not found' });
  res.json({ message: 'Phone number deleted' });
};
