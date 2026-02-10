// src/App.tsx
import React, { useEffect } from "react";
import RoutesComponent from "./routes/Routes";
import "./assets/styles/index.css";
import { useTheme } from "ponyo-ui";
import { PageHeaderProvider } from "./app/context/PageHeaderContext";

const App: React.FC = () => {
  const { setCompanyId } = useTheme();

  useEffect(() => {
    setCompanyId("apat");
  }, [setCompanyId]);

  return (
    <PageHeaderProvider>
      <RoutesComponent />
    </PageHeaderProvider>
  );
};

export default App;
