import Tool, { ITool } from './tool.model';

export const getAllTools = async (): Promise<ITool[]> => Tool.find();
export const getToolById = async (id: string): Promise<ITool | null> => Tool.findById(id);
export const createTool = async (data: Partial<ITool>): Promise<ITool> => Tool.create(data);
export const updateTool = async (id: string, data: Partial<ITool>): Promise<ITool | null> => Tool.findByIdAndUpdate(id, data, { new: true });
export const deleteTool = async (id: string): Promise<ITool | null> => Tool.findByIdAndDelete(id);
