import React from "react";
import { useGetUser } from "./Hooks";

export function Global() {
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
