import { PrismaClient } from "@prisma/client";
import express from "express";

// All route definitions are in one place and we only need to export one thing
function getAuthRoutes() {
  const router = express.Router();

  // 'http://localhost:3001/api/v1/auth/current-user'
  router.get("/current-user", (req, res) => {
    res.status(200).json({
      user: {
        id: "1234",
        usernamae: "test",
        email: "test@example.com",
      },
    });
  });

  return router;
}

export { getAuthRoutes };
