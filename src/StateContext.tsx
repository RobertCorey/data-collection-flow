import React, { FC, useState } from "react";

interface State {
  userId?: string;
}

export const StateContext = React.createContext<{
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  updateState: (state: State) => void;
}>({
  state: {},
  setState: () => {},
  updateState: () => {},
});

const StateProvider: FC = ({ children }) => {
  const [state, setState] = useState({});
  const updateState = (partialState = {}) =>
    setState({ ...state, ...partialState });

  return (
    <StateContext.Provider value={{ state, setState, updateState }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
