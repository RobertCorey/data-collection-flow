// src/server.js
import {
  belongsTo,
  createServer,
  Factory,
  hasMany,
  Model,
  Response,
  RestSerializer,
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
      car: Factory.extend({ name: "", year: "" }),
    },
    serializers: {
      user: RestSerializer.extend({
        include: ["car"],
        embed: true,
      }),
    },

    routes() {
      this.namespace = "api";

      this.post("/car/:id", (schema, request) => {
        const { id } = request.params;
        let attrs = JSON.parse(request.requestBody);
        const user = schema.find("user", id);
        const car = schema.create("car", { user, ...attrs });
        return { id: car.id };
      });
      this.post("/user", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        const newUser = schema.create("user", {
          ...attrs,
        });
        return { id: newUser.id };
      });
      this.get("/user", (schema, request) => {
        return schema.all("user") || new Response(404);
      });
      this.get("/user/:id", (schema, request) => {
        const { id } = request.params;
        let attrs = JSON.parse(request.requestBody);
        const user = schema.find("user", id);
        return schema.find("user", id) || new Response(404);
      });
    },
  });

  return server;
}
