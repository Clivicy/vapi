// Speech-to-Text provider interface placeholder
export interface ISttProvider {
  transcribe(audio: Buffer): Promise<string>;
}
