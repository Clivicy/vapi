import Integration, { IIntegration } from './integration.model';

export const getAllIntegrations = async (): Promise<IIntegration[]> => Integration.find();
export const getIntegrationById = async (id: string): Promise<IIntegration | null> => Integration.findById(id);
export const createIntegration = async (data: Partial<IIntegration>): Promise<IIntegration> => Integration.create(data);
export const updateIntegration = async (id: string, data: Partial<IIntegration>): Promise<IIntegration | null> => Integration.findByIdAndUpdate(id, data, { new: true });
export const deleteIntegration = async (id: string): Promise<IIntegration | null> => Integration.findByIdAndDelete(id);
