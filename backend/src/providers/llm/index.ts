// LLM provider interface placeholder
export interface ILlmProvider {
  generateReply(prompt: string, context?: any): Promise<string>;
}
