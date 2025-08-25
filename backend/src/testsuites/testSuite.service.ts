import TestSuite, { ITestSuite } from './testSuite.model';

export const getAllTestSuites = async (): Promise<ITestSuite[]> => TestSuite.find();
export const getTestSuiteById = async (id: string): Promise<ITestSuite | null> => TestSuite.findById(id);
export const createTestSuite = async (data: Partial<ITestSuite>): Promise<ITestSuite> => TestSuite.create(data);
export const updateTestSuite = async (id: string, data: Partial<ITestSuite>): Promise<ITestSuite | null> => TestSuite.findByIdAndUpdate(id, data, { new: true });
export const deleteTestSuite = async (id: string): Promise<ITestSuite | null> => TestSuite.findByIdAndDelete(id);
