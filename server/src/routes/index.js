import express from "express";

import { getStadiumRoutes } from "./stadium";
import { getAuthRoutes } from "./auth";
import { getUserRoutes } from "./user";
import { route } from "express/lib/router";

function getRoutes() {
  // All routes in our Node API are placed on this router
  const router = express.Router();

  // router.use() prefixes our route (i.e. /api/v1/auth)
  router.use("/stadiums", getStadiumRoutes());
  router.use("/auth", getAuthRoutes());
  router.use("/users", getUserRoutes());

  return router;
}

export { getRoutes };
