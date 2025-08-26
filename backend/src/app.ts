import express from 'express';
import cors from 'cors';
import agentRoutes from './agents/agent.routes';
import voiceRoutes from './voice/voice.routes';
import apikeyRoutes from './apikeys/apikey.routes';
import callLogRoutes from './logs/call/callLog.routes';
import chatLogRoutes from './logs/chat/chatLog.routes';
import sessionLogRoutes from './logs/session/sessionLog.routes';
import metricRoutes from './metrics/metric.routes';
import testSuiteRoutes from './testsuites/testSuite.routes';
import phoneNumberRoutes from './phonenumbers/phoneNumber.routes';
import toolRoutes from './tools/tool.routes';
import integrationRoutes from './integrations/integration.routes';
import userRoutes from './auth/user.routes';
import authRoutes from './auth/auth.routes';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from './config/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use('/api/agents', agentRoutes);
app.use('/api/voices', voiceRoutes);
app.use('/api/apikeys', apikeyRoutes);
app.use('/api/call-logs', callLogRoutes);
app.use('/api/chat-logs', chatLogRoutes);
app.use('/api/session-logs', sessionLogRoutes);
app.use('/api/metrics', metricRoutes);
app.use('/api/test-suites', testSuiteRoutes);
app.use('/api/phone-numbers', phoneNumberRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export default app;
