import Metric, { IMetric } from './metric.model';

export const getAllMetrics = async (): Promise<IMetric[]> => Metric.find();
export const getMetricById = async (id: string): Promise<IMetric | null> => Metric.findById(id);
export const createMetric = async (data: Partial<IMetric>): Promise<IMetric> => Metric.create(data);
export const updateMetric = async (id: string, data: Partial<IMetric>): Promise<IMetric | null> => Metric.findByIdAndUpdate(id, data, { new: true });
export const deleteMetric = async (id: string): Promise<IMetric | null> => Metric.findByIdAndDelete(id);
