import React, { useContext } from "react";
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
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";
import StateProvider, { StateContext } from "./StateContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <Global />
        <Routes />
      </StateProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
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

/**
 * Hooks
 */

const useGetUser = () => {
  const { state } = useContext(StateContext);
  const id = state.applicationId;
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
const useCreateCar = () => {
  const createCarService = ({
    name,
    userId,
  }: {
    name: string;
    userId: string;
  }) => axios.post(`/api/car/${userId}`, { name });
  const createCar = useMutation(createCarService);

  return { createCar };
};

function Car() {
  const { state } = useContext(StateContext);
  const { getUser } = useGetUser();
  const { createCar } = useCreateCar();
  const queryClient = useQueryClient();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  /**
   * Route Guard
   * applicationId is required to render route
   */
  if (!state.applicationId) return <Redirect to="/" />;
  /**
   * Guarantee we always have the freshest user
   */
  if (getUser.isLoading || getUser.isFetching) return <>Loading</>;
  return (
    <div style={{}}>
      <h1>Car {id}</h1>
      <button
        onClick={async () => {
          history.push("/complete");
        }}
      >
        Finish
      </button>
      <br />
      <button
        onClick={async () => {
          await addPrius();
          history.push(`/car/${+id + 1}`);
        }}
      >
        Add Car
      </button>
    </div>
  );

  function addPrius() {
    if (typeof state.applicationId !== "string") return;
    return createCar
      .mutateAsync({ name: "Prius", userId: state.applicationId })
      .then(() => {
        queryClient.invalidateQueries("currentUser");
      });
  }
}

function Main() {
  const { createUser } = useCreateUser();
  const history = useHistory();
  const { setState } = useContext(StateContext);
  return (
    <div className="App">
      <button
        onClick={async () => {
          try {
            const resp = await createUser.mutateAsync("Rob");
            setState({ applicationId: resp.data.id });
            history.push("/car/1");
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

function Complete() {
  return <></>;
}

function Global() {
  const { getUser } = useGetUser();
  const data = getUser.data?.data;
  const { status } = getUser;
  return (
    <div>
      <h3>User:</h3>
      {status === "success" && objToList(data.user)}
    </div>
  );

  function objToList(obj: {}) {
    return Object.entries(obj).map((key) => {
      return (
        <ul key={key[0]}>
          {key[0]}: {JSON.stringify(key[1])}
        </ul>
      );
    });
  }
}

export default App;
