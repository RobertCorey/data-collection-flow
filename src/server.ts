// src/server.js
import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  Response,
} from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model.extend({ hobbies: hasMany(), car: hasMany() }),
      hobby: Model.extend({ user: belongsTo() }),
      car: Model.extend({ user: belongsTo() }),
    },
    factories: {
      user: Factory.extend({ name: "" }),
      hobby: Factory.extend({ name: "" }),
      // car: Factory.extend({ name: "", year: "" }),
    },

    routes() {
      this.namespace = "api";
      this.post("/user", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        const newUser = schema.create("user", {
          hobbies: [],
          cars: [],
          ...attrs,
        });
        return { id: newUser.id };
      });
      this.get("/user", (schema, request) => {
        return schema.all("user") || new Response(404);
      });
      this.get("/user/:id", (schema, request) => {
        const { id } = request.params;
        return schema.find("user", id) || new Response(404);
      });
    },
  });

  return server;
}
