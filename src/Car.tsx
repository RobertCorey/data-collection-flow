import { useContext } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { StateContext } from "./StateContext";
import { useGetUser, useCreateCar } from "./Hooks";

export function Car() {
  const { state } = useContext(StateContext);
  const { getUser } = useGetUser();
  const { createCar } = useCreateCar();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  /**
   * Route Guard
   * userId is required to render route
   */
  if (!state.userId) return <Redirect to="/" />;
  /**
   * Prevent user from interacting with form while performing mutation
   */
  if (createCar.isLoading) return <>Adding Car</>;
  if (getUser.error) return <>Error!</>;
  /**
   * Guarantee we always have the freshest user
   */
  if (getUser.isLoading || getUser.isFetching) return <>Loading</>;
  return (
    <div style={{}}>
      <h2>Would you like to add: </h2>
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
    if (typeof state.userId !== "string") return;
    return createCar.mutateAsync({
      name: "Prius",
      userId: state.userId,
    });
  }
}
