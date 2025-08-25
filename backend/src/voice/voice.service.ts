import Voice, { IVoice } from './voice.model';

export const getAllVoices = async (): Promise<IVoice[]> => Voice.find();
export const getVoiceById = async (id: string): Promise<IVoice | null> => Voice.findById(id);
export const createVoice = async (data: Partial<IVoice>): Promise<IVoice> => Voice.create(data);
export const updateVoice = async (id: string, data: Partial<IVoice>): Promise<IVoice | null> => Voice.findByIdAndUpdate(id, data, { new: true });
export const deleteVoice = async (id: string): Promise<IVoice | null> => Voice.findByIdAndDelete(id);
