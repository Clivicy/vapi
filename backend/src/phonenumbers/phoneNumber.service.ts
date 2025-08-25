import PhoneNumber, { IPhoneNumber } from './phoneNumber.model';

export const getAllPhoneNumbers = async (): Promise<IPhoneNumber[]> => PhoneNumber.find();
export const getPhoneNumberById = async (id: string): Promise<IPhoneNumber | null> => PhoneNumber.findById(id);
export const createPhoneNumber = async (data: Partial<IPhoneNumber>): Promise<IPhoneNumber> => PhoneNumber.create(data);
export const updatePhoneNumber = async (id: string, data: Partial<IPhoneNumber>): Promise<IPhoneNumber | null> => PhoneNumber.findByIdAndUpdate(id, data, { new: true });
export const deletePhoneNumber = async (id: string): Promise<IPhoneNumber | null> => PhoneNumber.findByIdAndDelete(id);
