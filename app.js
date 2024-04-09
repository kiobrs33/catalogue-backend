const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./src/database/db-connection");

require("dotenv").config();

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || process.env.LOCAL_PORT;

    // El orden de ejecucion es IMPORTANTE!
    this.connectionDB();
    this.middleware();
    this.routes();
  }

  // Conexion a la base de datos
  async connectionDB() {
    await dbConnection();
  }

  // Middlewares - El orden de ejecución IMPORTANTE!
  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  // Rutas de la aplicacion
  routes() {
    this.app.use("/auth", require("./src/routes/auth.route"));
    this.app.use("/users", require("./src/routes/user.route"));
    this.app.use("/roles", require("./src/routes/role.route"));
    this.app.use("/brands", require("./src/routes/brand.route"));
    this.app.use("/colors", require("./src/routes/color.route"));
    this.app.use("/models", require("./src/routes/model.route"));
    this.app.use("/sizes", require("./src/routes/size.route"));
  }

  // Funcion para iniciar el SERVIDOR!
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server to in: ", this.port);
    });
  }
}

module.exports = App;
