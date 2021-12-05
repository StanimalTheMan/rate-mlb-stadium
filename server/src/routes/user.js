import { PrismaClient } from "@prisma/client";
import express from "express";
import { getAuthUser, protect } from "../middleware/authorization";

const prisma = new PrismaClient();

function getUserRoutes() {
  const router = express.Router();

  router.get("/:userId", getAuthUser, getProfile);
  router.put("/", protect, editUser);
  // router.get("/:userId/reviews", getUserReviews);

  return router;
}

async function getProfile(req, res, next) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.userId,
    },
  });

  if (!user) {
    return next({
      message: `No user found with id: "${req.params.userId}"`,
      statusCode: 404,
    });
  }

  const reviews = await prisma.review.findMany({
    where: {
      userId: req.params.userId,
    },
  });
  console.log(reviews);
  user.reviews = reviews;

  res.status(200).json({ user });
}

async function editUser(req, res) {
  const { username, avatar, about } = req.body;

  const user = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      username,
      avatar,
      about,
    },
  });

  res.status(200).json({ user });
}
// async function getUserReviews(req, res, next) {
//   const reviews = prisma.review.findMany({
//     where: {
//       userId: req.params.userId,
//     },
//   });

//   return res.status(200).json({ reviews });
// }

export { getUserRoutes };
