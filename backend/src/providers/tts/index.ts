// Text-to-Speech provider interface placeholder
export interface ITtsProvider {
  synthesize(text: string): Promise<Buffer>;
}
