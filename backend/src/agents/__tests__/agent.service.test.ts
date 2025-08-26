import * as agentService from '../agent.service';
import Agent from '../agent.model';

jest.mock('../agent.model');

const mockAgent = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Test Agent',
  sttProvider: 'mock-stt',
  ttsProvider: 'mock-tts',
  llmProvider: 'mock-llm',
  prompt: 'Say hello',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('agentService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should get all agents', async () => {
    (Agent.find as jest.Mock).mockResolvedValue([mockAgent]);
    const agents = await agentService.getAllAgents();
    expect(agents).toEqual([mockAgent]);
    expect(Agent.find).toHaveBeenCalled();
  });

  it('should get agent by id', async () => {
    (Agent.findById as jest.Mock).mockResolvedValue(mockAgent);
    const agent = await agentService.getAgentById('507f1f77bcf86cd799439011');
    expect(agent).toEqual(mockAgent);
    expect(Agent.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  });
});
