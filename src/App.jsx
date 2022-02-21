import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import RoutesProvider from "./modules/RoutesProvider";

function App() {
  return (
    <ErrorBoundary>
      <RoutesProvider />
    </ErrorBoundary>
  );
}

export default App;
