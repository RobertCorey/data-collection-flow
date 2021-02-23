import React, { FC, useContext, useEffect, useState } from "react";
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
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import StateProvider, { StateContext } from "./StateContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        {/* <Global /> */}
        <Routes />
      </StateProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
const Routes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/car">
          {/* <UserGuard> */}
          <Car />
          {/* </UserGuard> */}
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </>
  );
};

// const UserGuard: React.FC = ({ children }) => {
//   const { getUser } = useGetUser();
//   if (getUser.isLoading) return <>Loading</>;
//   if (getUser.data?.data.user.id) return <>{children}</>;
//   return <Redirect to="/" />;
// };

// function Global() {
//   const { getUser } = useGetUser();
//   const data = getUser.data?.data;
//   const { status } = getUser;
//   return (
//     <div>
//       <h3>User:</h3>
//       {status === "success" && objToList(data.user)}
//     </div>
//   );

//   function objToList(obj: {}) {
//     return Object.entries(obj).map((key) => {
//       return (
//         <ul key={key[0]}>
//           {key[0]}: {key[1]}
//         </ul>
//       );
//     });
//   }
// }

function Car() {
  const { state, updateState, setState } = useContext(StateContext);
  const { getUser } = useGetUser(state.applicationId);
  if (!getUser) return <Redirect to="/" />;
  if (getUser.isLoading || getUser.isFetching) return <>Loading</>;
  return <>{JSON.stringify(getUser.data?.data)}</>;
}

const useGetUser = (id: string | undefined) => {
  const getUser = useQuery(
    ["currentUser", id],
    () => axios.get(`/api/user/${id}`),
    { enabled: !!id }
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
  const queryClient = useQueryClient();
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
