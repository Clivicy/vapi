import express from 'express';
import cors from 'cors';
import agentRoutes from './agents/agent.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/agents', agentRoutes);

export default app;
