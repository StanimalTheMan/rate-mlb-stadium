import express from "express";

import { getStadiumRoutes } from "./stadium";

function getRoutes() {
  // All routes in our Node API are placed on this router
  const router = express.Router();

  // router.use() prefixes our route (i.e. /api/v1/auth)
  router.use("/stadiums", getStadiumRoutes());

  return router;
}

export { getRoutes };
