import Agent, { IAgent } from './agent.model';

export const getAllAgents = async (): Promise<IAgent[]> => {
  return Agent.find();
};

export const getAgentById = async (id: string): Promise<IAgent | null> => {
  return Agent.findById(id);
};

export const createAgent = async (data: Partial<IAgent>): Promise<IAgent> => {
  return Agent.create(data);
};

export const updateAgent = async (id: string, data: Partial<IAgent>): Promise<IAgent | null> => {
  return Agent.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAgent = async (id: string): Promise<IAgent | null> => {
  return Agent.findByIdAndDelete(id);
};
