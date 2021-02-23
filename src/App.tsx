import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch, useHistory } from "react-router-dom";
import StateProvider, { StateContext } from "./StateContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <Global />
        <Switch>
          <Route path="/car">
            <Car></Car>
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </StateProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

function Global() {
  const { state } = useContext(StateContext);
  const { getUser } = useGetUser();
  return (
    <>
      {JSON.stringify(getUser.data?.data)} {getUser.status}
    </>
  );
}

function Car() {
  const { getUser } = useGetUser();
  const history = useHistory();
  if (!getUser.data?.data.id) {
    history.push("/");
  }
  return <></>;
}

const useGetUser = () => {
  const {
    state: { applicationId },
  } = useContext(StateContext);

  const getUser = useQuery(
    ["currentUser", applicationId],
    () => axios.get(`/api/user/${applicationId}`),
    {
      enabled: !!applicationId,
    }
  );
  return { getUser };
};
const useCreateUser = () => {
  const createUserService = (name: string) => axios.post("/api/user", { name });
  const createUser = useMutation(createUserService);

  return { createUser };
};

function Main() {
  const { createUser } = useCreateUser();
  const history = useHistory();
  const { state, updateState, setState } = useContext(StateContext);
  return (
    <div className="App">
      <button
        onClick={async () => {
          try {
            const resp = await createUser.mutateAsync("Rob");
            setState({ applicationId: resp.data.id });
            history.push("/car");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Create User
      </button>
    </div>
  );
}

export default App;
