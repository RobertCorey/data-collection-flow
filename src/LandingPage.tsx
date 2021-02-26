import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { StateContext } from "./StateContext";
import { useCreateUser } from "./Hooks";

export function Main() {
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
