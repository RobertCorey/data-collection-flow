import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { StateContext } from "./StateContext";

export const useGetUser = () => {
  const { state } = useContext(StateContext);
  const id = state.applicationId;
  const getUser = useQuery(
    ["currentUser", id],
    () => axios.get(`/api/user/${id}`),
    { enabled: !!id }
  );
  return { getUser };
};
export const useCreateUser = () => {
  const createUserService = (name: string) => axios.post("/api/user", { name });
  const createUser = useMutation(createUserService);

  return { createUser };
};
export const useCreateCar = () => {
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
