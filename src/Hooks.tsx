import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { StateContext } from "./StateContext";

export enum QueryKey {
  CurrentUser = "CurrentUser",
}

export const useGetUser = () => {
  const { state } = useContext(StateContext);
  const id = state.userId;
  const getUser = useQuery(
    [QueryKey.CurrentUser, id],
    () => axios.get(`/api/user/${id}`),
    {
      enabled: !!id,
    }
  );
  return { getUser };
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const createUserService = (name: string) => axios.post("/api/user", { name });
  const createUser = useMutation(createUserService, {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.CurrentUser);
    },
  });
  return { createUser };
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();
  const createCarService = ({
    name,
    userId,
  }: {
    name: string;
    userId: string;
  }) => axios.post(`/api/car/${userId}`, { name });
  const createCar = useMutation(createCarService, {
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries([QueryKey.CurrentUser, userId]);
    },
  });
  return { createCar };
};
