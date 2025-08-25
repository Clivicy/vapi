import { Request, Response, NextFunction } from 'express';
import APIKey from '../apikeys/apikey.model';

export const requireApiKey = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string;
  if (!apiKey) {
    return res.status(401).json({ message: 'Missing API key' });
  }
  const keyDoc = await APIKey.findOne({ key: apiKey, revoked: false });
  if (!keyDoc) {
    return res.status(401).json({ message: 'Invalid or revoked API key' });
  }
  (req as any).apiKey = keyDoc;
  next();
};
