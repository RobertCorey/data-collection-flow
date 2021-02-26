import React, { useContext } from "react";
import { useQueryClient } from "react-query";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { StateContext } from "./StateContext";
import { useGetUser, useCreateCar } from "./Hooks";

export function Car() {
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
  if (createCar.isLoading) return <>Adding Car</>;
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
    if (typeof state.applicationId !== "string") return;
    return createCar
      .mutateAsync({ name: "Prius", userId: state.applicationId })
      .then(() => {
        queryClient.invalidateQueries("currentUser");
      });
  }
}
