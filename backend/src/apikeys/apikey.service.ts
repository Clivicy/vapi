import APIKey, { IAPIKey } from './apikey.model';

export const getAllAPIKeys = async (): Promise<IAPIKey[]> => APIKey.find();
export const getAPIKeyById = async (id: string): Promise<IAPIKey | null> => APIKey.findById(id);
export const createAPIKey = async (data: Partial<IAPIKey>): Promise<IAPIKey> => APIKey.create(data);
export const updateAPIKey = async (id: string, data: Partial<IAPIKey>): Promise<IAPIKey | null> => APIKey.findByIdAndUpdate(id, data, { new: true });
export const deleteAPIKey = async (id: string): Promise<IAPIKey | null> => APIKey.findByIdAndDelete(id);
