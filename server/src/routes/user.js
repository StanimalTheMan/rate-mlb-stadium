import { PrismaClient } from "@prisma/client";
import express from "express";
import { getAuthUser } from "../middleware/authorization";

const prisma = new PrismaClient();

function getUserRoutes() {
  const router = express.Router();

  router.get("/:userId", getAuthUser, getProfile);
  // router.get("/:userId/reviews", getUserReviews);

  return router;
}

async function getProfile(req, res, next) {}
// async function getUserReviews(req, res, next) {
//   const reviews = prisma.review.findMany({
//     where: {
//       userId: req.params.userId,
//     },
//   });

//   return res.status(200).json({ reviews });
// }

export { getUserRoutes };
