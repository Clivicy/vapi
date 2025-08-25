import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import { routes } from "./routes";

function AppRoutes() {
  const element = useRoutes(routes);
  return <DashboardLayout>{element}</DashboardLayout>;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-zinc-100 p-8">Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
