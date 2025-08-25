import { lazy } from "react";

const Overview = lazy(() => import("./pages/Overview"));
const Assistants = lazy(() => import("./pages/Assistants"));
const Tools = lazy(() => import("./pages/Tools"));
const PhoneNumbers = lazy(() => import("./pages/PhoneNumbers"));
const VoiceLibrary = lazy(() => import("./pages/VoiceLibrary"));
const APIKeys = lazy(() => import("./pages/APIKeys"));
const Metrics = lazy(() => import("./pages/Metrics"));
const TestSuites = lazy(() => import("./pages/TestSuites"));
const CallLogs = lazy(() => import("./pages/CallLogs"));
const ChatLogs = lazy(() => import("./pages/ChatLogs"));
const SessionLogs = lazy(() => import("./pages/SessionLogs"));
const More = lazy(() => import("./pages/More"));

export const routes = [
  { path: "/", element: <Overview /> },
  { path: "/assistants", element: <Assistants /> },
  { path: "/tools", element: <Tools /> },
  { path: "/phone-numbers", element: <PhoneNumbers /> },
  { path: "/voice-library", element: <VoiceLibrary /> },
  { path: "/api-keys", element: <APIKeys /> },
  { path: "/metrics", element: <Metrics /> },
  { path: "/test-suites", element: <TestSuites /> },
  { path: "/call-logs", element: <CallLogs /> },
  { path: "/chat-logs", element: <ChatLogs /> },
  { path: "/session-logs", element: <SessionLogs /> },
  { path: "/more", element: <More /> },
];
