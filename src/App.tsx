import React from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch } from "react-router-dom";
import StateProvider from "./StateContext";
import { Car } from "./Car";
import { Global } from "./Sidebar";
import { Main } from "./LandingPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <Global />
        <Routes />
      </StateProvider>
    </QueryClientProvider>
  );
}
const Routes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/car/:id">
          <Car />
        </Route>
        <Route path="/Complete">
          <h1>Complete</h1>
          <Complete />
        </Route>
        <Route path="/">
          <h1>Home</h1>
          <Main />
        </Route>
      </Switch>
    </>
  );
};

function Complete() {
  return <></>;
}

export default App;
