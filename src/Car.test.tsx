import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Car } from "./Car";
import { makeServer } from "./server";
import { MemoryRouter, Route } from "react-router-dom";
import { StateContext } from "./StateContext";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";

test("renders learn react link", async () => {
  const server = makeServer();
  const user = server.create("user", { name: "Spiderman" });

  const queryClient = new QueryClient();
  const dom = (
    <QueryClientProvider client={queryClient}>
      <StateContext.Provider
        value={{
          state: { userId: user.id },
          setState: () => {},
          updateState: () => {},
        }}
      >
        <MemoryRouter initialEntries={["/car/1"]}>
          <Route path="/car/:id">
            <Car />
          </Route>
          <Route path="/complete">Complete</Route>
        </MemoryRouter>
      </StateContext.Provider>
    </QueryClientProvider>
  );
  const rendered = render(dom);
  screen.getByText("Loading");
  await screen.findByText("Car 1");
  userEvent.click(screen.getByText("Add Car"));
  await screen.findByText("Loading");
  await screen.findByText("Car 2");
  user.reload();
  const car = server.schema.all("car").models[0];
  expect(car.attrs).toEqual({ userId: user.attrs.id, name: "Prius", id: "1" });
  userEvent.click(screen.getByText("Finish"));
  await screen.findByText("Complete");
});
